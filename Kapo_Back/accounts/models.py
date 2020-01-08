from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext as _
from phonenumber_field.modelfields import PhoneNumberField


profile_images_dir = 'static/users/'


class User(AbstractUser):
    username = models.CharField(blank=True, null=True, max_length=100)
    email = models.EmailField(_('email'), unique=True)
    country = models.CharField(_('country'), max_length=100, default='')
    city = models.CharField(_('city'), max_length=100, default='', blank=True, null=True)
    address = models.CharField(_('address'), max_length=100, default='')
    phone_number = PhoneNumberField(_('phone number'), unique=True)
    photo = models.ImageField(_('photo'), upload_to=profile_images_dir, null=True, blank=True)
    is_corporate = models.BooleanField(default=False)
    corporate_name = models.CharField(_('corporate name'), max_length=200, null=True, blank=True)
    corporate_number = models.CharField(_('corporate number'), max_length=12, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'phone_number']

    def __str__(self):
        return "{}".format(self.email)

