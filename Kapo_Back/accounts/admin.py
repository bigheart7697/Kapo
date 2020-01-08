from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import ugettext_lazy as _

from .models import *


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Contact Info'), {'fields': ('country', 'city', 'address', 'phone_number', 'photo')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
        (_('Profile Status'), {'fields': ('is_corporate', 'first_name', 'last_name',
                                          'corporate_name', 'corporate_number')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'country', 'city', 'is_staff')
    search_fields = ('email', 'country', 'city', 'phone_number')
    ordering = ('email',)

