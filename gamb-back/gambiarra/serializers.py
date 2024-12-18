from gambiarra.models import Chamado, Acessorio, Item
from rest_framework import serializers

from rest_framework import serializers
from .models import Chamado, Item, Acessorio

class CreateAcessorioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Acessorio
        fields = ['nome']

class CreateItemSerializer(serializers.ModelSerializer):
    acessorios = CreateAcessorioSerializer(many=True)

    class Meta:
        model = Item
        fields = ['modelo', 'acessorios']

class CreateChamadoSerializer(serializers.ModelSerializer):
    item = CreateItemSerializer()

    class Meta:
        model = Chamado
        fields = ['titulo', 'descricao', 'item']

    def create(self, validated_data):
        item_data = validated_data.pop('item')
        acessorios_data = item_data.pop('acessorios')
        cliente = self.context['request'].user
        item = Item.objects.create(**item_data)

        for acessorio_data in acessorios_data:
            Acessorio.objects.create(item=item, **acessorio_data)

        chamado = Chamado.objects.create(item=item, cliente = cliente, **validated_data)

        return chamado
