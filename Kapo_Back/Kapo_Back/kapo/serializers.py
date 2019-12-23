from rest_framework import serializers
from Kapo_Back.kapo.models import *


class ProductSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.user.username')

    class Meta:
        model = Product
        fields = ['name', 'description', 'image',  'main_category', 'price', 'second_hand', 'quantity', 'owner']


class UserSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(many=True, queryset=Product.objects.all())

    class Meta:
        model = Profile
        fields = ['user', 'image', 'phone_number', 'city', 'address', 'products']
