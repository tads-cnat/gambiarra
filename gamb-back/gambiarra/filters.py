import django_filters
from .models import Chamado

class ChamadoFilter(django_filters.FilterSet):
    status = django_filters.CharFilter(lookup_expr='icontains')
    titulo = django_filters.CharFilter(lookup_expr='icontains')
    descricao = django_filters.CharFilter(lookup_expr='icontains')
    code = django_filters.CharFilter(lookup_expr='icontains')
    professor_username = django_filters.CharFilter(field_name='professor__username', lookup_expr='icontains')
    bolsistas_username = django_filters.CharFilter(field_name='bolsistas__username', lookup_expr='icontains')
    cliente_username = django_filters.CharFilter(field_name='cliente__username', lookup_expr='icontains')

    class Meta:
        model = Chamado 
        fields = ['status', 'titulo', 'descricao', 'code', 'professor_username', 'bolsistas_username', 'cliente_username']
