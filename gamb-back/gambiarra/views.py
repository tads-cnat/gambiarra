from django.db.models import Q
from rest_framework import status, filters
from .filters import ChamadoFilter 
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_filters import rest_framework as filters
from rest_framework.filters import SearchFilter
from authentication.constants import GrupoEnum
from authentication.permissions import *
from gambiarra.serializers import *
from .models import *

TAB_STATUS_MAPPING = {
    "todos": [],  # Inclui todos os status
    "aceitos": ["Aceito", "Em Diagnóstico", "Equipamento em conserto", "Aguardando peça"],
    "pendentes": ["Em Análise"],
    "recusados": ["Recusado"],
    "fechados": ["Fechado sem resolução", "Resolvido", "Recusado"],
}

        
class ChamadoViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Chamado.objects.all()
    filter_backends = (SearchFilter, filters.DjangoFilterBackend)
    search_fields = [
        'status',  # Campo status
        'titulo__icontains',  # Campo titulo
        'descricao__icontains',  # Campo descricao
        'code__icontains',  # Campo code
        'professor',  # Campo professor username
        'bolsistas',  # Campo bolsistas username
        'cliente',  # Campo cliente username
    ]
    filterset_class = ChamadoFilter

    def get_serializer_class(self): #Função pra retornar o serializador apropriado pra cada função
        if self.action == "create": 
            return CreateChamadoSerializer
        if self.action == "aceitar_chamado":
            return AceitarChamadoSerializer
        if self.action == "alterar_status":
            return AlterarStatusSerializer
        if self.action == "get_queryset":
            return ListarChamadoSerializer
        return ListarChamadoSerializer
        

    def listar(self):
        user: Usuario = self.request.user
        grupo = user.grupo.name

        # Base inicial de queryset com base no grupo do usuário
        if grupo == GrupoEnum.GERENTE:
            queryset = Chamado.objects.all()
        elif grupo == GrupoEnum.PROFESSOR:
            queryset = Chamado.objects.filter(Q(professor=user) | Q(professor__isnull=True))
        elif grupo == GrupoEnum.BOLSISTA:
            queryset = Chamado.objects.filter(bolsistas=user)
        else:
            queryset = Chamado.objects.filter(cliente=user)

        status_param = self.request.GET.get('status', None)
        tab_param = self.request.GET.get('tab', "todos")  # Default para "todos"


        # Filtrar pela tab (múltiplos status associados)
        if tab_param in TAB_STATUS_MAPPING and TAB_STATUS_MAPPING[tab_param]:
            queryset = queryset.filter(status=TAB_STATUS_MAPPING[tab_param])

        # Filtrar pelo status individual se fornecido
        if status_param:
            queryset = queryset.filter(status=status_param)


        return queryset
    
    def create(self, request):
        # print("Authenticated user:", request.user.grupo.name)
        if not OnlyExterno().has_permission(request, self):
            return Response({"erro": "Você não tem permissão para criar chamados."}, status=status.HTTP_403_FORBIDDEN)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        chamado = serializer.instance
        return Response(
            data={
                "success": True,
                "data": {
                    "id": chamado.id,
                },
                "message": "Chamado aberto com sucesso!",
            },
            status=status.HTTP_201_CREATED,
        )
    
    @action(detail=True, methods=["patch"], permission_classes=[OnlyProfessor])
    def alterar_status(self, request, pk):
        try:
            chamado = Chamado.objects.get(pk=pk)
        except Chamado.DoesNotExist:
            return erro("Chamado não encontrado")

        status_antigo = chamado.status
        status_novo = request.data.get("status")

        #Definindo transições válidas com base nas decisões projetuais 
        transicoes = {
            "Em Análise": ["Aceito", "Recusado"],
            "Aceito": ["Em Diagnóstico"],
            "Em Diagnóstico": ["Aguardando Peça", "Fechado Sem Resolução", "Equipamento Em Conserto"],
            "Aguardando Peça": ["Equipamento Em Conserto", "Fechado Sem Resolução"],
            "Equipamento Em Conserto": ["Resolvido", "Fechado Sem Resolução"],
            "Resolvido": ["Fechado"],
            "Fechado Sem Resolução": ["Fechado"],
            "Recusado": ["Fechado"],
        }
        

        #Resolvendo erros:
        #Se os status não são iguais
        #Se status não foi passado
        #Se status não é inteiro
        #Se o status atual é inváliso (nunca é pra acontecer)

        if str(status_novo) == str(chamado.status):
            return erro("O status antigo é igual ao status atual.")


        if status_novo is None:
            return erro("O campo 'status' é obrigatório.")

        try:
            status_novo = int(status_novo)
        except:
            return erro("O campo 'status' deve ser um número inteiro")
        
        #Transforma STATUS_CHOICE em um dict de ids:chaves
        status_dict = {status_id: status_texto for status_id, status_texto in STATUS_CHOICES}

        if str(status_novo) not in status_dict:
            return erro("Status inválido")

        status_atual_texto = status_dict.get(str(chamado.status))
        status_novo_texto = status_dict.get(str(status_novo))

        if not status_atual_texto:
            return erro("Status atual inválido")
            #Nunca é pra chegar aqui, mas vai que...


        #Mais verificação de erros:
        #Se o status atual tem transições definidas (mais um que não é pra dar erro nunca)
        #Se a transição desejada é permitida
        
        if status_atual_texto not in transicoes:
            return erro(f"Não há transições definidas para o status {status_atual_texto}")
        
        if status_novo_texto not in transicoes[status_atual_texto]:
            return erro(f"Não é possível ir de '{status_atual_texto}' para '{status_novo_texto}'")

        #Linkando o professor ao chamado, se ele aceitá-lo
        if status_novo_texto == "Aceito":
            chamado.professor = request.user

        chamado.status = status_novo
        chamado.save()

        return Response({"mensagem": "Status atualizado com sucesso", "novo_status": status_novo_texto})

#Função pro código não ficar tão verboso feio
def erro(e):
    return Response({"erro": e}, status=status.HTTP_400_BAD_REQUEST)