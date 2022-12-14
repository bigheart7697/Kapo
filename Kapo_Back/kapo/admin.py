from django.contrib import admin
from .models import *


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    model = Product


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    model = Order


@admin.register(SponsoredSearch)
class SponsoredSearchAdmin(admin.ModelAdmin):
    model = SponsoredSearch


@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    model = Banner


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    model = Campaign


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    model = Transaction


@admin.register(Liquidate)
class LiquidateAdmin(admin.ModelAdmin):
    model = Liquidate


@admin.register(BalanceIncrease)
class BalanceIncreaseAdmin(admin.ModelAdmin):
    model = BalanceIncrease


@admin.register(Rate)
class RateAdmin(admin.ModelAdmin):
    model = Rate
