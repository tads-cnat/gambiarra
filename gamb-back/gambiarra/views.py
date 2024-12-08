from .models import *
from rest_framework.permissions import IsAuthenticated

#rest framework
from rest_framework.generics import(
    CreateAPIView, ListAPIView
) 
from rest_framework.response import Response
from rest_framework import status

#serializers
from gambiarra.serializers import(
    CreateChamadoSerializer, ChamadoSerializer
)
from authentication.permissions import *
from rest_framework_simplejwt.authentication import JWTAuthentication

#swagger
from drf_spectacular.utils import extend_schema       
@extend_schema(
    request=CreateChamadoSerializer,
    responses=CreateChamadoSerializer,
)

#cria novo chamado com status 1
class CreateChamadoView(CreateAPIView):
    permission_classes = [IsAuthenticated, OnlyExterno]
    authentication_classes = [JWTAuthentication]
    queryset = Chamado.objects.all()
    serializer_class = CreateChamadoSerializer

    def create(self, request):
        print("Authenticated user:", request.user.grupo.name)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        chamado = serializer.instance

        return Response(data={
            "success": True,
            "data": {
                chamado.id
            },
            "message": "Chamado aberto com sucesso!"
        }, status=status.HTTP_201_CREATED)
