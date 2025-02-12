from django.core.management.base import BaseCommand
from authentication.models import Usuario
from gambiarra.models import *
import random

class Command(BaseCommand):
    def handle(self, *args, **options):
        chamados = Chamado.objects.all()
        qtd = len(chamados)
        if qtd:
            for i in chamados:
                i.delete()
            self.stderr.write(self.style.SUCCESS(f"Deletados todos ({qtd}) chamados."))
        else:
            self.stderr.write(self.style.ERROR(f"Nenhum chamado para deletar."))


