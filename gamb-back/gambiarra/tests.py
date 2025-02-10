from rest_framework.test import APITestCase
from gambiarra.models import *
from django.contrib.auth.models import Group
from authentication.models import Usuario
from rest_framework import status
from django.urls import reverse

class ChamadoViewSetTestCase(APITestCase):
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

        for status in STATUS_CHOICES:
            chamado = Chamado.objects.create(
                titulo = status[1],
                descricao = status[1],
                status = status[1],
                cliente = self.usuarios["cliente"],
            )
            self.chamados[status[1]] = chamado
        
        

    def test_aceitar_sucesso(self):
        chamado = self.chamados[STATUS_CHOICES[0][1]]   #Em análise
        self.client.force_authenticate(user=self.usuarios["professor"])

        url = reverse("Chamado-alterar-status", kwargs={"pk": chamado.id})
        resposta = self.client.patch(
            url, 
            {"acao": "Aceitar chamado"},
            format="json"
            )

        print(self.client)
        print(STATUS_CHOICES[0][1]) #Em análise
        print(url)
        print(resposta)

        self.assertEqual(resposta.status_code, status.HTTP_200_OK)
        chamado.refresh_from_db()
        self.assertEqual(chamado.status, "Aceito")



        