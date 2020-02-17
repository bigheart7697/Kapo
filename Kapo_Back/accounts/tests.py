from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import User


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
                     'last_name': self.last_name, 'is_corporate': False,
                     'phone_number': self.phone_number, 'city': self.city, 'address': self.address}
        response = self.client.post(reverse('register'), data=user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.post(reverse('token-auth'), data={'email': self.email, 'password': self.password})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_bad_phone_number(self):
        user_data = {'email': self.email, 'password': self.password,
                     'phone_number': '382931', 'city': self.city, 'address': self.address}
        response = self.client.post(reverse('register'), data=user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_corporate_user(self):
        user_data = {'email': self.email, 'password': self.password, 'corporate_name': '', 'corporate_number': None,
                     'is_corporate': True, 'phone_number': self.phone_number, 'city': self.city, 'address': self.address}

        response = self.client.post(reverse('register'), data=user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        user_data['corporate_name'] = 'abcd'
        user_data['corporate_number'] = 123456789012
        response = self.client.post(reverse('register'), data=user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        User.objects.last().delete()
        user_data['corporate_number'] = 123
        response = self.client.post(reverse('register'), data=user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        user_data['corporate_number'] = 123456
        response = self.client.post(reverse('register'), data=user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        User.objects.last().delete()
        user_data['corporate_name'] = ''
        response = self.client.post(reverse('register'), data=user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
