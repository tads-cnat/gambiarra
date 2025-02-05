from rest_framework import serializers

from authentication.models import Usuario
from gambiarra.models import Acessorio, Chamado, Item

from .models import Acessorio, Chamado, Item


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
    cliente = serializers.CharField(source="cliente.username", read_only=True)
    status = serializers.CharField(source="get_status_display", read_only=True)
    avaliacao = serializers.SerializerMethodField()

    class Meta:
        model = Chamado
        fields = [
            "id",
            "status",
            "code",
            "titulo",
            "professor",
            "bolsistas",
            "cliente",
            "avaliacao",
        ]

    def get_bolsistas(self, obj):
        return list(obj.bolsistas.values_list("username", flat=True))

    def get_professor(self, obj):
        if obj.professor:
            return obj.professor.username
        return None

    def get_avaliacao(self, obj):
        avaliacao = getattr(obj, "avaliacao", None)
        if avaliacao:
            return {"nota": avaliacao.nota, "texto": avaliacao.texto}
        return None


class AceitarChamadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chamado
        fields = [
            "id",
            "status",
            "code",
            "titulo",
        ]

class AlterarStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chamado
        fields = [
            "id",
            "status",
            "code",
            "titulo",
        ]

class DetalharChamadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chamado
        fields = "__all__"