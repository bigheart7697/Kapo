# Generated by Django 3.0.1 on 2019-12-23 15:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('kapo', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='product',
            options={'ordering': ['created'], 'verbose_name': 'Product', 'verbose_name_plural': 'Products'},
        ),
        migrations.RenameField(
            model_name='product',
            old_name='created_date',
            new_name='created',
        ),
    ]