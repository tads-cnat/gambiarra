import django_filters
from .models import Chamado, Mensagem

class ChamadoFilter(django_filters.FilterSet):
    status = django_filters.NumberFilter(lookup_expr='exact')
    titulo = django_filters.CharFilter(lookup_expr='icontains')
    descricao = django_filters.CharFilter(lookup_expr='icontains')
    code = django_filters.CharFilter(lookup_expr='icontains')
    professor_id = django_filters.NumberFilter(field_name='professor__id', lookup_expr='exact')
    bolsistas_id = django_filters.NumberFilter(field_name='bolsistas__id', lookup_expr='exact')
    cliente_id = django_filters.NumberFilter(field_name='cliente__id', lookup_expr='exact')

    class Meta:
        model = Chamado 
        fields = ['status', 'titulo', 'descricao', 'code', 'professor_id', 'bolsistas_id', 'cliente_id']
        
class MensagemFilter(django_filters.FilterSet):
    chamado_id = django_filters.NumberFilter(field_name='chamado_id', lookup_expr='exact')

    class Meta:
        model = Mensagem 
        fields = ['chamado_id']