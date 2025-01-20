from rest_framework import status

# rest framework
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from authentication.permissions import *

# serializers
from gambiarra.serializers import CreateChamadoSerializer  # ChamadoSerializer

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
