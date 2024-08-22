from django.urls import path
from . import views

app_name = 'gambiarra'
urlpatterns = [
    path('', views.DashboardView.as_view(), name='dashboard'),

]
