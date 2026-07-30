from datetime import timedelta

from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

from django.conf import settings
from django.utils import timezone
from django.contrib.auth import authenticate

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

from .models import (
    User,
    LoginHistory,
    SecurityAlert,
    UserSession,
)

from .serializers import (
    UserSerializer,
    ProfileSerializer,
    LoginHistorySerializer,
    SecurityAlertSerializer,
    UserSessionSerializer,
)


# ----------------------------------
# Helper Function
# Save Login + Detect Suspicious Login
# ----------------------------------

def record_login(
    user,
    request,
    login_method,
    refresh_token
):

    ip_address = request.META.get(
        "REMOTE_ADDR",
        "0.0.0.0"
    )

    browser = request.META.get(
        "HTTP_USER_AGENT",
        "Unknown Browser"
    )


    previous_login = (
        LoginHistory.objects
        .filter(user=user)
        .order_by("-login_time")
        .first()
    )


    if previous_login:

        if previous_login.ip_address != ip_address:

            SecurityAlert.objects.create(
                user=user,
                alert_type="NEW_IP",
                message=(
                    f"New IP detected.\n"
                    f"Previous IP: {previous_login.ip_address}\n"
                    f"Current IP: {ip_address}"
                )
            )


        if previous_login.browser != browser:

            SecurityAlert.objects.create(
                user=user,
                alert_type="NEW_BROWSER",
                message=(
                    "A login from a different "
                    "browser has been detected."
                )
            )


    LoginHistory.objects.create(
        user=user,
        login_method=login_method,
        ip_address=ip_address,
        browser=browser,
    )


    UserSession.objects.create(
        user=user,
        refresh_token=str(refresh_token),
        ip_address=ip_address,
        browser=browser,
    )



# ----------------------------------
# Health Check API
# ----------------------------------

@api_view(["GET"])
def health_check(request):

    return Response(
        {
            "message":
                "Backend is working!"
        }
    )



# ----------------------------------
# Registration API
# ----------------------------------

@api_view(["POST"])
def register_user(request):

    serializer = UserSerializer(
        data=request.data
    )


    if serializer.is_valid():

        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )


    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )



# ----------------------------------
# Username & Password Login
# ----------------------------------

@api_view(["POST"])
def login_user(request):

    username = request.data.get(
        "username"
    )

    password = request.data.get(
        "password"
    )


    try:

        user = User.objects.get(
            username=username
        )


    except User.DoesNotExist:

        return Response(
            {
                "detail":
                    "Invalid username or password."
            },
            status=status.HTTP_401_UNAUTHORIZED
        )


    # ------------------------------
    # Unlock expired account
    # ------------------------------

    if (
        user.locked_until and
        timezone.now() >= user.locked_until
    ):

        user.failed_login_attempts = 0

        user.locked_until = None

        user.save()



    # ------------------------------
    # Account still locked
    # ------------------------------

    if (
        user.locked_until and
        timezone.now() < user.locked_until
    ):

        remaining = int(
            (
                user.locked_until -
                timezone.now()
            ).total_seconds() // 60
        ) + 1


        return Response(
            {
                "detail":
                    f"Account is locked. "
                    f"Try again in "
                    f"{remaining} minute(s)."
            },
            status=status.HTTP_403_FORBIDDEN
        )



    authenticated_user = authenticate(
        request=request,
        username=username,
        password=password
    )



    # ------------------------------
    # Invalid Password
    # ------------------------------

    if authenticated_user is None:

        user.failed_login_attempts += 1


        if user.failed_login_attempts >= 5:

            user.locked_until = (
                timezone.now()
                +
                timedelta(minutes=15)
            )


            user.save()


            return Response(
                {
                    "detail":
                        "Account is locked. "
                        "Try again in "
                        "15 minute(s)."
                },
                status=status.HTTP_403_FORBIDDEN
            )


        user.save()


        return Response(
            {
                "detail":
                    "Invalid username or password."
            },
            status=status.HTTP_401_UNAUTHORIZED
        )



    # ------------------------------
    # Successful Login
    # ------------------------------

    user.failed_login_attempts = 0

    user.locked_until = None

    user.save()


    refresh = RefreshToken.for_user(user)


    record_login(
        user=user,
        request=request,
        login_method="PASSWORD",
        refresh_token=refresh,
    )


    return Response(
        {
            "refresh":
                str(refresh),

            "access":
                str(refresh.access_token),
        }
    )



# ----------------------------------
# Google Login API
# ----------------------------------

@api_view(["POST"])
def google_login(request):

    token = request.data.get(
        "access_token"
    )


    if not token:

        return Response(
            {
                "detail":
                    "Google token required."
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    try:

        google_user = id_token.verify_oauth2_token(
            token,
            google_requests.Request(),
            settings.SOCIALACCOUNT_PROVIDERS[
                "google"
            ]["APP"]["client_id"],
        )


    except ValueError:

        return Response(
            {
                "detail":
                    "Invalid Google token."
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    email = google_user.get(
        "email"
    )


    if not email:

        return Response(
            {
                "detail":
                    "Google account has no email."
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    username = email.split("@")[0]


    user, created = User.objects.get_or_create(
        email=email,
        defaults={
            "username":
                username,
        },
    )


    refresh = RefreshToken.for_user(user)


    record_login(
        user=user,
        request=request,
        login_method="GOOGLE",
        refresh_token=refresh,
    )


    return Response(
        {
            "refresh":
                str(refresh),

            "access":
                str(refresh.access_token),
        }
    )
# ----------------------------------
# Protected Profile API
# ----------------------------------

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):

    serializer = ProfileSerializer(
        request.user
    )

    return Response(
        serializer.data
    )



# ----------------------------------
# Login History API
# ----------------------------------

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def login_history(request):

    history = (
        LoginHistory.objects
        .filter(
            user=request.user
        )
        .order_by(
            "-login_time"
        )
    )


    serializer = LoginHistorySerializer(
        history,
        many=True
    )


    return Response(
        serializer.data
    )



# ----------------------------------
# Security Alerts API
# ----------------------------------

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def security_alerts(request):

    alerts = (
        SecurityAlert.objects
        .filter(
            user=request.user
        )
        .order_by(
            "-created_at"
        )
    )


    serializer = SecurityAlertSerializer(
        alerts,
        many=True
    )


    return Response(
        serializer.data
    )



# ----------------------------------
# Mark Security Alert As Read
# ----------------------------------

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def mark_alert_read(request, id):

    try:

        alert = SecurityAlert.objects.get(
            id=id,
            user=request.user
        )


    except SecurityAlert.DoesNotExist:

        return Response(
            {
                "detail":
                    "Alert not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )


    alert.is_read = True

    alert.save()


    return Response(
        {
            "message":
                "Alert marked as read."
        }
    )



# ----------------------------------
# Active Sessions API
# ----------------------------------

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def sessions(request):

    sessions = (
        UserSession.objects
        .filter(
            user=request.user,
            is_active=True
        )
        .order_by(
            "-created_at"
        )
    )


    serializer = UserSessionSerializer(
        sessions,
        many=True
    )


    return Response(
        serializer.data
    )



# ----------------------------------
# Logout Single Session
# ----------------------------------

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def logout_session(request, session_id):

    try:

        session = UserSession.objects.get(
            id=session_id,
            user=request.user,
            is_active=True
        )


    except UserSession.DoesNotExist:

        return Response(
            {
                "detail":
                    "Session not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )


    session.is_active = False

    session.save()


    return Response(
        {
            "message":
                "Session logged out successfully."
        },
        status=status.HTTP_200_OK
    )



# ----------------------------------
# Logout Other Sessions
# ----------------------------------

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_other_sessions(request):

    current_session_id = request.data.get(
        "session_id"
    )


    if not current_session_id:

        return Response(
            {
                "detail":
                    "Current session id required."
            },
            status=status.HTTP_400_BAD_REQUEST
        )



    sessions = (
        UserSession.objects
        .filter(
            user=request.user,
            is_active=True
        )
        .exclude(
            id=current_session_id
        )
    )


    sessions.update(
        is_active=False
    )


    return Response(
        {
            "message":
                "All other sessions logged out successfully."
        },
        status=status.HTTP_200_OK
    )



# ----------------------------------
# Logout All Sessions
# ----------------------------------

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_all_sessions(request):

    UserSession.objects.filter(
        user=request.user,
        is_active=True
    ).update(
        is_active=False
    )


    return Response(
        {
            "message":
                "All sessions logged out successfully."
        },
        status=status.HTTP_200_OK
    )



# ----------------------------------
# Current User Session
# ----------------------------------

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def current_session(request):

    try:

        session = (
            UserSession.objects
            .filter(
                user=request.user,
                is_active=True
            )
            .latest(
                "created_at"
            )
        )


    except UserSession.DoesNotExist:

        return Response(
            {
                "detail":
                    "No active session found."
            },
            status=status.HTTP_404_NOT_FOUND
        )



    serializer = UserSessionSerializer(
        session
    )


    return Response(
        serializer.data
    )



# ----------------------------------
# Update Session Activity
# ----------------------------------

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_session_activity(request, session_id):

    try:

        session = UserSession.objects.get(
            id=session_id,
            user=request.user,
            is_active=True
        )


    except UserSession.DoesNotExist:

        return Response(
            {
                "detail":
                    "Session not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )



    session.last_activity = timezone.now()

    session.save()


    return Response(
        {
            "message":
                "Session activity updated."
        },
        status=status.HTTP_200_OK
    )