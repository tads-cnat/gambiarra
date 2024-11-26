from gambiarra.models import Chamado, Acessorio
from rest_framework import serializers

class ChamadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chamado
        fields = ['titulo', 'descricao', 'professor', 'item', 'cliente']

class AcessorioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Acessorio
        filds = ['nome', 'item']




  