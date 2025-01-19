from django.db.models import Q
from rest_framework import status

# rest framework
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

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

    def get_queryset(self):
        user: Usuario = self.request.user
        if user.grupo.name == GrupoEnum.PROFESSOR:
            queryset = Chamado.objects.filter(
                Q(professor=user) | Q(professor__isnull=True)
            ).all()
        elif user.grupo.name == GrupoEnum.GERENTE:
            queryset = Chamado.objects.all()
        else:
            queryset = Chamado.objects.filter(cliente=user).all()
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
