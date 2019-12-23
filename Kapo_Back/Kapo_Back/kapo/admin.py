from django.contrib import admin
from .models import *


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    model = Product


@admin.register(Profile)
class ProductAdmin(admin.ModelAdmin):
    model = Profile

