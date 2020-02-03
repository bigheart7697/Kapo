from rest_framework import serializers
from kapo.models import *
from accounts.serializers import UserSerializer


class ProductSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    first_category = serializers.CharField(source='get_cat1_display', read_only=True)
    second_category = serializers.CharField(source='get_cat2_display', read_only=True)
    third_category = serializers.CharField(source='get_cat3_display', read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'first_category', 'second_category', 'third_category', 'cat1', 'cat2', 'cat3',
                  'description', 'image', 'price', 'second_hand',
                  'quantity', 'owner', 'production_year', 'available']


class OrderSerializer(serializers.ModelSerializer):
    customer = UserSerializer(read_only=True, many=False)
    product = ProductSerializer(read_only=True, many=False)
    state = serializers.CharField(source='get_state_display', read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'state', 'customer', 'product', 'count', 'created']


class SponsoredSearchSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True, many=False)
    remaining_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = SponsoredSearch
        fields = ['id', 'product', 'count', 'remaining_count', 'search_phrases']


