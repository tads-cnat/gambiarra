from rest_framework import generics
from gambiarra.models import  Mensagem
from gambiarra.serializers import MensagemSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_filters import rest_framework as filters
from gambiarra.filters import MensagemFilter
from rest_framework.views import APIView
from rest_framework.response import Response

class ChatMessageListView(generics.ListAPIView):
    queryset = Mensagem.objects.all().order_by("-data_envio")
    serializer_class = MensagemSerializer
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = MensagemFilter    
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        
        chamado = self.request.query_params.get("chamado_id", None)
        if chamado is not None:
            queryset = queryset.filter(chamado=chamado)
        else:
            return Response({"detail": "Parâmetro 'chamado' não fornecido."}, status=400)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class WebSocketStatusView(APIView):
    def get(self, request):
        return Response({"status": "WebSocket ativo na rota /ws/chat/"})
