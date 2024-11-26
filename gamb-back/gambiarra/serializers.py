from gambiarra.models import Chamado, Acessorio, Item
from rest_framework import serializers

class ChamadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chamado
        fields = ['titulo', 'descricao', 'professor', 'item', 'cliente']

class AcessorioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Acessorio
        fields = ['nome', 'item']

class ItemSerializer(serializers.ModelSerializer):
    acessorios = serializers.PrimaryKeyRelatedField(
         many=True,
         queryset=Acessorio.objects.all()  
     )
    class Meta:
        model = Item
        fields = ['modelo', 'diagnostico']



     
  