from datetime import timezone
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from gambiarra.models import Mensagem
from django.core.exceptions import ObjectDoesNotExist
from authentication.models import Usuario
from django.core.serializers.json import DjangoJSONEncoder

class ChatConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        print("Conectado")
        # O chat_id agora é extraído do parâmetro da URL
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']

        # Definir o nome do grupo
        self.group_name = f"chat_{self.chat_id}"

        # Criar ou adicionar o WebSocket ao grupo
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Remover o WebSocket do grupo ao desconectar
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        try:
            print("Dados recebidos:", text_data)
            data = json.loads(text_data)
            history = data.get("history", False)
            chamado_id = data.get("chamado")
    
            # Extrair dados com validação
            if(history):
                messages = await self.get_messages_by_chamado(chamado_id)
                await self.send(text_data=json.dumps({
                    "mensagens": messages
                }, cls=DjangoJSONEncoder))
                return
            
            autor_id = data.get("autor")
            chamado_id = data.get("chamado")
            texto = data.get("texto", "")
            
            if not all([autor_id, chamado_id, texto]):
                await self.send(json.dumps({"error": "Dados incompletos"}))
                return

            # Salvar mensagem corretamente
            await self.save_message(autor_id, texto, chamado_id)
            
            # Buscar mensagens atualizadas
            messages = await self.get_messages_by_chamado(chamado_id)
            
            # Enviar a nova mensagem para todos no grupo (chat)
            await self.channel_layer.group_send(
                self.group_name, 
                {
                    'type': 'chat_message',
                    'mensagens': messages
                }
            )

        except json.JSONDecodeError:
            await self.send(json.dumps({"error": "Formato JSON inválido"}))
        except Exception as e:
            print(f"Erro geral: {str(e)}")
            await self.send(json.dumps({"error": "Erro interno do servidor"}))

    async def chat_message(self, event):
        # Enviar a mensagem para o WebSocket
        await self.send(text_data=json.dumps({
            "mensagens": event['mensagens']
        }, cls=DjangoJSONEncoder))

    @sync_to_async
    def get_user(self, user_id):
        try:
            return Usuario.objects.get(id=user_id)
        except Usuario.DoesNotExist:
            return None

    @sync_to_async
    def save_message(self, autor_id, texto, chamado_id):
        try:
            autor = Usuario.objects.get(id=autor_id)
            Mensagem.objects.create(
                autor=autor,
                texto=texto,
                chamado_id=chamado_id
            )
        except Exception as e:
            print(f"Erro ao salvar mensagem: {str(e)}")
            raise

    @sync_to_async
    def get_messages_by_chamado(self, chamado_id):
        try:
            messages = Mensagem.objects.filter(chamado_id=chamado_id).order_by("data_envio")
            return [{
                "id": msg.pk,
                "autor": {
                    "id": msg.autor.pk,
                    "username": msg.autor.username
                },
                "texto": msg.texto,
                "chamado": msg.chamado_id,
                "data_envio": msg.data_envio.astimezone(timezone.utc).isoformat()
            } for msg in messages]
        except ObjectDoesNotExist:
            return []
