import datetime

from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils.translation import ugettext as _

from accounts.models import User

product_images_dir = 'products/'


def year_choices():
    return [(r, r) for r in range(1900, datetime.date.today().year + 1)]


def current_year():
    return datetime.date.today().year


class Product(models.Model):
    class Cat1(models.TextChoices):
        ELECTRONICS = '1', _('وسایل الکترونیکی')
        PERSONAL = '2', _('بهداشت و شخصی')
        BUSINESSES = '3', _('تجاری')
        VEHICLE = '4', _('وسایل نقلیه')
        HOME = '5', _('ابزار آلات خانه')
        LEISURE = '6', _('تفریح و سرگرمی')

    class Cat2(models.TextChoices):
        FURNITURE_AND_HOME_DECOR = '1', _('مبلمان و دکور خانه')
        CARS = '2', _('اتومبیل')
        BABY_AND_TOYS = '3', _('نوزاد و اسباب بازی')
        PARTS_ACCESSORIES = '4', _('قطعات و لوازم جانبی')
        UTENSILS_AND_APPLIANCES = '5', _('وسایل و ظروف')
        CLOTHING_AND_SHOES = '6', _('کفش و لباس')
        MOBILE_TABLET = '7', _('گوشی وتبلت')
        CHILDREN_CLOTHING_AND_SHOE = '8', _('کفش و لباس کودکان')
        GAME_CONSOLES_AND_VIDEO_GAMES = '9', _('کنسول و بازی ویدئویی')
        AUDIO_VIDEO = '10', _('صوت و تصویر')
        BUILDING_AND_GARDEN = '11', _('باغچه و ساختمان')
        JEWELRY_AND_WATCHES = '12', _('ساعت و جواهرات')
        EQUIPMENTS_AND_MACHINERY = '13', _('تجهیزات و ماشین‌آلات')
        BICYCLE = '14', _('دوچرخه')
        ANIMALS = '15', _('حیوانات')
        BATCH = '16', _('batch')
        MUSICAL_INSTRUMENTS = '17', _('ابزار آلات موسیقی')
        HEALTH_BEAUTY = '18', _('زیبایی و سلامت')
        MOTORCYCLES = '19', _('موتور سیکلت')
        COMPUTERS = '20', _('کامپیوتر')
        SPORT_LEISURE = '21', _('تفریح و ورزش')
        BOOK_STUDENT_LITERATURE = '22', _('کتاب و ادبیات')
        UTILITY = '23', _('ابزار')
        TRAVEL_PACKAGES = '24', _('وسایل مسافرت')
        HOBBY_COLLECTIBLES = '25', _('سرگرمی‌های کلکسیونی')
        LEISURE_HOBBIES_TOYS = '26', _('اسباب بازی‌های سرگمی')
        PHONE = '27', _('تلفن')

    class Cat3(models.TextChoices):
        SOFA_ARMCHAIR = '1', _('مبل و صندلی')
        ANTIQUES_AND_ART = '2', _('هنر و عتیقه')
        HEAVY = '3', _('وسایل نقلیه سنگین')
        PERSONAL_TOYS = '4', _('اسباب بازی شخصی')
        COOKWARE_TABLEWARE = '5', _('وسایل آشپزی')
        LIGHT = '6', _('چراغ')
        CLOTHING = '7', _('لباس')
        MOBILE_PHONES = '8', _('تلفن موبایل')
        TV_PROJECTOR = '9', _('پروژکتور')
        GARDEN_AND_PATIO = '10', _('پاسیو و باغچه')
        WATCHES = '11', _('ساعت')
        OFFICES = '12', _('وسایل اداری')
        KITCHEN = '13', _('آشپزخانه')
        FARM_ANIMALS = '14', _('حیوانات مزرعه')
        CAT = '15', _('گربه')
        VIDEO_DVD_PLAYER = '16', _('پخش کننده‌ی ویدئو و دی‌وی‌دی')
        SHOES_BELT_BAG = '17', _('کفش، کوله پشتی و کمربند')
        INDUSTRIAL = '18', _('وسایل صنعتی')
        TV_AND_STEREO_FURNITURE = '19', _('لوازم تلویزیون و استریو')
        BIRDS = '20', _('پرندگان')
        GUITAR_BASS_AMPLIFIER = '21', _('تقویت‌کننده گیتار باس')
        BEDS_BEDROOM = '22', _('وسایل اتاق خواب')
        CARPETS = '23', _('فرش')
        MOBILE_TABLET_ACCESSORIES = '24', _('وسایل جانبی گوشی و تبلت')
        FRIDGE_AND_FREEZER = '25', _('یخچال و فریزر')
        LIGHTING = '26', _('روشنایی')
        TABLES_AND_CHAIRS = '27', _('میز و صندلی')
        STROLLERS_AND_ACCESSORIES = '28', _('چرخ دستی و لوازم جانبی')
        MODEM_AND_NETWORK_EQUIPMENT = '29', _('مودم و وسایل شبکه')
        JEWELRY = '30', _('جواهر آلات')
        STEREO_SURROUND = '31', _('وسایل استریو')
        CAMERA_CAM_CODERS = '32', _('رمزگذاری دوربین')
        TRAINING = '33', _('وسایل تمرینات ورزشی')
        STORAGE = '34', _('انبار')
        STOVE_AND_HEATING = '35', _('اجاق و گرمایش')
        BARBERSHOP_AND_BEAUTY_SALON = '36', _('وسایل پیرایش و آرایشگری')
        DISHWASHER = '37', _('ماشین ظرف‌شویی')
        PARTS_AND_ACCESSORIES = '38', _('قطعات و لوازم جانبی')
        CAFE_AND_RESTAURANT = '39', _('کافه و رستوران')
        MICROWAVE_STOVE = '40', _('اجاق مایکروویو')
        WASHER_DRYER = '41', _('ماشین ظرفشویی و خشک‌کننده')
        EDUCATIONAL = '42', _('کتب آموزشی')
        CHILDREN_FURNITURE = '43', _('اثاثیه کودک')
        PIANO_KEYBOARD = '44', _('پیانو و کیبورد')
        DESKTOPS = '45', _('صفحه نمایش')
        SHOP_AND_CASH = '46', _('فروشگاه و پول نقد')
        LAPTOPS = '47', _('لپتاپ')
        RHINESTONES = '48', _('بدلیجات')
        BATHROOM_WC_SAUNA = '49', _('سرویس بهداشتی، سونا و حمام')
        MP3_PLAYER = '50', _('mp3 player')
        TEXTILE_ORNAMENTS = '51', _('زیور آلات نساجی')
        TABLET = '52', _('تبلت')
        HISTORICAL_OBJECTS = '53', _('اشیای تاریخی')
        INSTRUMENT_CLEANING_TAILORING = '54', _('ابزار تمیز کردن')
        FISH = '55', _('ماهی')
        ACCESSORIES = '56', _('تجهیزات جانبی')
        CAMPING_OUTDOOR = '57', _('وسایل کمپ')
        TRADITIONAL = '58', _('سنتی')
        CHILD_CAR_SEAT = '59', _('صندلی اتوموبیل کودک')
        PRINTER_SCANNER_COPIER = '60', _('پرینتر، اسکنر و کپی')
        RODENTS_RABBITS = '61', _('خرگوش و جوندگان')
        COIN_STAMP = '62', _('سکه و مهر')
        BALL_SPORTS = '63', _('ورزش‌های با توپ')
        REPAIR_TOOL = '64', _('ابزار تعمیر')
        WINTER_SPORTS = '65', _('ورزش‌های زمستانی')
        DRUMS_PERCUSSION = '66', _('طبل و کوبه')

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
    image = models.ImageField(_("image"), upload_to=product_images_dir, height_field=None,
                              width_field=None, null=True, blank=True)
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

    class Meta:
        ordering = ['created']
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


class Order(models.Model):
    class State(models.IntegerChoices):
        AWAITING = 1
        COMPLETED = 2
        FAILED = 3
        CANCELED = 4

    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, related_name=_("orders"), on_delete=models.CASCADE)
    customer = models.ForeignKey(User, related_name=_("orders"), on_delete=models.CASCADE)
    count = models.IntegerField(_('quantity'), default=1, validators=[MinValueValidator(1)])
    created = models.DateTimeField(_("registration date"), auto_now_add=True)
    state = models.IntegerField(_("state"), choices=State.choices, default=State.AWAITING)

    class Meta:
        ordering = ['created']
        verbose_name = _('Order')
        verbose_name_plural = _('Orders')


class SponsoredSearch(models.Model):
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, related_name=_("sponsored_searches"), on_delete=models.CASCADE)
    count = models.IntegerField(_('search count'), validators=[MinValueValidator(1000)])
    remaining_count = models.IntegerField(_('remaining count'), validators=[MinValueValidator(0)])
    valid = models.BooleanField(_("valid"), default=True)
    search_phrases = models.CharField(_('search phrases'), max_length=20)

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        if self.remaining_count > 0:
            self.valid = True
        else:
            self.valid = False
        super(SponsoredSearch, self).save(force_insert=force_insert, force_update=force_update, using=None,
                                          update_fields=None)
