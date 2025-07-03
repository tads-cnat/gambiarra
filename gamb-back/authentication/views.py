import requests
from django.contrib.auth.models import Group
from django.shortcuts import get_object_or_404
from django_filters import rest_framework
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import filters, status, viewsets
from rest_framework.decorators import action
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .constants import *
from .filters import UsuarioFilter
from .models import Usuario
from .permissions import *
from .serializers import *


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
            return Response(
                "Erro ao realizar o cadastro",
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


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
    filter_backends = [DjangoFilterBackend]
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
        return Response(
            {"mensagem": mensagem, "usuario": serializer.data}, status=retorno
        )


class SuapLoginView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(request_body=SuapLoginSerializer)
    def post(self, request):
        serializer = SuapLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        suap_token = serializer.validated_data["suap_token"]

        if not suap_token:
            return Response(
                {"erro": "Token não informado"}, status=status.HTTP_400_BAD_REQUEST
            )

        suap_login_url = "https://suap.ifrn.edu.br/api/rh/eu/"
        try:
            response = requests.get(
                suap_login_url,
                headers={"Authorization": f"Bearer {suap_token}"},
                timeout=20,
            )
        except requests.RequestException as e:
            return Response({"erro": e})

        if response.status_code != 200:
            print("resposta ", response)
            return Response(
                {"erro": "Token inválido ou expirado"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        print("resposta correta", response)
        dados = response.json()
        cpf = dados.get("cpf")
        username = dados.get("nome_usual")
        grupo = dados.get("tipo_usuario")
        grupo = Group.objects.get(grupo)
        imagem = dados.get("foto")

        if not cpf or username or grupo:
            return Response({"erro": "Resposta do SUAP incompleta"})

        usuario_obj, created = Usuario.objects.update_or_create(
            username=username,
            cpf=cpf,
            iamgem=imagem,
            defaults={
                "email": "email@exemplo.com",
                "is_staff": grupo in GrupoEnum.INTERNO,
                "is_superuser": grupo in GrupoEnum.STAFF,
                "is_active": True,
                "grupo_id": grupo.id,
            },
        )

        usuario = ProfileUserSerializer(usuario_obj)

        status_ret = status.HTTP_201_CREATED if created else status.HTTP_202_ACCEPTED
        return Response(
            {
                "usuario": usuario.data,
                "mensagem": (
                    "Usuário criado com sucesso."
                    if created
                    else "Login realizado com sucesso."
                ),
            },
            status=status_ret,
        )
