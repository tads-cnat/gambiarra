from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
router.register(r'usuario', UsuarioViewSet, basename="Usuario")

auth_urls = [
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", RegisterUserView.as_view(), name="register"),  # register
    path("profile/", ProfileUserView.as_view(), name="profile"),
] + router.urls
