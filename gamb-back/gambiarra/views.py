from django.db.models import Q
from rest_framework import status, filters
from .filters import ChamadoFilter 
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action

# rest framework
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView
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
        return DetalharChamadoSerializer
    
    def get_queryset(self):
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
    
    #esse decorator indica que é uma fnução própria que só pode POST feito por Professor
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
    def alterar_status(self,request):
        pass
    #TODO