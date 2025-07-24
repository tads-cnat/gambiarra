from django.core.management.base import BaseCommand
from authentication.models import Usuario
from gambiarra.models import *
import random

#Retirar pós avaliação
from .populate_chamados_random import PROBLEMAS_COMUNS, DIAGNOSTICOS_POSSIVEIS, ITEMS_POSSIVEIS, AVALIACOES_POSSIVEIS, DESCRICOES_POSSIVEIS, ACESSORIOS_POSSIVEIS

# Criação de alterações
ALTERACOES_POSSIVEIS = [
    [
        1,
    ],  # Em análise
    [1, 2],  # Aceito
    [1, 2, 3],  # Em Diagnóstico
    [1, 2, 3, 5, 4],  # Equipamento Em Conserto
    [1, 2, 3, 5],  # Aguardando Peça
    [1, 2, 3, 5, 4, 6],  # Fechado Sem Resolução
    [1, 2, 3, 5, 4, 7],  # Resolvido
    [1, 8],  # Recusado
]


class Command(BaseCommand):
    help = "Popula o banco de dados com os modelos de chamado, itens, acessórios, avaliações, mensagens, e alterações de status"

    def handle(self, *args, **kwargs):
        escolha = 1
        bypass = (
            os.getenv("MOD_DEV", "0") == "1"
        )  # para popular o banco se já houver objetos
        try:
            if (
                Item.objects.all()
                or Chamado.objects.all()
                or Mensagem.objects.all()
                or Avaliacao.objects.all()
            ) and (not bypass):
                # Se houver objetos no banco, não popular
                # A não ser que bypass for True

                self.stderr.write(self.style.ERROR("Já tem objetos no banco"))
                return

            # Criando listas de todos os models para facilitar debug.
            itens = []
            # acessorios = [] #debug
            chamados = []
            mensagens = []
            avaliacoes = []

            professores = Usuario.objects.filter(grupo__name="professor")
            bolsistas = Usuario.objects.filter(grupo__name="bolsista")
            clientes = Usuario.objects.filter(grupo__name="cliente")

            # print("DEBUG", professor, bolsista, cliente, sep="\n")

            if not (professores.exists() and bolsistas.exists() and clientes.exists()):
                self.stderr.write(
                    self.style.ERROR(
                        "Rode o script 'python manage.py populate_user' antes"
                    )
                )
                return

            # ===============================================================================#

            # criação de itens
            for i in range(100):
                item = Item.objects.create(
                    modelo=f"Item-{i}",
                    diagnostico="Diagnóstico genérico",
                )
                # Criar acessórios associados ao item
                for j in range(random.randint(1, 3)):
                    Acessorio.objects.create(
                        nome=f"Acessório-{i}-{j}",
                        item=item,
                    )
                    # acessorios.append(acessorio) #debug
                itens.append(item)

            # print("DEBUG", itens, acessorios, sep="\n\n")

            self.stdout.write(self.style.SUCCESS("Itens e acessórios criados."))

            # ===============================================================================#

            # Criação de chamados para usuário Cliente1 APENAS PARA AVALIAÇÃO EMPÍRICA
            # criação de chamados, um para cada status
            for i in STATUS_CHOICES:
                for j in range(3):
                    cliente = clientes.filter(username="cliente1")
                    bolsista = random.choice(bolsistas)
                    professor = random.choice(professores)
                    cliente = random.choice(clientes)
                    sequencia_status = random.choice(ALTERACOES_POSSIVEIS)
                    problema = random.choice(PROBLEMAS_COMUNS)
                    descricao = random.choice(DESCRICOES_POSSIVEIS).format(
                        cliente=cliente.username, problema=problema
                    )
                    ALTERACOES_POSSIVEIS.remove(sequencia_status)
                    PROBLEMAS_COMUNS.remove(problema)
                    DESCRICOES_POSSIVEIS.remove(descricao)

                    item = random.choice(itens)
                    itens.remove(item)

                    chamado = Chamado.objects.create(
                        titulo=problema,
                        descricao=descricao,
                        status=sequencia_status[-1],
                        cliente=cliente,
                        item=item,
                    )


                    if chamado.status != "1":
                        chamado.professor = professor
                        chamado.bolsistas.add(bolsista)
                        chamado.save()
                    chamados.append(chamado)

                # print("\n\n\n")
            self.stdout.write(self.style.SUCCESS("Chamados criados."))

            for i in range(len(ALTERACOES_POSSIVEIS)):
                chamado = chamados[i]
                for j in ALTERACOES_POSSIVEIS[i]:
                    Alteracao.objects.create(
                        autor=professores[0], status=j, chamado=chamado
                    )
            self.stdout.write(self.style.SUCCESS("Alterações criadas."))

            # ===============================================================================#

            # criação de mensagens
            for chamado in chamados:
                for i in range(random.randint(1, 5)):
                    if chamado.professor:
                        mensagem = Mensagem.objects.create(
                            autor=random.choice([chamado.professor, chamado.cliente]),
                            texto=f"Mensagem de teste-{i}",
                            chamado=chamado,
                        )
                        mensagens.append(mensagem)
            # DEBUG print(mensagens)

            self.stdout.write(self.style.SUCCESS("Mensagens criadas."))

            # ===============================================================================#

            # Criar avaliações
            for chamado in chamados:
                if chamado.status == 7 and random.choice(
                    [True, False]
                ):  # Nem todos os chamados terão avaliação
                    avaliacao = Avaliacao.objects.create(
                        texto="Avaliação",
                        nota=random.randint(1, 5),
                        chamado=chamado,
                    )
                    avaliacoes.append(avaliacao)
            # print(avaliacoes) # Debug

            self.stdout.write(self.style.SUCCESS("Avaliações criadas."))

            self.stdout.write(self.style.SUCCESS("Todos os modelos criados."))

        except Exception as e:
            self.stderr.write(
                self.style.ERROR(f"Erro ao popular banco de dados: {str(e)}")
            )
            pass