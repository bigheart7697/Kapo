from rest_framework import serializers
from rest_framework_jwt.settings import api_settings

from accounts.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'country', 'city', 'address', 'phone_number', 'photo',
                  'is_corporate', 'first_name', 'last_name', 'is_corporate', 'corporate_name',
                  'corporate_number')


class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    @staticmethod
    def get_token(obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = self.Meta.model(**validated_data)
        if password is not None:
            user.set_password(password)
        user.save()
        return user

    class Meta:
        model = User
        fields = ('email', 'password',
                  'country', 'city', 'address', 'phone_number', 'photo', 'token',
                  'is_corporate', 'first_name', 'last_name', 'corporate_name',
                  'corporate_number',
                  )
