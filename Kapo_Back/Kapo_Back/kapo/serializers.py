from rest_framework import serializers
from Kapo_Back.kapo.models import *


class ProductSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.user.username')

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'image', 'main_category', 'price', 'second_hand', 'quantity', 'owner',
                  'production_year']


class UserSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(many=True, queryset=Product.objects.all())

    class Meta:
        model = Profile
        fields = ['user', 'image', 'phone_number', 'city', 'address', 'products']


class OrderSerializer(serializers.ModelSerializer):
    customer = serializers.ReadOnlyField(source='customer.user.username')
    product = serializers.ReadOnlyField(source='product.id')

    class Meta:
        model = Order
        fields = ['customer', 'product', 'count', 'created']
