from django.urls import path
from . import views

app_name = 'gambiarra'
urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login, name='login'),
    path('dashboard', views.dashboard , name='dashboard'),
    path('abrir-chamado/', views.ChamadoForms.as_view(), name='abrir_chamado'),
    path('detalhes/<int:pk>/', views.ChamadoDetailView.as_view(), name='detalhes'),
]