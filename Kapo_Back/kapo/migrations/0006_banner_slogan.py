# Generated by Django 3.0.1 on 2020-02-11 08:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kapo', '0005_rate'),
    ]

    operations = [
        migrations.AddField(
            model_name='banner',
            name='slogan',
            field=models.TextField(default='hello', max_length=100, verbose_name='slogan'),
            preserve_default=False,
        ),
    ]
