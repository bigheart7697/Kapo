import datetime

from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import ugettext as _

from django.db.models import Avg

from accounts.models import User

product_images_dir = 'products/'


def year_choices():
    return [(r, r) for r in range(1900, datetime.date.today().year + 1)]


def current_year():
    return datetime.date.today().year


class Transaction(models.Model):

    class Type(models.IntegerChoices):
        SPONSOR = 1
        BANNER = 2
        CAMPAIGN = 3
        ORDER = 4
        INCREASE_BALANCE = 5
        LIQUIDATE = 6

    id = models.AutoField(primary_key=True)
    type = models.IntegerField(_("type"), choices=Type.choices)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='debt')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='credit', null=True, blank=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    transaction_object = GenericForeignKey('content_type', 'object_id')
    amount = models.IntegerField(_("amount"))
    created = models.DateTimeField(_("created"), auto_now_add=True)

    class Meta:
        ordering = ['-created']
        verbose_name = _('Transaction')
        verbose_name_plural = _('Transactions')
        unique_together = ('content_type', 'object_id')


class TransactionMixin(object):
    @property
    def get_transaction(self):
        content_type = ContentType.objects.get_for_model(self.__class__)
        try:
            transaction = Transaction.objects.get(content_type__pk=content_type.id, object_id=self.id)
        except:
            return None
        return transaction


class Product(models.Model):
    class Cat1(models.TextChoices):
        ELECTRONICS = '1', _('electronics')
        PERSONAL = '2', _('personal')
        BUSINESSES = '3', _('businesses')
        VEHICLE = '4', _('vehicle')
        HOME = '5', _('home-appliance')
        LEISURE = '6', _('leisure-and-hobbies')

    class Cat2(models.TextChoices):
        FURNITURE_AND_HOME_DECOR = '1', _('furniture-and-home-decor')
        CARS = '2', _('cars')
        BABY_AND_TOYS = '3', _('baby-and-toys')
        PARTS_ACCESSORIES = '4', _('parts-accessories')
        UTENSILS_AND_APPLIANCES = '5', _('utensils-and-appliances')
        CLOTHING_AND_SHOES = '6', _('clothing-and-shoes')
        MOBILE_TABLET = '7', _('mobile-tablet')
        CHILDREN_CLOTHING_AND_SHOE = '8', _('children-clothing-and-shoe')
        GAME_CONSOLES_AND_VIDEO_GAMES = '9', _('game-consoles-and-video-games')
        AUDIO_VIDEO = '10', _('audio-video')
        BUILDING_AND_GARDEN = '11', _('building-and-garden')
        JEWELRY_AND_WATCHES = '12', _('jewelry-and-watches')
        EQUIPMENTS_AND_MACHINERY = '13', _('equipments-and-machinery')
        BICYCLE = '14', _('bicycle')
        ANIMALS = '15', _('animals')
        BATCH = '16', _('batch')
        MUSICAL_INSTRUMENTS = '17', _('musical-instruments')
        HEALTH_BEAUTY = '18', _('health-beauty')
        MOTORCYCLES = '19', _('motorcycles')
        COMPUTERS = '20', _('computers')
        SPORT_LEISURE = '21', _('sport-leisure')
        BOOK_STUDENT_LITERATURE = '22', _('book-student-literature')
        UTILITY = '23', _('utility')
        TRAVEL_PACKAGES = '24', _('travel-packages')
        HOBBY_COLLECTIBLES = '25', _('hobby-collectibles')
        LEISURE_HOBBIES_TOYS = '26', _('leisure-hobbies-toys')
        PHONE = '27', _('phone')

    class Cat3(models.TextChoices):
        SOFA_ARMCHAIR = '1', _('sofa-armchair')
        ANTIQUES_AND_ART = '2', _('antiques-and-art')
        HEAVY = '3', _('heavy')
        PERSONAL_TOYS = '4', _('personal-toys')
        COOKWARE_TABLEWARE = '5', _('cookware-tableware')
        LIGHT = '6', _('light')
        CLOTHING = '7', _('clothing')
        MOBILE_PHONES = '8', _('mobile-phones')
        TV_PROJECTOR = '9', _('tv-projector')
        GARDEN_AND_PATIO = '10', _('garden-and-patio')
        WATCHES = '11', _('watches')
        OFFICES = '12', _('offices')
        KITCHEN = '13', _('kitchen')
        FARM_ANIMALS = '14', _('farm-animals')
        CAT = '15', _('cat')
        VIDEO_DVD_PLAYER = '16', _('video-dvd-player')
        SHOES_BELT_BAG = '17', _('shoes-belt-bag')
        INDUSTRIAL = '18', _('industrial')
        TV_AND_STEREO_FURNITURE = '19', _('tv-and-stereo-furniture')
        BIRDS = '20', _('birds')
        GUITAR_BASS_AMPLIFIER = '21', _('guitar-bass-amplifier')
        BEDS_BEDROOM = '22', _('beds-bedroom')
        CARPETS = '23', _('carpets')
        MOBILE_TABLET_ACCESSORIES = '24', _('mobile-tablet-accessories')
        FRIDGE_AND_FREEZER = '25', _('fridge-and-freezer')
        LIGHTING = '26', _('lighting')
        TABLES_AND_CHAIRS = '27', _('tables-and-chairs')
        STROLLERS_AND_ACCESSORIES = '28', _('strollers-and-accessories')
        MODEM_AND_NETWORK_EQUIPMENT = '29', _('modem-and-network-equipment')
        JEWELRY = '30', _('jewelry')
        STEREO_SURROUND = '31', _('stereo-surround')
        CAMERA_CAM_CODERS = '32', _('camera-cam-coders')
        TRAINING = '33', _('training')
        STORAGE = '34', _('storage')
        STOVE_AND_HEATING = '35', _('stove-and-heating')
        BARBERSHOP_AND_BEAUTY_SALON = '36', _('barbershop-and-beauty-salon')
        DISHWASHER = '37', _('dishwasher')
        PARTS_AND_ACCESSORIES = '38', _('parts-and-accessories')
        CAFE_AND_RESTAURANT = '39', _('cafe-and-restaurant')
        MICROWAVE_STOVE = '40', _('microwave-stove')
        WASHER_DRYER = '41', _('washer-dryer')
        EDUCATIONAL = '42', _('educational')
        CHILDREN_FURNITURE = '43', _('children-furniture')
        PIANO_KEYBOARD = '44', _('piano-keyboard')
        DESKTOPS = '45', _('desktops')
        SHOP_AND_CASH = '46', _('shop-and-cash')
        LAPTOPS = '47', _('laptops')
        RHINESTONES = '48', _('rhinestones')
        BATHROOM_WC_SAUNA = '49', _('bathroom-wc-sauna')
        MP3_PLAYER = '50', _('mp3-player')
        TEXTILE_ORNAMENTS = '51', _('textile-ornaments')
        TABLET = '52', _('tablet')
        HISTORICAL_OBJECTS = '53', _('historical-objects')
        INSTRUMENT_CLEANING_TAILORING = '54', _('instrument-cleaning-tailoring')
        FISH = '55', _('fish')
        ACCESSORIES = '56', _('accessories')
        CAMPING_OUTDOOR = '57', _('camping-outdoor')
        TRADITIONAL = '58', _('traditional')
        CHILD_CAR_SEAT = '59', _('child-car-seat')
        PRINTER_SCANNER_COPIER = '60', _('printer-scanner-copier')
        RODENTS_RABBITS = '61', _('rodents-rabbits')
        COIN_STAMP = '62', _('coin-stamp')
        BALL_SPORTS = '63', _('ball-sports')
        REPAIR_TOOL = '64', _('repair-tool')
        WINTER_SPORTS = '65', _('winter-sports')
        DRUMS_PERCUSSION = '66', _('drums-percussion')

    category_hierarchy = {
        str(Cat1.BUSINESSES): {str(Cat2.EQUIPMENTS_AND_MACHINERY): [str(Cat3.BARBERSHOP_AND_BEAUTY_SALON),
                                                                    str(Cat3.CAFE_AND_RESTAURANT),
                                                                    str(Cat3.INDUSTRIAL),
                                                                    str(Cat3.OFFICES),
                                                                    str(Cat3.SHOP_AND_CASH)]},
        str(Cat1.ELECTRONICS): {str(Cat2.AUDIO_VIDEO): [str(Cat3.CAMERA_CAM_CODERS),
                                                        str(Cat3.MP3_PLAYER),
                                                        str(Cat3.STEREO_SURROUND),
                                                        str(Cat3.TV_PROJECTOR),
                                                        str(Cat3.VIDEO_DVD_PLAYER)],
                                str(Cat2.COMPUTERS): [str(Cat3.DESKTOPS),
                                                      str(Cat3.LAPTOPS),
                                                      str(Cat3.MODEM_AND_NETWORK_EQUIPMENT),
                                                      str(Cat3.PARTS_AND_ACCESSORIES),
                                                      str(Cat3.PRINTER_SCANNER_COPIER)],
                                str(Cat2.MOBILE_TABLET): [str(Cat3.MOBILE_PHONES),
                                                          str(Cat3.MOBILE_TABLET_ACCESSORIES),
                                                          str(Cat3.TABLET)]},
        str(Cat1.HOME): {str(Cat2.BUILDING_AND_GARDEN): [str(Cat3.BATHROOM_WC_SAUNA),
                                                         str(Cat3.GARDEN_AND_PATIO),
                                                         str(Cat3.KITCHEN),
                                                         str(Cat3.STOVE_AND_HEATING)],
                         str(Cat2.FURNITURE_AND_HOME_DECOR): [str(Cat3.ANTIQUES_AND_ART),
                                                              str(Cat3.BEDS_BEDROOM),
                                                              str(Cat3.CARPETS),
                                                              str(Cat3.LIGHTING),
                                                              str(Cat3.SOFA_ARMCHAIR),
                                                              str(Cat3.STORAGE),
                                                              str(Cat3.TABLES_AND_CHAIRS),
                                                              str(Cat3.TEXTILE_ORNAMENTS),
                                                              str(Cat3.TV_AND_STEREO_FURNITURE)],
                         str(Cat2.UTENSILS_AND_APPLIANCES): [str(Cat3.COOKWARE_TABLEWARE),
                                                             str(Cat3.DISHWASHER),
                                                             str(Cat3.FRIDGE_AND_FREEZER),
                                                             str(Cat3.MICROWAVE_STOVE),
                                                             str(Cat3.WASHER_DRYER)],
                         str(Cat2.UTILITY): [str(Cat3.INSTRUMENT_CLEANING_TAILORING),
                                             str(Cat3.REPAIR_TOOL)]},
        str(Cat1.LEISURE): {str(Cat2.ANIMALS): [str(Cat3.ACCESSORIES),
                                                str(Cat3.BIRDS),
                                                str(Cat3.CAT),
                                                str(Cat3.FARM_ANIMALS),
                                                str(Cat3.FISH),
                                                str(Cat3.RODENTS_RABBITS)],
                            str(Cat2.BOOK_STUDENT_LITERATURE): [str(Cat3.EDUCATIONAL)],
                            str(Cat2.HOBBY_COLLECTIBLES): [str(Cat3.COIN_STAMP),
                                                           str(Cat3.HISTORICAL_OBJECTS)],
                            str(Cat2.MUSICAL_INSTRUMENTS): [str(Cat3.DRUMS_PERCUSSION),
                                                            str(Cat3.GUITAR_BASS_AMPLIFIER),
                                                            str(Cat3.PIANO_KEYBOARD),
                                                            str(Cat3.TRADITIONAL)],
                            str(Cat2.SPORT_LEISURE): [str(Cat3.BALL_SPORTS),
                                                      str(Cat3.CAMPING_OUTDOOR),
                                                      str(Cat3.TRAINING),
                                                      str(Cat3.WINTER_SPORTS)]},
        str(Cat1.PERSONAL): {str(Cat2.BABY_AND_TOYS): [str(Cat3.CHILD_CAR_SEAT),
                                                       str(Cat3.CHILDREN_FURNITURE),
                                                       str(Cat3.STROLLERS_AND_ACCESSORIES)],
                             str(Cat2.CLOTHING_AND_SHOES): [str(Cat3.CLOTHING),
                                                            str(Cat3.SHOES_BELT_BAG)],
                             str(Cat2.JEWELRY_AND_WATCHES): [str(Cat3.JEWELRY),
                                                             str(Cat3.RHINESTONES),
                                                             str(Cat3.WATCHES)]},
        str(Cat1.VEHICLE): {str(Cat2.CARS): [str(Cat3.HEAVY),
                                             str(Cat3.LIGHT)]}}

    id = models.AutoField(primary_key=True)
    created = models.DateTimeField(_("creation date"), auto_now_add=True)
    name = models.CharField(_("name"), max_length=100, default="")
    image = models.TextField(_("image"), default="", null=True, blank=True)
    description = models.TextField(_("description"), default="")
    owner = models.ForeignKey(User, related_name=_('products'), on_delete=models.CASCADE)
    cat1 = models.CharField(_("cat1"), choices=Cat1.choices, max_length=100)
    cat2 = models.CharField(_("cat2"), choices=Cat2.choices, max_length=100, null=True, blank=True)
    cat3 = models.CharField(_("cat3"), choices=Cat3.choices, max_length=100, null=True, blank=True)

    price = models.PositiveIntegerField(_("price"), validators=[MinValueValidator(0)])
    quantity = models.PositiveIntegerField(_("quantity"), default=1, validators=[MinValueValidator(0)])
    production_year = models.IntegerField(_('production year'), choices=year_choices(), default=current_year,
                                          validators=[MaxValueValidator(current_year())])
    second_hand = models.BooleanField(_("second hand"), default=False)
    available = models.BooleanField(_("available"), default=False)
    visit_count = models.IntegerField(_("visit count"), default=0)
    deleted = models.BooleanField(_("deleted"), default=False)

    class Meta:
        ordering = ['-created']
        verbose_name = _('Product')
        verbose_name_plural = _('Products')

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        if self.quantity > 0:
            self.available = True
        else:
            self.available = False
        super(Product, self).save(force_insert=force_insert, force_update=force_update, using=None,
                                  update_fields=None)

    @property
    def average_rating(self):
        ratings = self.ratings.aggregate(Avg('rating'))['rating__avg']
        if ratings is None:
            return 0.
        return ratings


class Order(TransactionMixin, models.Model):
    class State(models.IntegerChoices):
        AWAITING = 1
        COMPLETED = 2
        FAILED = 3
        CANCELED = 4

    class WeekDay(models.IntegerChoices):
        SATURDAY = 1
        SUNDAY = 2
        MONDAY = 3
        TUESDAY = 4
        WEDNESDAY = 5
        THURSDAY = 6
        FRIDAY = 7

    class TimeInterval(models.IntegerChoices):
        NINE_TWELVE = 1
        TWELVE_FIFTEEN = 2
        FIFTEEN_EIGHTEEN = 3

    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, related_name=_("orders"), on_delete=models.CASCADE)
    customer = models.ForeignKey(User, related_name=_("orders"), on_delete=models.CASCADE)
    count = models.IntegerField(_('quantity'), default=1, validators=[MinValueValidator(1)])
    created = models.DateTimeField(_("registration date"), auto_now_add=True)
    state = models.IntegerField(_("state"), choices=State.choices, default=State.AWAITING)
    delivery_weekday = models.IntegerField(_("delivery_weekday"), choices=WeekDay.choices, default=WeekDay.SATURDAY)
    delivery_hours = models.IntegerField(_("delivery_hours"), choices=TimeInterval.choices,
                                         default=TimeInterval.NINE_TWELVE)

    class Meta:
        ordering = ['-created']
        verbose_name = _('Order')
        verbose_name_plural = _('Orders')


class SponsoredSearch(TransactionMixin, models.Model):
    FEE = 1000

    class State(models.IntegerChoices):
        AWAITING = 1
        COMPLETED = 2

    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, related_name=_("sponsored_searches"), on_delete=models.CASCADE)
    count = models.IntegerField(_('search count'), validators=[MinValueValidator(1000)])
    remaining_count = models.IntegerField(_('remaining count'), validators=[MinValueValidator(0)])
    valid = models.BooleanField(_("valid"), default=False)
    search_phrases = models.CharField(_('search phrases'), max_length=20)
    state = models.IntegerField(_("state"), choices=State.choices, default=State.AWAITING)
    created = models.DateTimeField(_("registration date"), auto_now_add=True)

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        if self.remaining_count > 0 and self.state == self.State.COMPLETED:
            self.valid = True
        else:
            self.valid = False
        super(SponsoredSearch, self).save(force_insert=force_insert, force_update=force_update, using=None,
                                          update_fields=None)

    class Meta:
        ordering = ['-created']
        verbose_name = _('Sponsored Search')
        verbose_name_plural = _('Sponsored Searches')


class Banner(TransactionMixin, models.Model):
    FEE = 1000000

    MAX_FIRST_NUM = 6
    MAX_SECOND_NUM = 6
    MAX_THIRD_NUM = 6

    class State(models.IntegerChoices):
        AWAITING = 1
        COMPLETED = 2

    class Place(models.IntegerChoices):
        FIRST = 1
        SECOND = 2
        THIRD = 3

    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, related_name=_("banners"), on_delete=models.CASCADE)
    valid = models.BooleanField(_("valid"), default=False)
    state = models.IntegerField(_("state"), choices=State.choices, default=State.AWAITING)
    place = models.IntegerField(_("place"), choices=Place.choices, default=Place.FIRST)
    slogan = models.TextField(_("slogan"), max_length=100)
    days = models.IntegerField(_("days"), validators=[MinValueValidator(1), MaxValueValidator(7)])
    remaining_days = models.IntegerField(_("remaining_days"), default=0, validators=[MinValueValidator(0)])
    created = models.DateTimeField(_("registration date"), auto_now_add=True)

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        if self.remaining_days > 0 and self.state == self.State.COMPLETED:
            self.valid = True
        else:
            self.valid = False
        super(Banner, self).save(force_insert=force_insert, force_update=force_update, using=None, update_fields=None)

    class Meta:
        ordering = ['-created']
        verbose_name = _('Banners')
        verbose_name_plural = _('Banners')


class Rate(models.Model):
    RATING_RANGE = (
        ('1', '1'),
        ('2', '2'),
        ('3', '3'),
        ('4', '4'),
        ('5', '5')
    )
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='ratings')
    rating = models.IntegerField(choices=RATING_RANGE, )

    class Meta:
        unique_together = [["user", "product"]]


class Liquidate(TransactionMixin, models.Model):
    owner = models.ForeignKey(User, related_name='liquidate', on_delete=models.CASCADE)
    amount = models.IntegerField(_("amount"))
    created = models.DateTimeField(_("registration date"), auto_now_add=True)

    class Meta:
        ordering = ['-created']
        verbose_name = _('Liquidate')
        verbose_name_plural = _('Liquidates')


class Campaign(TransactionMixin, models.Model):

    FEE = 1000000

    MAX_FIRST_NUM = 3
    MAX_SECOND_NUM = 3
    MAX_THIRD_NUM = 3

    class State(models.IntegerChoices):
        AWAITING = 1
        COMPLETED = 2

    class Place(models.IntegerChoices):
        FIRST = 1
        SECOND = 2
        THIRD = 3

    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, related_name=_("campaigns"), on_delete=models.CASCADE)
    valid = models.BooleanField(_("valid"), default=False)
    place = models.IntegerField(_("place"), choices=Place.choices, default=Place.FIRST)
    state = models.IntegerField(_("state"), choices=State.choices, default=State.AWAITING)
    days = models.IntegerField(_("days"), validators=[MinValueValidator(3), MaxValueValidator(7)])
    discount = models.IntegerField(_("discount"), default=10, validators=[MinValueValidator(10), MaxValueValidator(99)])
    remaining_days = models.IntegerField(_("remaining_days"), default=0, validators=[MinValueValidator(0)])
    created = models.DateTimeField(_("registration date"), auto_now_add=True)

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        if self.remaining_days > 0 and self.state == self.State.COMPLETED:
            self.valid = True
        else:
            self.valid = False
        super(Campaign, self).save(force_insert=force_insert, force_update=force_update, using=None, update_fields=None)

    class Meta:
        ordering = ['-created']
        verbose_name = _('Campaign')
        verbose_name_plural = _('Campaigns')


class BalanceIncrease(TransactionMixin, models.Model):
    class State(models.IntegerChoices):
        AWAITING = 1
        COMPLETED = 2

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, related_name='balance_increase', on_delete=models.CASCADE)
    state = models.IntegerField(_("state"), choices=State.choices, default=State.AWAITING)
    amount = models.IntegerField(_('amount'), validators=[MinValueValidator(0)])
    created = models.DateTimeField(_("registration date"), auto_now_add=True)

    class Meta:
        ordering = ['-created']
        verbose_name = _('Balance Increase')
        verbose_name_plural = _('Balance Increases')


@receiver(post_save, sender=BalanceIncrease)
def create_increase_balance_transaction(sender, instance, created, **kwargs):
    if created:
        transaction_type = Transaction.Type.INCREASE_BALANCE
        Transaction.objects.create(sender=instance.user, transaction_object=instance,
                                   amount=instance.amount, type=transaction_type)


@receiver(post_save, sender=SponsoredSearch)
def create_sponsor_transaction(sender, instance, created, **kwargs):
    if created:
        transaction_type = Transaction.Type.SPONSOR
        Transaction.objects.create(sender=instance.product.owner, transaction_object=instance,
                                   amount=instance.count*instance.FEE, type=transaction_type)


@receiver(post_save, sender=Banner)
def create_banner_transaction(sender, instance, created, **kwargs):
    if created:
        transaction_type = Transaction.Type.BANNER
        Transaction.objects.create(sender=instance.product.owner, transaction_object=instance,
                                   amount=instance.days*instance.FEE, type=transaction_type)


@receiver(post_save, sender=Campaign)
def create_campaign_transaction(sender, instance, created, **kwargs):
    if created:
        transaction_type = Transaction.Type.CAMPAIGN
        Transaction.objects.create(sender=instance.product.owner, transaction_object=instance,
                                   amount=instance.days*instance.FEE, type=transaction_type)


@receiver(post_save, sender=Liquidate)
def create_liquidate_transaction(sender, instance, created, **kwargs):
    if created:
        transaction_type = Transaction.Type.LIQUIDATE
        Transaction.objects.create(sender=instance.owner, transaction_object=instance,
                                   amount=instance.amount, type=transaction_type)
