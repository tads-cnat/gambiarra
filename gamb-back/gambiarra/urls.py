from django.urls import path
from . import views


app_name = 'gambiarra'
gambiarra_urls = [
    path('chamado/', views.CreateChamadoView.as_view(), name='create-chamado')
]