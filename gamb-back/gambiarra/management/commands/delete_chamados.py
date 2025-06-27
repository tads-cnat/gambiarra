from django.core.management.base import BaseCommand
from authentication.models import Usuario
from gambiarra.models import *
import random


class Command(BaseCommand):
    def handle(self, *args, **options):
        chamados = Chamado.objects.all()
        qtd = len(chamados)
        chamados.delete()
        self.stdout.write(self.style.SUCCESS(f"Deletados {qtd} chamados"))
