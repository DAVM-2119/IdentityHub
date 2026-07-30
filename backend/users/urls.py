from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    health_check,
    register_user,
    login_user,
    google_login,
    profile,
    login_history,
    security_alerts,
    mark_alert_read,
    sessions,
    logout_session,
    logout_other_sessions,
    logout_all_sessions,
    current_session,
    update_session_activity,
)


urlpatterns = [

    # ------------------------------
    # Basic Authentication
    # ------------------------------

    path(
        "health/",
        health_check
    ),

    path(
        "register/",
        register_user
    ),

    path(
        "login/",
        login_user
    ),

    path(
        "google/",
        google_login
    ),


    # ------------------------------
    # JWT Token Refresh
    # ------------------------------

    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),


    # ------------------------------
    # User Profile
    # ------------------------------

    path(
        "profile/",
        profile
    ),


    # ------------------------------
    # Login History
    # ------------------------------

    path(
        "login-history/",
        login_history
    ),


    # ------------------------------
    # Security Alerts
    # ------------------------------

    path(
        "security-alerts/",
        security_alerts
    ),

    path(
        "security-alerts/<int:id>/read/",
        mark_alert_read
    ),


    # ------------------------------
    # Active Session Management
    # ------------------------------

    path(
        "sessions/",
        sessions
    ),


    path(
        "current-session/",
        current_session
    ),


    path(
        "logout-session/<int:session_id>/",
        logout_session
    ),


    path(
        "logout-other-sessions/",
        logout_other_sessions
    ),


    path(
        "logout-all-sessions/",
        logout_all_sessions
    ),


    path(
        "update-session-activity/<int:session_id>/",
        update_session_activity
    ),

]