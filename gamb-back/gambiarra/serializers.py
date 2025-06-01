from rest_framework import serializers

from authentication.models import Usuario

from .models import *


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
        response = { "success": True
                    , "message": "Chamado criado com sucesso!"
                    , "chamado": chamado
                    }
        return response



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
            "status",
            "cliente",
            "professor",
            "bolsistas",
            "avaliacao",
            "code",
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

class AcessorioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Acessorio
        fields = ['id', 'nome']

class ItemSerializer(serializers.ModelSerializer):
    acessorios = AcessorioSerializer(many=True, read_only=True)
    
    class Meta:
        model = Item
        fields = ['id', 'modelo', 'diagnostico', 'acessorios']

class DetalharChamadoSerializer(serializers.ModelSerializer):
    
    bolsistas = serializers.SerializerMethodField()
    professor = serializers.SerializerMethodField()
    cliente = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    avaliacao = serializers.SerializerMethodField()
    item = ItemSerializer()

    class Meta:
        model = Chamado
        fields = [
                  
            "id",
            "titulo",
            "status",
            "cliente",
            "professor",
            "bolsistas",
            "avaliacao",

            "code",
            "descricao",
            "item",
        ]
    
    def get_cliente(self, obj):
        return {
            "username": obj.cliente.username,
            "id": obj.cliente.id,
        }

    def get_bolsistas(self, obj):
        if obj.bolsistas.exists():
            return list(obj.bolsistas.values("id", "username"))
        return [] 


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
    
     # Mantenha os métodos existentes e modifique apenas o get_item:
    def get_item(self, obj):
        # Verifica se existe um item relacionado
        if not obj.item:
            return None
            
        # Usa o serializer de Item para formatar a resposta
        return ItemSerializer(obj.item).data

class MensagemSerializer(serializers.ModelSerializer):
    autor = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Mensagem
        fields = ['id', 'data_envio', 'autor', 'texto', 'chamado']
        read_only_fields = ['id', 'data_envio', 'autor', 'chamado']

class AlteracaoSerializer(serializers.ModelSerializer):
    autor = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Alteracao
        fields = ['status','data_alteracao','autor']
        
class UpdateChamadoSerializer(serializers.ModelSerializer):
    avaliacao = serializers.SerializerMethodField()


    class Meta:
        model = Chamado
        fields = [
            "titulo",
            "descricao",
            "avaliacao",
        ]

    def get_avaliacao(self, obj):
        avaliacao = getattr(obj, "avaliacao", None)
        if avaliacao:
            return {"nota": avaliacao.nota, "texto": avaliacao.texto}
        return None


class MensagemSerializer(serializers.ModelSerializer):
    autor = serializers.PrimaryKeyRelatedField(read_only=True)
    chamado = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Mensagem
        fields = ['id', 'data_envio', 'autor', 'texto', 'chamado']
        # read_only_fields = ['id', 'data_envio', 'autor', 'chamado']