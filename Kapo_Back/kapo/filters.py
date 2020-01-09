import django_filters
from .models import Product


class ProductFilter(django_filters.FilterSet):
    price_range = django_filters.RangeFilter(field_name='price')
    quantity_range = django_filters.RangeFilter(field_name='quantity')
    created_range = django_filters.DateRangeFilter(field_name='created')

    class Meta:
        model = Product
        fields = ['main_category', 'production_year', 'second_hand']
