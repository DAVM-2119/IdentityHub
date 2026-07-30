from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [

    path('admin/', admin.site.urls),

    path('api/', include('users.urls')),


    # JWT Login
    path(
        'api/login/',
        TokenObtainPairView.as_view(),
        name='token_obtain_pair'
    ),


    # Get new access token
    path(
        'api/token/refresh/',
        TokenRefreshView.as_view(),
        name='token_refresh'
    ),

]