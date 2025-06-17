from django.contrib.auth.models import Group
from django.core.management.base import BaseCommand
from authentication.models import Usuario
from faker import Faker

fake = Faker("pt_BR")


class Command(BaseCommand):
    help = "popula o banco com vários usuários"

    def add_arguments(self, parser):
        parser.add_argument(
            "n_usu", type=int, help="Número de usuários a serem criados"
        )

    def handle(self, *args, **kwargs):
        try:
            grupo_aluno = Group.objects.get(pk=6)
            grupo_servidor = Group.objects.get(pk=4)

            # Criando clientes
            for i in range(kwargs["n_usu"]):
                nome = fake.name()
                usuario, created = Usuario.objects.update_or_create(
                    username=f"{nome}",
                    defaults={
                        "email": fake.email(),
                        "is_staff": False,
                        "is_active": True,
                        "grupo_id": grupo_servidor.id,
                        "first_name": nome.split()[0],
                        "last_name": " ".join(nome.split()[1:]),
                    },
                )
                if created:
                    usuario.set_password("ZAP123!!")
                    usuario.save()

            for i in range(kwargs["n_usu"]):
                nome = fake.name()
                usuario, created = Usuario.objects.update_or_create(
                    username=f"{nome}",
                    defaults={
                        "email": fake.email(),
                        "is_staff": False,
                        "is_active": True,
                        "grupo_id": grupo_aluno.id,
                        "first_name": nome.split()[0],
                        "last_name": " ".join(nome.split()[1:]),
                    },
                )
                if created:
                    usuario.set_password("ZAP123!!")
                    usuario.save()

            self.stdout.write(
                self.style.SUCCESS("Usuários criados com nomes realistas usando Faker.")
            )

        except Group.DoesNotExist:
            self.stderr.write(self.style.ERROR("Os grupos não existem."))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Erro: {str(e)}"))
