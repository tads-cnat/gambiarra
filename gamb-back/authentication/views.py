from rest_framework import status, filters
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import *
from .permissions import *
from .constants import *
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.contrib.auth.models import Group
from django.shortcuts import get_object_or_404
from django_filters import rest_framework as filters
from .models import Usuario
from .filters import UsuarioFilter


class RegisterUserView(CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]  # any can register an account

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(
            raise_exception=True
        )  # checks the validations inside the serializer
        self.perform_create(serializer)  # calls the serializer's create method
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ProfileUserView(RetrieveAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileUserSerializer

    def get(self, request):
        user = request.user
        serializer = self.get_serializer(user)

        return Response(
            data={
                "success": True,
                "data": serializer.data,
                "message": None,
            },
            status=status.HTTP_200_OK,
        )



class UsuarioViewSet(viewsets.ModelViewSet):
    serializer_class = ListarUsuarioSerializer
    permission_classes = [IsAuthenticated]
    queryset = Usuario.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = UsuarioFilter


    def get(self, request):
        grupo_id = request.GET.get('grupo_id', None)

        if not grupo_id:
            return Response({"erro": "O campo 'grupo_id' é obrigatório."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            grupo_id = int(grupo_id)
        except ValueError:
            return Response({"erro": "O campo 'grupo_id' deve ser um número inteiro válido."}, status=status.HTTP_400_BAD_REQUEST)

        grupo = get_object_or_404(Group, id=grupo_id)
        
        usuarios = Usuario.objects.filter(grupo__id=grupo_id)
        serializer = self.get_serializer(usuarios, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
