from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext as _
from phonenumber_field.modelfields import PhoneNumberField

profile_images_dir = 'static/users/'


class User(AbstractUser):
    username = models.CharField(blank=True, null=True, max_length=100)
    email = models.EmailField(_('email'), unique=True)
    city = models.CharField(max_length=100, default='')
    address = models.CharField(max_length=100, default='')
    phone_number = PhoneNumberField(unique=True)
    photo = models.ImageField(upload_to=profile_images_dir, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name', 'phone_number']

    def __str__(self):
        return "{}".format(self.email)
