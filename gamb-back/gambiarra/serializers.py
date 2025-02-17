from rest_framework import serializers

from authentication.models import Usuario
from gambiarra.models import Acessorio, Chamado, Item, STATUS_CHOICES

from .models import Acessorio, Chamado, Item


class UpdateBolsistaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chamado
        fields = ["bolsistas"]

class CreateAcessorioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Acessorio
        fields = ["nome"]


class CreateItemSerializer(serializers.ModelSerializer):
    acessorios = CreateAcessorioSerializer(many=True)

    class Meta:
        model = Item
        fields = ["modelo", "acessorios"]


class CreateChamadoSerializer(serializers.ModelSerializer):
    item = CreateItemSerializer()

    class Meta:
        model = Chamado
        fields = ["titulo", "descricao", "item"]

    def create(self, validated_data):
        item_data = validated_data.pop("item")
        acessorios_data = item_data.pop("acessorios")
        cliente = self.context["request"].user
        item = Item.objects.create(**item_data)

        for acessorio_data in acessorios_data:
            Acessorio.objects.create(item=item, **acessorio_data)

        chamado = Chamado.objects.create(item=item, cliente=cliente, **validated_data)

        return chamado


class ListarChamadoSerializer(serializers.ModelSerializer):
    bolsistas = serializers.SerializerMethodField()
    professor = serializers.SerializerMethodField()
    cliente = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    avaliacao = serializers.SerializerMethodField()

    class Meta:
        model = Chamado
        fields = [
            "id",
            "titulo",
            "professor",
            "bolsistas",
            "cliente",
            "status",
            "code",
            "avaliacao",
        ]

    def get_cliente(self, obj):
        return {
            "username": obj.cliente.username,
            "id": obj.cliente.id,
        }

    def get_bolsistas(self, obj):
        return list(obj.bolsistas.values("id", "username"))

    def get_professor(self, obj):
        if obj.professor:
            return {
                "id": obj.professor.id,
                "username": obj.professor.username,
            }
        return None

    def get_avaliacao(self, obj):
        avaliacao = getattr(obj, "avaliacao", None)
        if avaliacao:
            return {"nota": avaliacao.nota, "texto": avaliacao.texto}
        return None
    
    def get_status(self, obj):
        ide = next((str(key) for key, value in STATUS_CHOICES if value == obj.get_status_display()), None)
        
        return {
            "id": ide,
            "nome": obj.get_status_display()
        }


class AceitarChamadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chamado
        fields = [
            "id",
        ]

class AlterarStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chamado
        fields = [
            "id",
            "status",
        ]

class DetalharChamadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chamado
        fields = "__all__"