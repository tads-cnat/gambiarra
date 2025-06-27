import requests
from rest_framework import status, filters
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
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
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(
                raise_exception=True
            )  # checks the validations inside the serializer
            self.perform_create(serializer)  # calls the serializer's create method
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except:
            return Response("Erro ao realizar o cadastro", status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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

    def get_serializer_class(
        self,
    ):  # Função pra retornar o serializador apropriado pra cada função
        acao = self.action
        if acao == "alterar_cargo":
            return AlterarCargoSerializer
        return ListarUsuarioSerializer

    def get(self, request):
        grupo_id = request.GET.get("grupo_id", None)

        if not grupo_id:
            return Response(
                {"erro": "O campo 'grupo_id' é obrigatório."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            grupo_id = int(grupo_id)
        except ValueError:
            return Response(
                {"erro": "O campo 'grupo_id' deve ser um número inteiro válido."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        grupo = get_object_or_404(Group, id=grupo_id)

        usuarios = Usuario.objects.filter(grupo__id=grupo_id)
        serializer = self.get_serializer(usuarios, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["patch"], permission_classes=[OnlyGerente])
    def alterar_cargo(self, request, pk):
        usuario = get_object_or_404(Usuario, pk=pk)
        retorno = status.HTTP_400_BAD_REQUEST
        mensagem = "Usuário não foi alterado"

        if usuario.grupo.name == GrupoEnum.SERVIDOR:
            usuario.grupo = Group.objects.get(name="professor")
            usuario.save()
            retorno = status.HTTP_200_OK
            mensagem = "Usuário alterado com sucesso"

        elif usuario.grupo.name == GrupoEnum.ALUNO:
            usuario.grupo = Group.objects.get(name="bolsista")
            usuario.save()
            retorno = status.HTTP_200_OK
            mensagem = "Usuário alterado com sucesso"

        serializer = ListarUsuarioSerializer(usuario)
        return Response({"mensagem": mensagem, "usuario": serializer.data}, status=retorno)

class SuapLoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        suap_login_url = "https://suap.ifrn.edu.br/api/token/"
        login_response = requests.post(suap_login_url + "pair", data={
            "username": username,
            "password": password
        })

        if login_response.status_code != 200:
            return Response({"error": "Credenciais inválidas no SUAP"}, status=status.HTTP_401_UNAUTHORIZED)

        print(login_response, login_response.text)
        
