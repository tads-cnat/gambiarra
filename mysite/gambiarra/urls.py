from django.urls import path
from . import views


app_name = 'gambiarra'
urlpatterns = [
    path('', views.DashboardView.as_view(), name='dashboard'),
    path('abrir-chamado', views.ChamadoForms.as_view(), name='abrir-chamado'),
    path('detalhes/<int:pk>', views.ChamadoDetailView.as_view(), name='detalhes'),
    path('encerrar/<int:pk>', views.EncerrarView.as_view(), name='encerrar'), #url encerrar view
    path('chamado/adicionar-bolsistas/<int:pk>/', views.AdicionarBolsistas.as_view(), name='adicionar-bolsistas'),
    path('bolsistas/', views.ListarBolsistas.as_view(), name='listar-bolsistas'),
    path('bolsistas/criar/', views.CriarBolsista.as_view(), name='criar-bolsista'),
    path('bolsistas/<int:pk>/editar/', views.EditarBolsista.as_view(), name='editar-bolsista'),
    path('bolsistas/<int:pk>/deletar/', views.DeletarBolsista.as_view(), name='excluir-bolsista'),
    path('avaliar/<int:pk>/', views.AvaliarForms.as_view(), name='avaliar'),
    path('alterar-status/<int:pk>/', views.alterar_status, name='alterar_status'),
    path('aceitar/<int:pk>/', views.aceitar, name='aceitar'),

]