# Generated by Django 3.0.3 on 2020-02-16 17:15

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import kapo.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('kapo', '0002_auto_20200216_1133'),
    ]

    operations = [
        migrations.CreateModel(
            name='BalanceIncrease',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('state', models.IntegerField(choices=[(1, 'Awaiting'), (2, 'Completed')], default=1, verbose_name='state')),
                ('amount', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)], verbose_name='amount')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='registration date')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='balance_increase', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Balance Increase',
                'verbose_name_plural': 'Balance Increases',
                'ordering': ['-created'],
            },
            bases=(kapo.models.TransactionMixin, models.Model),
        ),
    ]
