from django.core.management.base import BaseCommand
from authentication.models import Usuario
from gambiarra.models import *
import random

class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument("quantidade", type=int)

    help = "Popula o banco de dados com os modelos de chamado"
    def handle(self, *args, **options):
        quantidade = options["quantidade"]
        try:
            professores = Usuario.objects.filter(grupo__name="professor")
            bolsistas = Usuario.objects.filter(grupo__name="bolsista")
            clientes = Usuario.objects.filter(grupo__name="cliente")



            if not(professores.exists() and bolsistas.exists() and clientes.exists()):
                self.stderr.write(
                    self.style.ERROR("Rode o script 'python manage.py populate_user' antes")
                )
                return
            
#===============================================================================#


            #criação de quantidade*chamados
            for i in range(quantidade):
                bolsista = random.choice(bolsistas)
                chamado = Chamado.objects.create(
                    titulo = f"chamado {i}",
                    descricao = f"descrição {i}",
                    professor = random.choice(professores),
                    cliente = random.choice(clientes),
                    status = random.choice(STATUS_CHOICES)[0],  #JEITO CERTO DE GUARDAR O STATUS
                    item = Item.objects.create(
                    modelo=f"Item-{i}",
                    diagnostico="Diagnóstico genérico",
                ),
                )
                chamado.bolsistas.add(bolsista)
            self.stderr.write(self.style.SUCCESS(f"Adicionados {quantidade} chamados aleatórios"))
            

        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Erro ao popular banco de dados: {str(e)}"))
            pass