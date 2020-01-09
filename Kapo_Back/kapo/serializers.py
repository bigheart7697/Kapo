from rest_framework import serializers
from kapo.models import *
from accounts.serializers import UserSerializer


class ProductSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    category = serializers.CharField(source='get_main_category_display', read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'description', 'image', 'main_category', 'price', 'second_hand', 'quantity',
                  'owner', 'production_year']


class OrderSerializer(serializers.ModelSerializer):
    customer = UserSerializer(read_only=True, many=False)
    product = ProductSerializer(read_only=True, many=False)
    state = serializers.CharField(source='get_state_display', read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'state', 'customer', 'product', 'count', 'created']
