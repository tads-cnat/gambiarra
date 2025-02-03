from django.contrib.auth.models import Group
from django.core.management.base import BaseCommand

from authentication.models import Usuario


class Command(BaseCommand):
    help = "Populate the User table"

    def handle(self, *args, **kwargs):
        try:
            grupo_admin = Group.objects.get(pk=1)
            grupo_professor = Group.objects.get(pk=2)
            grupo_bolsista = Group.objects.get(pk=3)
            grupo_cliente = Group.objects.get(pk=5)

            cliente1, created = Usuario.objects.update_or_create(  # cliente1
                username="cliente1",
                defaults={
                    "email": "cliente@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "grupo_id": grupo_cliente.id,
                },
            )
            if created:
                cliente1.set_password("ZAP123!!")
                cliente1.save()

            gerente1, created = Usuario.objects.update_or_create(
                username="gerente1",
                defaults={
                    "email": "gerente1@admin.com",
                    "is_staff": True,
                    "is_active": True,
                    "is_superuser": True,
                    "grupo_id": grupo_admin.id,
                },
            )
            if created:
                gerente1.set_password("ZAP123!!")
                gerente1.save()

            professor1, created = Usuario.objects.update_or_create(  # professor1
                username="professor1",
                defaults={
                    "email": "professor1@admin.com",
                    "is_staff": True,
                    "is_active": True,
                    "is_superuser": True,
                    "grupo_id": grupo_professor.id,
                },
            )
            if created:
                professor1.set_password("ZAP123!!")
                professor1.save()

            professor2, created = Usuario.objects.update_or_create(  # professor2
                username="professor2",
                defaults={
                    "email": "professor2@admin.com",
                    "is_staff": True,
                    "is_active": True,
                    "is_superuser": True,
                    "grupo_id": grupo_professor.id,
                },
            )
            if created:
                professor2.set_password("ZAP123!!")
                professor2.save()

            bolsista1, created = Usuario.objects.update_or_create(  # bolsista1
                username="bolsista1",
                defaults={
                    "email": "bolsista1@admin.com",
                    "is_staff": True,
                    "is_active": True,
                    "is_superuser": True,
                    "grupo_id": grupo_bolsista.id,
                },
            )
            if created:
                bolsista1.set_password("ZAP123!!")
                bolsista1.save()

            bolsista2, created = Usuario.objects.update_or_create(  # bolsista2
                username="bolsista2",
                defaults={
                    "email": "bolsista2@admin.com",
                    "is_staff": True,
                    "is_active": True,
                    "is_superuser": True,
                    "grupo_id": grupo_bolsista.id,
                },
            )
            if created:
                bolsista2.set_password("ZAP123!!")
                bolsista2.save()

        except Group.DoesNotExist:
            self.stderr.write(self.style.ERROR("Os grupos não existes"))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Erro: {str(e)}"))
