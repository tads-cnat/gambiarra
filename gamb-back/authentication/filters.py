import django_filters
from .models import Usuario


class UsuarioFilter(django_filters.FilterSet):
    grupo_id = django_filters.NumberFilter(field_name="grupo_id", lookup_expr="exact")

    class Meta:
        model = Usuario
        fields = ["grupo_id"]
