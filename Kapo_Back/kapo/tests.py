from django.core.exceptions import ValidationError
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .views import *


def create_product(profile, price=100, quantity=1):
    """
    Create a product with the given `owner_id` by the given `quantity` and at the
    given `price`. Title & Description are not need now
    """


class ProductModelTests(APITestCase):

    def setUp(self):
        self.data = {'name': 'woody', 'description': 'test', 'category': 'Digital', 'price': 100, 'quantity': 1,
                     'production_year': 1980}
        self.user_data = {'email': 'dummy@gmail.com', 'password': '@123reshG', 'first_name': 'Reza',
                          'last_name': 'Shirkavand', 'phone_number': '+989124920819',
                          'city': 'Tehran', 'address': 'Azadi Ave'}

        response = self.client.post(reverse('register'), data=self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.post(reverse('token-auth'), data={'email': 'dummy@gmail.com', 'password': '@123reshG'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.token = response.data['token']
        self.url = reverse('add_product')

    def test_create_product_unauthenticated(self):
        """
        Ensure we can't access the create a new Product url if not authenticated.
        """
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_product(self):
        """
        Ensure we can create a new Product.
        """
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token)
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        product = Product.objects.last()
        self.assertEqual(Product.objects.count(), 1)
        self.assertEqual(product.name, self.data['name'])
        self.assertEqual(product.description, self.data['description'])
        self.assertEqual(product.main_category, '0')
        self.assertEqual(product.owner, User.objects.last())
        self.assertEqual(product.price, self.data['price'])
        self.assertEqual(product.quantity, self.data['quantity'])
        self.assertEqual(product.production_year, self.data['production_year'])

    def test_negative_price(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token)
        self.data['price'] = -100
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.data['price'] = 0
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_negative_quantity(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token)
        self.data['quantity'] = -1
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.data['quantity'] = 0
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_future_production(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token)
        self.data['production_year'] = 2023
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class OrderModelTests(APITestCase):
    def setUp(self, name='woody', description='test', category='Digital', price=100, quantity=1, production_year=1980):
        self.user_data = {'email': 'dummy@gmail.com', 'password': '@123reshG', 'first_name': 'Reza',
                          'last_name': 'Shirkavand', 'phone_number': '+989124920819',
                          'city': 'Tehran', 'address': 'Azadi Ave'}
        response = self.client.post(reverse('register'), data=self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.post(reverse('token-auth'), data={'email': 'dummy@gmail.com', 'password': '@123reshG'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.token = response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token)

        self.product_data = {'name': 'woody', 'description': 'test', 'category': 'Digital', 'price': 100, 'quantity': 1,
                             'production_year': 1980}

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
        self.assertEqual(order.customer, User.objects.last())
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

