from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    failed_login_attempts = models.IntegerField(
        default=0
    )

    locked_until = models.DateTimeField(
        null=True,
        blank=True
    )


class LoginHistory(models.Model):

    LOGIN_METHODS = (

        ("PASSWORD", "Password"),

        ("GOOGLE", "Google"),

    )

    user = models.ForeignKey(

        User,

        on_delete=models.CASCADE,

        related_name="login_history"

    )

    login_time = models.DateTimeField(
        auto_now_add=True
    )

    login_method = models.CharField(

        max_length=20,

        choices=LOGIN_METHODS

    )

    ip_address = models.GenericIPAddressField()

    browser = models.CharField(
        max_length=255
    )

    def __str__(self):

        return f"{self.user.username} - {self.login_method}"


class SecurityAlert(models.Model):

    ALERT_TYPES = (

        ("NEW_IP", "New IP"),

        ("NEW_BROWSER", "New Browser"),

    )

    user = models.ForeignKey(

        User,

        on_delete=models.CASCADE,

        related_name="security_alerts"

    )

    alert_type = models.CharField(

        max_length=30,

        choices=ALERT_TYPES

    )

    message = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    is_read = models.BooleanField(
        default=False
    )

    def __str__(self):

        return f"{self.user.username} - {self.alert_type}"


class UserSession(models.Model):

    user = models.ForeignKey(

        User,

        on_delete=models.CASCADE,

        related_name="sessions"

    )

    refresh_token = models.TextField()

    ip_address = models.GenericIPAddressField()

    browser = models.CharField(
        max_length=255
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    last_activity = models.DateTimeField(
        auto_now=True
    )

    is_active = models.BooleanField(
        default=True
    )

    def __str__(self):

        return f"{self.user.username} - {self.browser}"