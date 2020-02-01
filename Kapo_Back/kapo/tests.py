import time

from django.urls import reverse
from rest_framework.test import APITestCase
import os
import multiprocessing

from .views import *


class ProductModelTests(APITestCase):

    def setUp(self):
        self.data = {'name': 'woody', 'description': 'test', 'cat1': '2', 'price': 100, 'quantity': 1,
                     'production_year': 1980}
        self.user_data = {'email': 'dummy@gmail.com', 'password': '@123reshG', 'first_name': 'Reza',
                          'last_name': 'Shirkavand', 'phone_number': '+989124920819',
                          'is_corporate': False, 'country': 'Iran',
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
        self.assertEqual(product.cat1, '2')
        self.assertEqual(product.get_cat1_display(), "personal")
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
    def setUp(self):
        self.prod_user_data = {'email': 'dummy@gmail.com', 'password': '@123reshG', 'first_name': 'Reza',
                               'last_name': 'Shirkavand', 'phone_number': '+989124920819',
                               'is_corporate': False, 'country': 'Iran',
                               'city': 'Tehran', 'address': 'Azadi Ave'}

        self.order_user_data = {'email': 'dummy2@gmail.com', 'password': '@123reshG', 'first_name': 'Reza',
                                'last_name': 'Shirkavand', 'phone_number': '+989124920810',
                                'is_corporate': False, 'country': 'Iran',
                                'city': 'Tehran', 'address': 'Azadi Ave'}

        response = self.client.post(reverse('register'), data=self.prod_user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.post(reverse('register'), data=self.order_user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.register_and_authorize(self.prod_user_data['email'], self.prod_user_data['password'])
        self.product_data = {'name': 'woody', 'description': 'test', 'cat1': '1', 'price': 100,
                             'quantity': 1,
                             'production_year': 1980}

        url = reverse('add_product')
        response = self.client.post(url, self.product_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.product = Product.objects.last()
        self.url = reverse('order', kwargs={'pk': self.product .id})

    def register_and_authorize(self, email, password):
        response = self.client.post(reverse('token-auth'), data={'email': email, 'password': password})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.token = response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token)

    def test_order_own_product(self):
        """Test if we can order our own product"""
        response = self.client.post(self.url, {'count': 1}, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_order(self):
        self.register_and_authorize(self.order_user_data['email'], self.order_user_data['password'])
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
        self.register_and_authorize(self.order_user_data['email'], self.order_user_data['password'])
        with self.assertRaises(ValidationError):
            self.client.post(self.url, {'count': 2}, format='json')

    def test_negative_count_order(self):
        self.register_and_authorize(self.order_user_data['email'], self.order_user_data['password'])
        response = self.client.post(self.url, {'count': -2}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_cancel_order(self):
        self.register_and_authorize(self.order_user_data['email'], self.order_user_data['password'])
        response = self.client.post(self.url, {'count': 1}, format='json')
        order = Order.objects.last()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(order.state, order.State.AWAITING)
        cancel_url = reverse('customer-order-cancel', kwargs={'pk': order.id})
        response = self.client.post(cancel_url)
        order = Order.objects.last()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(order.state, order.State.CANCELED)

    def test_complete_order(self):
        self.register_and_authorize(self.order_user_data['email'], self.order_user_data['password'])
        response = self.client.post(self.url, {'count': 1}, format='json')
        order = Order.objects.last()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(order.state, order.State.AWAITING)
        complete_url = reverse('customer-order-complete', kwargs={'pk': order.id})
        response = self.client.post(complete_url)
        order = Order.objects.last()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(order.state, order.State.COMPLETED)

    def test_order_fail(self):
        self.register_and_authorize(self.order_user_data['email'], self.order_user_data['password'])
        response = self.client.post(self.url, {'count': 1}, format='json')
        order = Order.objects.last()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(order.state, order.State.AWAITING)
        fail_url = reverse('customer-order-fail', kwargs={'pk': order.id})
        response = self.client.post(fail_url)
        order = Order.objects.last()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(order.state, order.State.FAILED)
