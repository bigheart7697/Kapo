from rest_framework import serializers
from kapo.models import *
from accounts.serializers import UserSerializer
from django.db.models import Avg


class TransactionObjectRelatedField(serializers.RelatedField):
    """
    A custom field to use for the `transaction_object` generic relationship.
    """

    def to_representation(self, value):
        """
        Serialize bookmark instances using a bookmark serializer,
        and note instances using a note serializer.
        """
        if isinstance(value, SponsoredSearch):
            serializer = SponsoredSearchSerializer(value)
        elif isinstance(value, Banner):
            serializer = BannerSerializer(value)
        elif isinstance(value, Campaign):
            serializer = CampaignSerializer(value)
        elif isinstance(value, Order):
            serializer = OrderSerializer(value)
        elif isinstance(value, Liquidate):
            serializer = LiquidateSerializer(value)
        elif value is None:
            serializer = UserSerializer(value)
        else:
            raise Exception('Unexpected type of transaction object')

        return serializer.data


class LiquidateSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)

    class Meta:
        model = Liquidate
        fields = ['amount', 'owner']


class ProductSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    first_category = serializers.CharField(source='get_cat1_display', read_only=True)
    second_category = serializers.CharField(source='get_cat2_display', read_only=True)
    third_category = serializers.CharField(source='get_cat3_display', read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'first_category', 'second_category', 'third_category', 'cat1', 'cat2', 'cat3',
                  'description', 'image', 'price', 'second_hand', 'average_rating',
                  'quantity', 'owner', 'production_year', 'available']


class TransactionSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    transaction_object = TransactionObjectRelatedField(read_only=True)

    class Meta:
        model = Transaction
        fields = ['id', 'created', 'sender', 'transaction_object', 'type', 'amount']


class OrderSerializer(serializers.ModelSerializer):
    customer = UserSerializer(read_only=True, many=False)
    product = ProductSerializer(read_only=True, many=False)
    state = serializers.CharField(source='get_state_display', read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'state', 'customer', 'product', 'count', 'created', 'delivery_weekday', 'delivery_hours']


class SponsoredSearchSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True, many=False)
    remaining_count = serializers.IntegerField(read_only=True)
    state = serializers.CharField(source='get_state_display', read_only=True)
    valid = serializers.BooleanField(read_only=True)
    transaction = serializers.IntegerField(source='get_transaction.id', read_only=True)

    class Meta:
        model = SponsoredSearch
        fields = ['id', 'product', 'count', 'remaining_count', 'search_phrases', 'state',
                  'transaction', 'created', 'valid']


class CampaignSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True, many=False)
    remaining_days = serializers.IntegerField(read_only=True)
    state = serializers.CharField(source='get_state_display', read_only=True)
    valid = serializers.BooleanField(read_only=True)
    transaction = serializers.IntegerField(source='get_transaction.id', read_only=True)

    class Meta:
        model = Campaign
        fields = ['id', 'product', 'days', 'remaining_days', 'valid', 'state', 'created',
                  'transaction', 'discount']


class BannerSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True, many=False)
    remaining_days = serializers.IntegerField(read_only=True)
    state = serializers.CharField(source='get_state_display', read_only=True)
    valid = serializers.BooleanField(read_only=True)
    transaction = serializers.IntegerField(source='get_transaction.id', read_only=True)

    class Meta:
        model = Banner
        fields = ['id', 'product', 'days', 'remaining_days', 'valid', 'state', 'created', 'place',
                  'transaction', 'slogan']


class RateSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True, many=False)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Rate
        fields = ['product', 'user', 'rating']
