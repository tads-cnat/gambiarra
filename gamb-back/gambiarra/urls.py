from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'chamado', views.ChamadoViewSet, basename="Chamado")

app_name = "gambiarra"
gambiarra_urls = [

] + router.urls
