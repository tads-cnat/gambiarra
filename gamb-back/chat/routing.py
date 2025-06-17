from django.urls import re_path, path
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator

from .consumer import ChatConsumer


websocket_urlpatterns = [
    re_path(r"ws/chat/(?P<chat_id>\d+)/$", ChatConsumer.as_asgi()),
]

