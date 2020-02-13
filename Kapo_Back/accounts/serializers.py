from rest_framework import serializers
from rest_framework_jwt.settings import api_settings

from accounts.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'email', 'country', 'city', 'address', 'phone_number', 'photo',
                  'is_corporate', 'first_name', 'last_name', 'corporate_name',
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

    def validate(self, data):
        """
        Check for the user type data to be valid
        """
        is_corporate = data['is_corporate']
        if is_corporate:
            if 'first_name' in data or 'last_name' in data:
                raise serializers.ValidationError("corporate users cannot have first name and last name.")
            if data['corporate_name'] == "" or data['corporate_number'] is None:
                raise serializers.ValidationError("corporate users must have corporate name and corporate number.")
        else:
            if 'corporate_name' in data or 'corporate_number' in data:
                raise serializers.ValidationError("individual users cannot have corporate name and corporate number.")
            if data['first_name'] == "" or data['last_name'] == "":
                raise serializers.ValidationError("individual users must have first name and last name.")
        return data
