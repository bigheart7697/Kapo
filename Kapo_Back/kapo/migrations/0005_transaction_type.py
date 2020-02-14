# Generated by Django 3.0.1 on 2020-02-14 09:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kapo', '0004_auto_20200214_1254'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='type',
            field=models.IntegerField(choices=[(1, 'Sponsor'), (2, 'Banner'), (3, 'Campaign')], default=1, verbose_name='type'),
            preserve_default=False,
        ),
    ]
