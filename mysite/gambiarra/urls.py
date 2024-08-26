from django.urls import path
from . import views

app_name = 'gambiarra'
urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('abrir-chamado', views.ChamadoForms.as_view(), name='abrir-chamado'),
    path('detalhes/<int:pk>', views.ChamadoDetailView.as_view(), name='detalhes'),
    
    path('encerrar/<int:pk>', views.EncerrarView.as_view(), name='encerrar'), #url encerrar view


]