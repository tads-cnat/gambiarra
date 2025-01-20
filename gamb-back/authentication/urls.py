from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from .views import *

auth_urls = [
    path('login/', LogarView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),    
    path('register/', RegisterUserView.as_view(), name='register'), #register
]