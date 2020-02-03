from django.contrib import admin
from .models import *


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    model = Product


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    model = Order


@admin.register(SponsoredSearch)
class OrderAdmin(admin.ModelAdmin):
    model = SponsoredSearch
