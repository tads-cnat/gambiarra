
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from authentication.models import Usuario
from gambiarra.models import Item, Chamado
from django.contrib.auth.models import Group

def cria_usuario(nome_grupo, username):
    grupo, _ = Grupo.objects.get_or_create(name=nome_grupo)
    user = get_user_model().objects.create_user(username=username, password="123")
    user.grupo = grupo
    user.save()
    return user

class ChamadoAPITests(APITestCase):
    def setUp(self):
        self.professor = cria_usuario("professor", "prof")
        self.cliente = cria_usuario("cliente", "cliente")
        self.item = Item.objects.create(modelo="Notebook", diagnostico="Não liga")
        self.url = reverse('gambiarra:Chamado-list')  # URL do endpoint de listagem/criação

        self.client.force_authenticate(user=self.cliente)

    def test_cria_chamado_com_sucesso_via_api(self):
        data = {
            "titulo": "Notebook pifado",
            "descricao": "Só pisca o LED",
            "cliente": self.cliente.id,
            "professor": self.professor.id,
            "status": "1",
            "item": self.item.id
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["titulo"], "Notebook pifado")
    
    def test_campos_obrigatorios_via_api(self):
        data = {
            "descricao": "Sem título",
            "cliente": self.cliente.id,
            "item": self.item.id
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("titulo", response.data)
    
    def test_listagem_de_chamados_via_api(self):
        Chamado.objects.create(
            titulo="Chamado antigo",
            descricao="De testes",
            professor=self.professor,
            cliente=self.cliente,
            status="1",
            item=self.item
        )
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
    
    def test_status_invalido_rejeitado_via_api(self):
        data = {
            "titulo": "Status inválido",
            "descricao": "Status inexistente",
            "cliente": self.cliente.id,
            "professor": self.professor.id,
            "status": "999",  # inválido
            "item": self.item.id
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("status", response.data)

    def test_chamado_em_diagnostico_precisa_de_professor(self):
        data = {
            "titulo": "Diagnóstico sem professor",
            "descricao": "Teste falho",
            "cliente": self.cliente.id,
            "status": "3",  # Em Diagnóstico
            "item": self.item.id
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("professor", response.data)