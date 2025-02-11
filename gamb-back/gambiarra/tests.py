from rest_framework.test import APITestCase
from gambiarra.models import *
from django.contrib.auth.models import Group
from authentication.models import Usuario
from rest_framework import status
from django.urls import reverse

class ChamadoViewSetTestCase(APITestCase):
    transicoes = {
        "Pendente": {
            "Aceitar chamado": "Aceito",
            "Recusar chamado": "Recusado",
        },
        "Aceito": {
            "Diagnosticar equipamento": "Em diagnóstico",
        },
        "Em diagnóstico": {
            "Pedir peça": "Aguardando peça",
            "Fechar chamado [Sem resolução]": "Fechado sem resolução",
        },
        "Aguardando peça": {
            "Consertar equipamento": "Equipamento em conserto",
            "Fechar chamado [Sem resolução]": "Fechado sem resolução",
        },
        "Equipamento em conserto": {
            "Equipamento consertado": "Resolvido",
            "Fechar chamado [Sem resolução]": "Fechado sem resolução",
        },
        "Resolvido": {
            "Fechar chamado": "Fechado",
        },
        "Fechado sem resolução": {
            "Fechar chamado": "Fechado",
        },
        "Recusado": {
            "Fechar chamado": "Fechado",
        },
    }


    def create_users(self):
        grupo_admin, _ = Group.objects.get_or_create(name="admin")
        grupo_professor, _ = Group.objects.get_or_create(name="professor")
        grupo_bolsista, _ = Group.objects.get_or_create(name="bolsista")
        grupo_gerente, _ = Group.objects.get_or_create(name="gerente")
        grupo_cliente, _ = Group.objects.get_or_create(name="cliente")

        cliente, created = Usuario.objects.update_or_create(
            username="cliente",
            defaults={
                "email": "cliente@example.com",
                "is_staff": False,
                "is_active": True,
                "grupo_id": grupo_cliente.id,
            },
        )
        if created:
            cliente.set_password("ZAP123!!")
            cliente.save()

        gerente, created = Usuario.objects.update_or_create(
            username="gerente",
            defaults={
                "email": "gerente@admin.com",
                "is_staff": True,
                "is_active": True,
                "is_superuser": True,
                "grupo_id": grupo_gerente.id,
            },
        )
        if created:
            gerente.set_password("ZAP123!!")
            gerente.save()

        professor, created = Usuario.objects.update_or_create(
            username="professor",
            defaults={
                "email": "professor@admin.com",
                "is_staff": True,
                "is_active": True,
                "is_superuser": True,
                "grupo_id": grupo_professor.id,
            },
        )
        if created:
            professor.set_password("ZAP123!!")
            professor.save()

        bolsista, created = Usuario.objects.update_or_create(
            username="bolsista1",
            defaults={
                "email": "bolsista@admin.com",
                "is_staff": True,
                "is_active": True,
                "is_superuser": True,
                "grupo_id": grupo_bolsista.id,
            },
        )
        if created:
            bolsista.set_password("ZAP123!!")
            bolsista.save()

        return {
            "gerente": gerente, 
            "professor": professor,
            "bolsista": bolsista,
            "cliente": cliente
        }



    def setUp(self):
        self.usuarios = self.create_users()
        self.chamados = {}
        
    def requisicao(self, usuario, chamado, acao, status_esperado):
        self.client.force_authenticate(user=self.usuarios[f"{usuario}"])
        url = reverse("Chamado-alterar-status", kwargs={"pk": chamado.id})
        resposta = self.client.patch(
            url, 
            {"acao": f"{acao}"},
            format="json"
            )

        self.assertEqual(
            resposta.status_code, 
            status_esperado,
            msg=f"Erro na transição com ação {acao} para o chamado com status {chamado.status}."
            )
        return resposta
            


    def test_sucesso(self):
        for status_inicial, acoes in self.transicoes.items():
            for acao, status_esperado in acoes.items():
                chamado = Chamado.objects.create(
                    titulo=status_inicial,
                    descricao=status_inicial,
                    status=status_inicial,
                    cliente=self.usuarios["cliente"],
                )
                self.requisicao(self.usuarios["professor"], chamado, acao, status.HTTP_200_OK)
                chamado.refresh_from_db()
                self.assertEqual(
                    chamado.status, 
                    status_esperado,
                    msg=f"Para status {status_inicial} e ação {acao}, esperado {status_esperado}, mas obteve {chamado.status}."
                )
        

    def test_aceitar_falha(self):
        for status_inicial in self.transicoes.keys():
            chamado = Chamado.objects.create(
                titulo=f"status_inicial",
                descricao=f"status_inicial",
                status=status_inicial,
                cliente=self.usuarios["cliente"],
            )
            response = self.requisicao("professor", chamado, "Ação inválida", status.HTTP_400_BAD_REQUEST)
            chamado.refresh_from_db()
            self.assertEqual(
                chamado.status,
                status_inicial,
                msg=f"Para status '{status_inicial}', a ação inválida alterou o status para '{chamado.status}'."
            )

        