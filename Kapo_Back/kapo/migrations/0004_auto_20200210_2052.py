# Generated by Django 3.0.1 on 2020-02-10 17:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kapo', '0003_auto_20200209_2231'),
    ]

    operations = [
        migrations.AlterField(
            model_name='banner',
            name='valid',
            field=models.BooleanField(default=False, verbose_name='valid'),
        ),
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='products/', verbose_name='image'),
        ),
        migrations.AlterField(
            model_name='sponsoredsearch',
            name='valid',
            field=models.BooleanField(default=False, verbose_name='valid'),
        ),
    ]