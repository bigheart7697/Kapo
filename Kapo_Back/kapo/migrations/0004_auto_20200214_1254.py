# Generated by Django 3.0.1 on 2020-02-14 09:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('kapo', '0003_auto_20200214_1213'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='banner',
            options={'ordering': ['-created'], 'verbose_name': 'Banners', 'verbose_name_plural': 'Banners'},
        ),
        migrations.AlterModelOptions(
            name='order',
            options={'ordering': ['-created'], 'verbose_name': 'Order', 'verbose_name_plural': 'Orders'},
        ),
        migrations.AlterModelOptions(
            name='product',
            options={'ordering': ['-created'], 'verbose_name': 'Product', 'verbose_name_plural': 'Products'},
        ),
        migrations.AlterModelOptions(
            name='sponsoredsearch',
            options={'ordering': ['-created'], 'verbose_name': 'Sponsored Search', 'verbose_name_plural': 'Sponsored Searches'},
        ),
        migrations.AlterModelOptions(
            name='transaction',
            options={'ordering': ['-created'], 'verbose_name': 'Transaction', 'verbose_name_plural': 'Transactions'},
        ),
    ]
