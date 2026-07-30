from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers

from .models import (
    LoginHistory,
    SecurityAlert,
    UserSession,
)


User = get_user_model()


# ----------------------------------
# User Registration Serializer
# ----------------------------------

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        validators=[validate_password]
    )


    class Meta:

        model = User

        fields = [
            "id",
            "username",
            "email",
            "password",
        ]


    def create(self, validated_data):

        return User.objects.create_user(
            **validated_data
        )



# ----------------------------------
# Profile Serializer
# ----------------------------------

class ProfileSerializer(serializers.ModelSerializer):


    class Meta:

        model = User

        fields = [
            "id",
            "username",
            "email",
            "date_joined",
        ]



# ----------------------------------
# Login History Serializer
# ----------------------------------

class LoginHistorySerializer(serializers.ModelSerializer):


    class Meta:

        model = LoginHistory

        fields = [
            "id",
            "login_time",
            "login_method",
            "ip_address",
            "browser",
        ]



# ----------------------------------
# Security Alert Serializer
# ----------------------------------

class SecurityAlertSerializer(serializers.ModelSerializer):


    class Meta:

        model = SecurityAlert

        fields = [
            "id",
            "alert_type",
            "message",
            "is_read",
            "created_at",
        ]



# ----------------------------------
# User Session Serializer
# ----------------------------------

class UserSessionSerializer(serializers.ModelSerializer):

    is_current = serializers.SerializerMethodField()


    class Meta:

        model = UserSession

        fields = [
            "id",
            "ip_address",
            "browser",
            "created_at",
            "last_activity",
            "is_active",
            "is_current",
        ]



    def get_is_current(self, obj):

        current_session = self.context.get(
            "current_session"
        )


        if current_session:

            return obj.id == current_session.id


        return False