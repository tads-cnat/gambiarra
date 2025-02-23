from datetime import timezone
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from gambiarra.models import Mensagem
from django.core.exceptions import ObjectDoesNotExist

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Quando o WebSocket for aceito, enviaremos a lista de mensagens.
        await self.accept()
        await self.send(text_data=json.dumps({"texto": "Conectado ao WebSocket!"}))

    async def disconnect(self, close_code):
        pass  # Lógica de desconexão, se necessário

    async def receive(self, text_data):
        data = json.loads(text_data)
        autor = data.get("autor", "Anônimo")
        chamado = data.get("chamado", "")
        texto = data.get("texto", "")

        # Salvar mensagem no banco de forma assíncrona
        await self.save_message(autor, texto, chamado)

        # Agora, vamos enviar todas as mensagens desse chamado específico
        messages = await self.get_messages_by_chamado(chamado)
        await self.send(text_data=json.dumps({"mensagens": messages}))

    @sync_to_async
    def save_message(self, autor, texto, chamado):
        try:
            Mensagem.objects.create(autor=autor, texto=texto, chamado=chamado)
        except Exception as e:
            print(f"Erro ao salvar mensagem: {e}")

    @sync_to_async
    def get_messages_by_chamado(self, chamado):
        try:
            # Filtra as mensagens pelo chamado
            messages = Mensagem.objects.filter(chamado=chamado).order_by("-data_envio")
            return [{"autor": msg.autor, "texto": msg.texto, "chamado": msg.chamado, "data_envio": msg.data_envio.isoformat()} for msg in messages]
        except ObjectDoesNotExist:
            return []
