from django.urls import path
from . import views

app_name = 'gambiarra'
urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('abrir-chamado', views.ChamadoForms.as_view(), name='abrir-chamado'),

]