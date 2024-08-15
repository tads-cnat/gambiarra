from django.urls import path
from . import views

app_name = 'gambiarra'
urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login, name='login'),
    path('dashboard', views.DashboardView.as_view() , name='dashboard'),
]