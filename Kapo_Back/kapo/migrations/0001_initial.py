# Generated by Django 3.0.1 on 2020-02-15 09:49

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import kapo.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='creation date')),
                ('name', models.CharField(default='', max_length=100, verbose_name='name')),
                ('image', models.TextField(blank=True, default='', null=True, verbose_name='image')),
                ('description', models.TextField(default='', verbose_name='description')),
                ('cat1', models.CharField(choices=[('1', 'electronics'), ('2', 'personal'), ('3', 'businesses'), ('4', 'vehicle'), ('5', 'home-appliance'), ('6', 'leisure-and-hobbies')], max_length=100, verbose_name='cat1')),
                ('cat2', models.CharField(blank=True, choices=[('1', 'furniture-and-home-decor'), ('2', 'cars'), ('3', 'baby-and-toys'), ('4', 'parts-accessories'), ('5', 'utensils-and-appliances'), ('6', 'clothing-and-shoes'), ('7', 'mobile-tablet'), ('8', 'children-clothing-and-shoe'), ('9', 'game-consoles-and-video-games'), ('10', 'audio-video'), ('11', 'building-and-garden'), ('12', 'jewelry-and-watches'), ('13', 'equipments-and-machinery'), ('14', 'bicycle'), ('15', 'animals'), ('16', 'batch'), ('17', 'musical-instruments'), ('18', 'health-beauty'), ('19', 'motorcycles'), ('20', 'computers'), ('21', 'sport-leisure'), ('22', 'book-student-literature'), ('23', 'utility'), ('24', 'travel-packages'), ('25', 'hobby-collectibles'), ('26', 'leisure-hobbies-toys'), ('27', 'phone')], max_length=100, null=True, verbose_name='cat2')),
                ('cat3', models.CharField(blank=True, choices=[('1', 'sofa-armchair'), ('2', 'antiques-and-art'), ('3', 'heavy'), ('4', 'personal-toys'), ('5', 'cookware-tableware'), ('6', 'light'), ('7', 'clothing'), ('8', 'mobile-phones'), ('9', 'tv-projector'), ('10', 'garden-and-patio'), ('11', 'watches'), ('12', 'offices'), ('13', 'kitchen'), ('14', 'farm-animals'), ('15', 'cat'), ('16', 'video-dvd-player'), ('17', 'shoes-belt-bag'), ('18', 'industrial'), ('19', 'tv-and-stereo-furniture'), ('20', 'birds'), ('21', 'guitar-bass-amplifier'), ('22', 'beds-bedroom'), ('23', 'carpets'), ('24', 'mobile-tablet-accessories'), ('25', 'fridge-and-freezer'), ('26', 'lighting'), ('27', 'tables-and-chairs'), ('28', 'strollers-and-accessories'), ('29', 'modem-and-network-equipment'), ('30', 'jewelry'), ('31', 'stereo-surround'), ('32', 'camera-cam-coders'), ('33', 'training'), ('34', 'storage'), ('35', 'stove-and-heating'), ('36', 'barbershop-and-beauty-salon'), ('37', 'dishwasher'), ('38', 'parts-and-accessories'), ('39', 'cafe-and-restaurant'), ('40', 'microwave-stove'), ('41', 'washer-dryer'), ('42', 'educational'), ('43', 'children-furniture'), ('44', 'piano-keyboard'), ('45', 'desktops'), ('46', 'shop-and-cash'), ('47', 'laptops'), ('48', 'rhinestones'), ('49', 'bathroom-wc-sauna'), ('50', 'mp3-player'), ('51', 'textile-ornaments'), ('52', 'tablet'), ('53', 'historical-objects'), ('54', 'instrument-cleaning-tailoring'), ('55', 'fish'), ('56', 'accessories'), ('57', 'camping-outdoor'), ('58', 'traditional'), ('59', 'child-car-seat'), ('60', 'printer-scanner-copier'), ('61', 'rodents-rabbits'), ('62', 'coin-stamp'), ('63', 'ball-sports'), ('64', 'repair-tool'), ('65', 'winter-sports'), ('66', 'drums-percussion')], max_length=100, null=True, verbose_name='cat3')),
                ('price', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(0)], verbose_name='price')),
                ('quantity', models.PositiveIntegerField(default=1, validators=[django.core.validators.MinValueValidator(0)], verbose_name='quantity')),
                ('production_year', models.IntegerField(choices=[(1900, 1900), (1901, 1901), (1902, 1902), (1903, 1903), (1904, 1904), (1905, 1905), (1906, 1906), (1907, 1907), (1908, 1908), (1909, 1909), (1910, 1910), (1911, 1911), (1912, 1912), (1913, 1913), (1914, 1914), (1915, 1915), (1916, 1916), (1917, 1917), (1918, 1918), (1919, 1919), (1920, 1920), (1921, 1921), (1922, 1922), (1923, 1923), (1924, 1924), (1925, 1925), (1926, 1926), (1927, 1927), (1928, 1928), (1929, 1929), (1930, 1930), (1931, 1931), (1932, 1932), (1933, 1933), (1934, 1934), (1935, 1935), (1936, 1936), (1937, 1937), (1938, 1938), (1939, 1939), (1940, 1940), (1941, 1941), (1942, 1942), (1943, 1943), (1944, 1944), (1945, 1945), (1946, 1946), (1947, 1947), (1948, 1948), (1949, 1949), (1950, 1950), (1951, 1951), (1952, 1952), (1953, 1953), (1954, 1954), (1955, 1955), (1956, 1956), (1957, 1957), (1958, 1958), (1959, 1959), (1960, 1960), (1961, 1961), (1962, 1962), (1963, 1963), (1964, 1964), (1965, 1965), (1966, 1966), (1967, 1967), (1968, 1968), (1969, 1969), (1970, 1970), (1971, 1971), (1972, 1972), (1973, 1973), (1974, 1974), (1975, 1975), (1976, 1976), (1977, 1977), (1978, 1978), (1979, 1979), (1980, 1980), (1981, 1981), (1982, 1982), (1983, 1983), (1984, 1984), (1985, 1985), (1986, 1986), (1987, 1987), (1988, 1988), (1989, 1989), (1990, 1990), (1991, 1991), (1992, 1992), (1993, 1993), (1994, 1994), (1995, 1995), (1996, 1996), (1997, 1997), (1998, 1998), (1999, 1999), (2000, 2000), (2001, 2001), (2002, 2002), (2003, 2003), (2004, 2004), (2005, 2005), (2006, 2006), (2007, 2007), (2008, 2008), (2009, 2009), (2010, 2010), (2011, 2011), (2012, 2012), (2013, 2013), (2014, 2014), (2015, 2015), (2016, 2016), (2017, 2017), (2018, 2018), (2019, 2019), (2020, 2020)], default=kapo.models.current_year, validators=[django.core.validators.MaxValueValidator(2020)], verbose_name='production year')),
                ('second_hand', models.BooleanField(default=False, verbose_name='second hand')),
                ('available', models.BooleanField(default=False, verbose_name='available')),
                ('visit_count', models.IntegerField(default=0, verbose_name='visit count')),
                ('deleted', models.BooleanField(default=False, verbose_name='deleted')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Product',
                'verbose_name_plural': 'Products',
                'ordering': ['-created'],
            },
        ),
        migrations.CreateModel(
            name='SponsoredSearch',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('count', models.IntegerField(validators=[django.core.validators.MinValueValidator(1000)], verbose_name='search count')),
                ('remaining_count', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)], verbose_name='remaining count')),
                ('valid', models.BooleanField(default=False, verbose_name='valid')),
                ('search_phrases', models.CharField(max_length=20, verbose_name='search phrases')),
                ('state', models.IntegerField(choices=[(1, 'Awaiting'), (2, 'Completed')], default=1, verbose_name='state')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='registration date')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sponsored_searches', to='kapo.Product')),
            ],
            options={
                'verbose_name': 'Sponsored Search',
                'verbose_name_plural': 'Sponsored Searches',
                'ordering': ['-created'],
            },
            bases=(kapo.models.TransactionMixin, models.Model),
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('count', models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1)], verbose_name='quantity')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='registration date')),
                ('state', models.IntegerField(choices=[(1, 'Awaiting'), (2, 'Completed'), (3, 'Failed'), (4, 'Canceled')], default=1, verbose_name='state')),
                ('delivery_weekday', models.IntegerField(choices=[(1, 'Saturday'), (2, 'Sunday'), (3, 'Monday'), (4, 'Tuesday'), (5, 'Wednesday'), (6, 'Thursday'), (7, 'Friday')], default=1, verbose_name='delivery_weekday')),
                ('delivery_hours', models.IntegerField(choices=[(1, 'Nine Twelve'), (2, 'Twelve Fifteen'), (3, 'Fifteen Eighteen')], default=1, verbose_name='delivery_hours')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to=settings.AUTH_USER_MODEL)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='kapo.Product')),
            ],
            options={
                'verbose_name': 'Order',
                'verbose_name_plural': 'Orders',
                'ordering': ['-created'],
            },
            bases=(kapo.models.TransactionMixin, models.Model),
        ),
        migrations.CreateModel(
            name='Liquidate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.IntegerField(verbose_name='amount')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='registration date')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='liquidate', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Liquidate',
                'verbose_name_plural': 'Liquidates',
                'ordering': ['-created'],
            },
            bases=(kapo.models.TransactionMixin, models.Model),
        ),
        migrations.CreateModel(
            name='Campaign',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('valid', models.BooleanField(default=False, verbose_name='valid')),
                ('state', models.IntegerField(choices=[(1, 'Awaiting'), (2, 'Completed')], default=1, verbose_name='state')),
                ('days', models.IntegerField(validators=[django.core.validators.MinValueValidator(3), django.core.validators.MaxValueValidator(7)], verbose_name='days')),
                ('discount', models.IntegerField(default=10, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(99)], verbose_name='discount')),
                ('remaining_days', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)], verbose_name='remaining_days')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='registration date')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='campaigns', to='kapo.Product')),
            ],
            options={
                'verbose_name': 'Campaign',
                'verbose_name_plural': 'Campaigns',
                'ordering': ['-created'],
            },
            bases=(kapo.models.TransactionMixin, models.Model),
        ),
        migrations.CreateModel(
            name='Banner',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('valid', models.BooleanField(default=False, verbose_name='valid')),
                ('state', models.IntegerField(choices=[(1, 'Awaiting'), (2, 'Completed')], default=1, verbose_name='state')),
                ('place', models.IntegerField(choices=[(1, 'First'), (2, 'Second'), (3, 'Third')], default=1, verbose_name='place')),
                ('slogan', models.TextField(max_length=100, verbose_name='slogan')),
                ('days', models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(7)], verbose_name='days')),
                ('remaining_days', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)], verbose_name='remaining_days')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='registration date')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='banners', to='kapo.Product')),
            ],
            options={
                'verbose_name': 'Banners',
                'verbose_name_plural': 'Banners',
                'ordering': ['-created'],
            },
            bases=(kapo.models.TransactionMixin, models.Model),
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('type', models.IntegerField(choices=[(1, 'Sponsor'), (2, 'Banner'), (3, 'Campaign'), (4, 'Order'), (5, 'Increase Balance'), (6, 'Liquidate')], verbose_name='type')),
                ('object_id', models.PositiveIntegerField(blank=True, null=True)),
                ('amount', models.IntegerField(verbose_name='amount')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='created')),
                ('content_type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='contenttypes.ContentType')),
                ('receiver', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='credit', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='debt', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Transaction',
                'verbose_name_plural': 'Transactions',
                'ordering': ['-created'],
                'unique_together': {('content_type', 'object_id')},
            },
        ),
        migrations.CreateModel(
            name='Rate',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('rating', models.IntegerField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5')])),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ratings', to='kapo.Product')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'product')},
            },
        ),
    ]
