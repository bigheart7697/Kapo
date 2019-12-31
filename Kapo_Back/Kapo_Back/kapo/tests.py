from django.test import TestCase
from .models import Profile, Product
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
        self.email = 'dummy'

    def test_create_product_unauthenticated(self):
        """
        Ensure we can't access the create a new Product url if not authenticated.
        """
        create_profile(username=self.username, password=self.password, email=self.email)
        url = reverse('add_product')
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_product(self):
        """
        Ensure we can create a new Product.
        """
        create_profile(username=self.username, password=self.password, email=self.email)
        profile = Profile.objects.get(user=User.objects.get(username=self.username))
        self.client.force_login(profile.user)
        url = reverse('add_product')
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 1)
        self.assertEqual(Product.objects.last().name, self.data['name'])
        self.assertEqual(Product.objects.last().description, self.data['description'])
        self.assertEqual(Product.objects.last().main_category, '0')
        self.assertEqual(Product.objects.last().price, self.data['price'])
        self.assertEqual(Product.objects.last().quantity, self.data['quantity'])
        self.assertEqual(Product.objects.last().production_year, self.data['production_year'])

    def test_negative_price(self):
        create_profile(username=self.username, password=self.password, email=self.email)
        profile = Profile.objects.get(user=User.objects.get(username=self.username))
        self.client.force_login(profile.user)
        url = reverse('add_product')
        self.data['price'] = -100
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.data['price'] = 0
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_negative_quantity(self):
        create_profile(username=self.username, password=self.password, email=self.email)
        profile = Profile.objects.get(user=User.objects.get(username=self.username))
        self.client.force_login(profile.user)
        url = reverse('add_product')
        self.data['quantity'] = -1
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.data['quantity'] = 0
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_future_production(self):
        create_profile(username=self.username, password=self.password, email=self.email)
        profile = Profile.objects.get(user=User.objects.get(username=self.username))
        self.client.force_login(profile.user)
        url = reverse('add_product')
        self.data['production_year'] = 2023
        response = self.client.post(url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class OrderModelTests(TestCase):
    pass
