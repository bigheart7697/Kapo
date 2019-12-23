from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from phone_field import PhoneField

PRODUCT_CATAGORIES = ["Digital devices", "Health-care and beauty", "Tools, office supplies and car",
                      "Fashion", "Home appliance", "Book, stationary and art", "Toys and baby"
                      "Sport and traveling", "Food and drink"]


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='users/%s/% Y/% m/% d/' % user.id, height_field=None, width_field=None)
    bio = models.TextField(max_length=500, blank=True)
    phone_number = PhoneField(help_text='User phone number')
    city = models.CharField(max_length=100, default='')
    address = models.CharField(max_length=100, default='')
    visited_products = models.ManyToManyField(Product)

    class Meta:
        verbose_name = 'Profile'
        verbose_name_plural = 'Profiles'

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    created_date = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, default='')
    image = models.ImageField(upload_to='products/%s/% Y/% m/% d/' % id, height_field=None, width_field=None)
    description = models.TextField()
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE())
    main_category = models.CharField(choices=PRODUCT_CATAGORIES, max_length=100)
    if main_category == "Digital devices":
        sub_category = models.CharField()
    price = models.IntegerField()
    second_hand = models.BooleanField()
    available = models.BooleanField()
    visited_num = models.IntegerField()

    class Meta:
        ordering = ['created_date']
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
