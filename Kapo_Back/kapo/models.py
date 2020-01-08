from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext as _
from accounts.models import User
import random
import datetime
from django.core.validators import MinValueValidator, MaxValueValidator


product_images_dir = 'static/products/'
profile_images_dir = 'static/users/'
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


def year_choices():
    return [(r, r) for r in range(1900, datetime.date.today().year + 1)]


def current_year():
    return datetime.date.today().year


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    created = models.DateTimeField(_("creation date"), auto_now_add=True)
    name = models.CharField(_("name"), max_length=100, default="")
    image_dir = random.randint(0, 1e20)
    image = models.ImageField(_("image"), upload_to=product_images_dir, height_field=None,
                              width_field=None, null=True, blank=True)
    description = models.TextField(_("description"), default="")
    owner = models.ForeignKey(User, related_name=_('products'), on_delete=models.CASCADE)
    main_category = models.CharField(_("category"), choices=PRODUCT_CATEGORIES, max_length=100, default=0)
    price = models.PositiveIntegerField(_("price"), validators=[MinValueValidator(0)])
    quantity = models.PositiveIntegerField(_("quantity"), default=1, validators=[MinValueValidator(0)])
    production_year = models.IntegerField(_('production year'), choices=year_choices(), default=current_year,
                                          validators=[MaxValueValidator(current_year())])
    second_hand = models.BooleanField(_("second hand"), default=False)
    available = models.BooleanField(_("available"), default=False)
    visit_count = models.IntegerField(_("visit count"), default=0)

    class Meta:
        ordering = ['created']
        verbose_name = _('Product')
        verbose_name_plural = _('Products')


class Order(models.Model):
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, related_name=_("orders"), on_delete=models.CASCADE)
    customer = models.ForeignKey(User, related_name=_("orders"), on_delete=models.CASCADE)
    count = models.IntegerField(_('quantity'), default=1, validators=[MinValueValidator(1)])
    created = models.DateTimeField(_("registration date"), auto_now_add=True)

    class Meta:
        ordering = ['created']
        verbose_name = _('Order')
        verbose_name_plural = _('Orders')
