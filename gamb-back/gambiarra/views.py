from django.db.models import Q
from rest_framework import status, filters
from .filters import ChamadoFilter 

# rest framework
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_filters import rest_framework as filters
from rest_framework.filters import SearchFilter
from authentication.constants import GrupoEnum
from authentication.permissions import *

# serializers
from gambiarra.serializers import CreateChamadoSerializer, ListarChamadoSerializer

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


        if grupo == GrupoEnum.GERENTE:
            return Chamado.objects.all()
        elif grupo == GrupoEnum.PROFESSOR:
            return Chamado.objects.filter(Q(professor=user) | Q(professor__isnull=True)).all()
        elif grupo == GrupoEnum.BOLSISTA:
            return Chamado.objects.filter(bolsistas=user).all()
        else:
            return Chamado.objects.filter(cliente=user).all()
          



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
    

