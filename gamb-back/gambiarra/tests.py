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
        
    def requisicao(self, usuario, chamado, status_novo, status_esperado):
        self.client.force_authenticate(user=self.usuarios[f"{usuario}"])
        url = reverse("Chamado-alterar-status", kwargs={"pk": chamado.id})
        resposta = self.client.patch(
            url, 
            {"status": f"{status_novo}"},
            format="json"
            )

        chamado.refresh_from_db()

        print(f"{STATUS_CHOICES[(int(chamado.status)-1)][1]} para status {STATUS_CHOICES[status_novo-1][1]}")

        self.assertEqual(
            resposta.status_code, 
            status_esperado,
            msg=f"Erro na transição com status {STATUS_CHOICES[(int(chamado.status)-1)][1]} para status {STATUS_CHOICES[status_novo-1][1]}."
            )
        return resposta
            

    def fazer_requisicoes(self, lista_requisicoes, status):
        if(status == 400):
            for i in lista_requisicoes:
                for j in i:
                    chamado = Chamado.objects.create(
                        titulo=f"{i}",
                        descricao=f"{i}",
                        status=lista_requisicoes.index(i),
                        cliente=self.usuarios["cliente"],
                    )
                    #print(STATUS_CHOICES[j-1][1], " -> ", STATUS_CHOICES[int(chamado.status)-1][1])
                    self.requisicao("professor", chamado, j, status)
                    chamado.status = j
                    chamado.save()


        for i in lista_requisicoes:
            chamado = Chamado.objects.create(
                titulo=f"{i}",
                descricao=f"{i}",
                status=1,
                cliente=self.usuarios["cliente"],
            )
            for j in i:
                print(STATUS_CHOICES[j-1][1], " -> ", STATUS_CHOICES[int(chamado.status)-1][1])
                self.requisicao("professor", chamado, j, status)
                chamado.status = j


    def test_sucesso(self):
        return
        print(STATUS_CHOICES)
        resolvido = [2,3,5,4,7]
        sem_resolucao1 = [2,3,5,4,6]
        sem_resolucao2 = [2,3,6]
        recusado = [8]

        lista_requisicoes = [resolvido, sem_resolucao1, sem_resolucao2, recusado]
        self.fazer_requisicoes(lista_requisicoes, status.HTTP_200_OK)

        

    def test_falha(self):   #Esse teste tá sempre dando erro, e eu não sei o porquê
                            #Tá me dando muito mais trabalho do que o imaginado...

        impossiveis = [
            [],
            [1,3,4,5,6,7],     #Em análise
            [1,2,4,5,6,7,8],   #Aceito
            [1,2,3,4,7,8],     #Em diagnóstico
            [1,2,3,5,8],     #Em Conserto
            [1,2,3,5,6,7,8],   #Aguardando peça
            [1,2,3,5,6,7,8], #Fechado sem resolução
            [1,2,3,5,6,7,8], #Resolvido
            [1,2,3,5,6,7,8], #Recusado
        ]        
        self.fazer_requisicoes(impossiveis, status.HTTP_400_BAD_REQUEST)