from django.test import TestCase
from django.urls import reverse
from .views import *
from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework.test import APITestCase


def create_profile(username='dummy', password='dummy', email='dummy@gmail.com'):
    """
    Create a dummy user
    """
    User.objects.create(username=username, password=password, email=email)


def create_product(profile, price=100, quantity=1):
    """
    Create a product with the given `owner_id` by the given `quantity` and at the
    given `price`. Title & Description are not need now
    """
    Product.objects.create(owner=profile, price=price, quantity=quantity)


class ProfileModelTests(TestCase):

    def setUp(self, username='dummy', password='dummy', email='dummy@gmail.com'):
        self.username = username
        self.password = password
        self.email = email
        self.phone_number = '+989121234567'
        self.city = 'Tehran'
        self.address = 'Azadi Ave'

    def test_create_profile(self):
        create_profile(username=self.username, password=self.password, email=self.email)
        profile = Profile.objects.get(user=User.objects.get(username=self.username))
        self.assertEqual(profile.user.username, self.username)
        self.assertEqual(profile.user.email, self.email)
        profile.phone_number = self.phone_number
        profile.city = self.city
        profile.address = self.address
        profile.full_clean()
        self.assertEqual(profile.phone_number, self.phone_number)
        self.assertEqual(profile.address, self.address)
        self.assertEqual(profile.city, self.city)

    def test_bad_phone_number(self):
        create_profile(username=self.username, password=self.password, email=self.email)
        profile = Profile.objects.get(user=User.objects.get(username=self.username))
        profile.city = self.city
        profile.address = self.address
        profile.phone_number = '934245'
        with self.assertRaises(ValidationError):
            profile.full_clean()


class ProductModelTests(APITestCase):

    def setUp(self, name='woody', description='test', category='Digital', price=100, quantity=1, production_year=1980):
        self.data = {'name': 'woody', 'description': 'test', 'category': 'Digital', 'price': 100, 'quantity': 1,
                     'production_year': 1980}
        self.username = 'dummy'
        self.password = 'dummy'
        self.email = 'dummy@gmail.com'
        create_profile(username=self.username, password=self.password, email=self.email)
        self.profile = Profile.objects.get(user=User.objects.get(username=self.username))
        self.client.force_login(self.profile.user)
        self.url = reverse('add_product')

    def test_create_product_unauthenticated(self):
        """
        Ensure we can't access the create a new Product url if not authenticated.
        """
        self.client.logout()
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_product(self):
        """
        Ensure we can create a new Product.
        """
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        product = Product.objects.last()
        self.assertEqual(Product.objects.count(), 1)
        self.assertEqual(product.name, self.data['name'])
        self.assertEqual(product.description, self.data['description'])
        self.assertEqual(product.main_category, '0')
        self.assertEqual(product.owner, self.profile)
        self.assertEqual(product.price, self.data['price'])
        self.assertEqual(product.quantity, self.data['quantity'])
        self.assertEqual(product.production_year, self.data['production_year'])

    def test_negative_price(self):
        self.data['price'] = -100
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.data['price'] = 0
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_negative_quantity(self):
        self.data['quantity'] = -1
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.data['quantity'] = 0
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_future_production(self):
        self.data['production_year'] = 2023
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class OrderModelTests(TestCase):
    def setUp(self, name='woody', description='test', category='Digital', price=100, quantity=1, production_year=1980):
        self.product_data = {'name': 'woody', 'description': 'test', 'category': 'Digital', 'price': 1000, 'quantity': 1,
                             'production_year': 1980}
        self.username = 'dummy'
        self.password = 'dummy'
        self.email = 'dummy@gmail.com'
        create_profile(username=self.username, password=self.password, email=self.email)
        self.profile = Profile.objects.get(user=User.objects.get(username=self.username))
        self.client.force_login(self.profile.user)
        url = reverse('add_product')
        response = self.client.post(url, self.product_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.product = Product.objects.last()
        self.url = reverse('order', kwargs={'pk': self.product.id})

    def test_order(self):
        response = self.client.post(self.url, {'count': 1}, format='json')
        order = Order.objects.last()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(order.product, self.product)
        self.assertEqual(order.customer, self.profile)
        self.assertEqual(order.count, 1)
        self.assertEqual(order.product.quantity, 0)

    def test_invalid_count_order(self):
        """
        Test if we can order a quantity more than the remaining quantity of the product
        """
        with self.assertRaises(ValidationError):
            self.client.post(self.url, {'count': 2}, format='json')

    def test_negative_count_order(self):
        response = self.client.post(self.url, {'count': -2}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class SearchTests(TestCase):
    def setUp(self):
        self.username = 'dummy'
        self.password = 'dummy'
        self.email = 'dummy@gmail.com'
        create_profile(username=self.username, password=self.password, email=self.email)
        self.profile = Profile.objects.get(user=User.objects.get(username=self.username))
        self.client.force_login(self.profile.user)
        self.data = {'query': 'adorable'}
        self.url = reverse('search')

    def test_search(self):
        response = self.client.get(self.url, self.data, format='json')
        print(response)
