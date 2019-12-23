from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext as _
import random
from django.db.models.signals import post_save
from django.dispatch import receiver
from phonenumber_field.modelfields import PhoneNumberField

PRODUCT_CATEGORIES = [("0", _("Default")),
                      ("1", _("Digital")),
                      ("2", _("Health-Care")),
                      ("3", _("Tools, office supplies and car")),
                      ("4", _("Fashion")),
                      ("5", _("Home appliance")),
                      ("6", _("Book, stationary and art")),
                      ("7", _("Toys and baby")),
                      ("8", _("Sport and traveling")),
                      ("9", _("Food and drink"))]


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image_dir = random.randint(0, 1e20)
    image = models.ImageField(upload_to='users/{}/'.format(image_dir), null=True)
    bio = models.TextField(max_length=500, blank=True)
    phone_number = PhoneNumberField(unique=True)
    city = models.CharField(max_length=100, default='')
    address = models.CharField(max_length=100, default='')

    # visited_products = models.ManyToManyField(Product)

    class Meta:
        verbose_name = _('Profile')
        verbose_name_plural = _('Profiles')


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    created = models.DateTimeField(_("creation date"), auto_now_add=True)
    name = models.CharField(_("name"), max_length=100, default="")
    image_dir = random.randint(0, 1e20)
    image = models.ImageField(_("image"), upload_to='products/{}/'.format(image_dir), height_field=None,
                              width_field=None, null=True)
    description = models.TextField(_("description"), default="")
    owner = models.ForeignKey(Profile, related_name='products', on_delete=models.CASCADE)
    main_category = models.CharField(_("category"), choices=PRODUCT_CATEGORIES, max_length=100, default=0)
    # if main_category == "Digital devices":
    #     sub_category = models.CharField()
    price = models.IntegerField(_("price"))
    quantity = models.IntegerField(_("quantity"), default=1)
    second_hand = models.BooleanField(_("second hand"), default=False)
    available = models.BooleanField(_("available"), default=False)
    visit_count = models.IntegerField(_("visit count"), default=0)

    class Meta:
        ordering = ['created']
        verbose_name = _('Product')
        verbose_name_plural = _('Products')
