from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from django.utils.translation import ugettext as _


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    model = Product


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    model = Order


@admin.register(Profile)
class ProductAdmin(admin.ModelAdmin):
    model = Profile


class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name = _('profile')
    verbose_name_plural = _('profiles')


class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline,)


admin.site.unregister(User)
admin.site.register(User, UserAdmin)
