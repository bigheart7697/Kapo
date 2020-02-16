import django_filters
from rest_framework import filters

from .models import Product


class ProductFilter(django_filters.FilterSet):
    price_range = django_filters.RangeFilter(field_name='price')
    quantity_range = django_filters.RangeFilter(field_name='quantity')
    created_range = django_filters.DateRangeFilter(field_name='created')
    production_year_range = django_filters.RangeFilter(field_name='production_year')

    class Meta:
        model = Product
        fields = ['cat1', 'cat2', 'cat3', 'second_hand']