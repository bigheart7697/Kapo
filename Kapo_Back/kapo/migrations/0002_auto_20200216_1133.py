# Generated by Django 3.0.3 on 2020-02-16 08:03

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kapo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='campaign',
            name='place',
            field=models.IntegerField(choices=[(1, 'First'), (2, 'Second'), (3, 'Third')], default=1, verbose_name='place'),
        ),
        migrations.AlterField(
            model_name='campaign',
            name='discount',
            field=models.IntegerField(default=10, validators=[django.core.validators.MinValueValidator(10), django.core.validators.MaxValueValidator(99)], verbose_name='discount'),
        ),
    ]
