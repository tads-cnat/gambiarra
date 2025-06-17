from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group


class GrupoEnum:
    GERENTE = "gerente"
    PROFESSOR = "professor"
    BOLSISTA = "bolsista"
    SERVIDOR = "servidor"
    CLIENTE = "cliente"
    ALUNO = "aluno"

    INTERNO = (GERENTE, PROFESSOR, BOLSISTA)
    EXTERNO = (SERVIDOR, CLIENTE, ALUNO)


class Command(BaseCommand):
    help = "Populate initial groups based on GrupoEnum"

    def handle(self, *args, **kwargs):
        groups = list(GrupoEnum.INTERNO) + list(GrupoEnum.EXTERNO)

        for group_name in groups:
            group, created = Group.objects.get_or_create(name=group_name)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Group '{group_name}' created."))
            else:
                self.stdout.write(f"Group '{group_name}' already exists.")

        self.stdout.write(self.style.SUCCESS("Groups populated successfully."))
