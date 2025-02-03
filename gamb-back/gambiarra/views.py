from django.db.models import Q
from rest_framework import status, filters
from .filters import ChamadoFilter 
from django.shortcuts import get_object_or_404

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

# serializers
from gambiarra.serializers import *

# models
from .models import *

# cria novo chamado com status 1
class CreateChamadoView(CreateAPIView):
    permission_classes = [IsAuthenticated, OnlyExterno]
    authentication_classes = [JWTAuthentication]
    queryset = Chamado.objects.all()
    serializer_class = CreateChamadoSerializer

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


TAB_STATUS_MAPPING = {
    "todos": [],  # Inclui todos os status
    "aceitos": ["Aceito", "Em Diagnóstico", "Equipamento em conserto", "Aguardando peça"],
    "pendentes": ["Em Análise"],
    "recusados": ["Recusado"],
    "fechados": ["Fechado sem resolução", "Resolvido", "Recusado"],
}
class ListarChamadoView(ListAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    serializer_class = ListarChamadoSerializer
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

          
    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())

        serializer = self.get_serializer(queryset, many=True)

        return Response(
            data={
                "success": True,
                "data": serializer.data,
                "message": None,
            },
            status=status.HTTP_200_OK,
        )


class AceitarChamadoView(CreateAPIView):
    permission_classes = [IsAuthenticated, OnlyProfessor]
    authentication_classes = [JWTAuthentication]
    serializer_class = AceitarChamadoSerializer

    def post(self, request, id):
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
