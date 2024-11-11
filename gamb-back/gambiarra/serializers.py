from gambiarra.models import Chamado
from rest_framework import serializers

class ChamadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chamado
        fields = ['titulo', 'descricao', 'professor', 'item', 'cliente']