from django.contrib.auth.models import Group
from django.core.management.base import BaseCommand
from authentication.models import Usuario
from faker import Faker

fake = Faker("pt_BR")

class Command(BaseCommand):
    help = "popula o banco com vários usuários"

    def add_arguments(self, parser):
        parser.add_argument("n_adm", type=int, help="Número de administradores a serem criados")
        parser.add_argument("n_pro", type=int, help="Número de professores a serem criados")
        parser.add_argument("n_bol", type=int, help="Número de bolsistas a serem criados")
        parser.add_argument("n_cli", type=int, help="Número de clientes a serem criados")
        
    def handle(self, *args, **kwargs):
        try:
            grupo_admin = Group.objects.get(pk=1)
            grupo_professor = Group.objects.get(pk=2)
            grupo_bolsista = Group.objects.get(pk=3)
            grupo_cliente = Group.objects.get(pk=5)

            # Criando administradores
            for i in range(kwargs['n_adm']):
                nome = fake.name()
                usuario, created = Usuario.objects.update_or_create(
                    username=f"{nome}",
                    defaults={
                        "email": fake.email(),
                        "is_staff": True,
                        "is_active": True,
                        "is_superuser": True,
                        "grupo_id": grupo_admin.id,
                        "first_name": nome.split()[0],
                        "last_name": " ".join(nome.split()[1:]),
                    },
                )
                if created:
                    usuario.set_password("ZAP123!!")
                    usuario.save()

            # Criando professores
            for i in range(kwargs['n_pro']):
                nome = fake.name()
                usuario, created = Usuario.objects.update_or_create(
                    username=f"{nome}",
                    defaults={
                        "email": fake.email(),
                        "is_staff": True,
                        "is_active": True,
                        "is_superuser": True,
                        "grupo_id": grupo_professor.id,
                        "first_name": nome.split()[0],
                        "last_name": " ".join(nome.split()[1:]),
                    },
                )
                if created:
                    usuario.set_password("ZAP123!!")
                    usuario.save()

            # Criando bolsistas
            for i in range(kwargs['n_bol']):
                nome = fake.name()
                usuario, created = Usuario.objects.update_or_create(
                    username=f"{nome}",
                    defaults={
                        "email": fake.email(),
                        "is_staff": True,
                        "is_active": True,
                        "is_superuser": True,
                        "grupo_id": grupo_bolsista.id,
                        "first_name": nome.split()[0],
                        "last_name": " ".join(nome.split()[1:]),
                    },
                )
                if created:
                    usuario.set_password("ZAP123!!")
                    usuario.save()

            # Criando clientes
            for i in range(kwargs['n_cli']):
                nome = fake.name()
                usuario, created = Usuario.objects.update_or_create(
                    username=f"{nome}",
                    defaults={
                        "email": fake.email(),
                        "is_staff": False,
                        "is_active": True,
                        "grupo_id": grupo_cliente.id,
                        "first_name": nome.split()[0],
                        "last_name": " ".join(nome.split()[1:]),
                    },
                )
                if created:
                    usuario.set_password("ZAP123!!")
                    usuario.save()

            self.stdout.write(self.style.SUCCESS("Usuários criados com nomes realistas usando Faker."))

        except Group.DoesNotExist:
            self.stderr.write(self.style.ERROR("Os grupos não existem."))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Erro: {str(e)}"))