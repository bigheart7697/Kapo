from rest_framework import serializers
from kapo.models import *
from accounts.serializers import UserSerializer


class ProductSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    main_category = serializers.CharField(source='get_main_category_display')

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'image', 'main_category', 'price', 'second_hand', 'quantity', 'owner',
                  'production_year']


class OrderSerializer(serializers.ModelSerializer):
    customer = serializers.ReadOnlyField(source='customer.email')
    product = serializers.ReadOnlyField(source='product.id')

    class Meta:
        model = Order
        fields = ['customer', 'product', 'count', 'created']
