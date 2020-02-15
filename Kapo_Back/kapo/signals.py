from django.db.models.signals import post_save
from django.dispatch import receiver
from kapo.models import *


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
