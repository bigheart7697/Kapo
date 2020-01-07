from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class ProfileTestCase(APITestCase):

    def setUp(self):
        self.email = 'dummy@gmail.com'
        self.first_name = 'Reza'
        self.last_name = 'Shirkavad'
        self.password = '@123reshG'
        self.phone_number = '+989121234567'
        self.city = 'Tehran'
        self.address = 'Azadi Ave'

    def test_crete_user(self):
        user_data = {'email': self.email, 'password': self.password, 'first_name': self.first_name,
                     'last_name': self.last_name,
                     'phone_number': self.phone_number, 'city': self.city, 'address': self.address}
        response = self.client.post(reverse('register'), data=user_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.post(reverse('token-auth'), data={'email': self.email, 'password': self.password})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_bad_phone_number(self):
        user_data = {'email': self.email, 'password': self.password, 'first_name': self.first_name,
                     'last_name': self.last_name,
                     'phone_number': '382931', 'city': self.city, 'address': self.address}
        response = self.client.post(reverse('register'), data=user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
