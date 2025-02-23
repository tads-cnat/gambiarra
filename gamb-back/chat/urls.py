from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ChatMessageListView, WebSocketStatusView

app_name = "chat"
chat_urls = [
        path("list/", ChatMessageListView.as_view(), name="chat-messages"),
        path("api/ws-status/", WebSocketStatusView.as_view(), name="ws-status"),

] 
