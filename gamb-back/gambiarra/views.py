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
        'status__icontains',  # Campo status
        'titulo__icontains',  # Campo titulo
        'descricao__icontains',  # Campo descricao
        'code__icontains',  # Campo code
        'professor__username__icontains',  # Campo professor username
        'bolsistas__username__icontains',  # Campo bolsistas username
        'cliente__username__icontains',  # Campo cliente username
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
            queryset = queryset.filter(status__in=TAB_STATUS_MAPPING[tab_param])

        # Filtrar pelo status individual se fornecido
        if status_param:
            queryset = queryset.filter(status__icontains=status_param)


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
    
    @action(detail=True, methods=['post'], permission_classes=[OnlyProfessor])
    def aceitar_chamado(self, request, pk=None):
        user: Usuario = self.request.user
        chamado = get_object_or_404(Chamado, id=id)

        if chamado.status == "1":
            chamado.status = "2"
            chamado.professor = request.user
            chamado.save()
            serializer = self.get_serializer(chamado)
        else:
            return Response(
                data={
                    "success": True,
                    "data": None,
                    "message": "Chamado já aceito",
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            data={
                "success": True,
                "data": serializer.data,
                "message": "Chamado aceito por " + user.username,
            },
            status=status.HTTP_200_OK,
        )
    
    @action(detail=True, methods=["patch"], permission_classes=[OnlyProfessor])
    def alterar_status(self, request, pk):
        try:
            chamado = Chamado.objects.get(pk=pk)
        except Chamado.DoesNotExist:
            return Response({"erro": "Chamado não encontrado"}, status=status.HTTP_404_NOT_FOUND)

        status_atual = chamado.status
        acao = request.data.get("acao")

        # Mapeamento de transições válidas baseado no diagrama
        transicoes = {
            "Em Análise": {
                "Aceitar chamado": "Aceito",
                "Recusar chamado": "Recusado",
            },
            "Aceito": {
                "Diagnosticar equipamento": "Em diagnóstico",
            },
            "Em Diagnóstico": {
                "Pedir peça": "Aguardando peça",
                "Fechar chamado [Sem resolução]": "Fechado sem resolução",
            },
            "Aguardando Peça": {
                "Consertar equipamento": "Equipamento em conserto",
                "Fechar chamado [Sem resolução]": "Fechado sem resolução",
            },
            "Equipamento Em Conserto": {
                "Equipamento consertado": "Resolvido",
                "Fechar chamado [Sem resolução]": "Fechado sem resolução",
            },
            "Resolvido": {
                "Fechar chamado": "Fechado",
            },
            "Fechado Sem Resolução": {
                "Fechar chamado": "Fechado",
            },
            "Recusado": {
                "Fechar chamado": "Fechado",
            },
        }

        # Verifica se a ação é válida para o status atual
        if status_atual in transicoes and acao in transicoes[status_atual]:
            chamado.status = transicoes[status_atual][acao]
            chamado.save()
            return Response({"mensagem": "Status atualizado com sucesso", "novo_status": chamado.status}, status=status.HTTP_200_OK)
        else:
            return Response({"erro": "Ação inválida para o status atual"}, status=status.HTTP_400_BAD_REQUEST)