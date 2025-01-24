from django.core.management.base import BaseCommand
from authentication.models import Usuario
from gambiarra.models import *
import random

class Command(BaseCommand):
    help = "Popula o banco de dados com os modelos de chamado, itens, acessórios, avaliações, mensagens, e alterações de status"
    def handle(self, *args, **kwargs):
        escolha = 1
        bypass = False #para popular o banco se já houver objetos
        try:
            if (Item.objects.all() or 
                Chamado.objects.all() or 
                Mensagem.objects.all() or 
                Avaliacao.objects.all()) and (not bypass):
                #Se houver objetos no banco, não popular
                #A não ser que bypass for True
                
                self.stderr.write(
                    self.style.ERROR("Já tem objetos no banco")
                )
                return 
            
            #Criando listas de todos os models para facilitar debug. 
            itens = []
            #acessorios = [] #debug
            chamados = []
            mensagens = []
            avaliacoes = []




            professores = Usuario.objects.filter(grupo__name="professor")
            bolsistas = Usuario.objects.filter(grupo__name="bolsista")
            clientes = Usuario.objects.filter(grupo__name="cliente")


            #print("DEBUG", professor, bolsista, cliente, sep="\n")

            if not(professores.exists() and bolsistas.exists() and clientes.exists()):
                self.stderr.write(
                    self.style.ERROR("Rode o script 'python manage.py populate_user' antes")
                )
                return
            
#===============================================================================#

            #criação de itens
            for i in range(10):
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
                    #acessorios.append(acessorio) #debug
                itens.append(item)
            
            #print("DEBUG", itens, acessorios, sep="\n\n")

            self.stdout.write(self.style.SUCCESS("Itens e acessórios criados."))

#===============================================================================#


            #criação de chamados, um para cada status
            for i in STATUS_CHOICES:
                item = random.choice(itens)
                itens.remove(item)


                # print(f'''
                #     titulo = f"{i[1]}",
                #     descricao = f"{i[1]}",
                #     professor = {professores[0]},
                #     cliente = {random.choice(clientes)},
                #     status = {i[1]},
                #     item = {item},
                #     '''
                # ) DEBUG
                
                chamado = Chamado.objects.create(
                    titulo = f"chamado {i[1]}",
                    descricao = f"{i[1]}",
                    professor = professores[escolha],
                    cliente = random.choice(clientes),
                    status = i[1],
                    item = item,
                )
                chamado.bolsistas.add(bolsistas[escolha])
                chamados.append(chamado)
                #print("\n\n\n")
            self.stdout.write(self.style.SUCCESS("Chamados criados."))
            
#===============================================================================#

            #criação de mensagens
            for chamado in chamados:
                for i in range(random.randint(1, 5)):
                    # DEBUG print(chamado.professor, chamado.cliente)
                    mensagem = Mensagem.objects.create(
                        autor=random.choice([chamado.professor, chamado.cliente]),
                        texto=f"Mensagem de teste-{i}",
                        chamado=chamado,
                    )
                    mensagens.append(mensagem)
            #DEBUG print(mensagens)

            self.stdout.write(self.style.SUCCESS("Mensagens criadas."))


#===============================================================================#

            # Criar avaliações
            for chamado in chamados:
                if random.choice([True, False]):  # Nem todos os chamados terão avaliação
                    avaliacao = Avaliacao.objects.create(
                        texto="Avaliação",
                        nota=random.randint(1, 5),
                        chamado=chamado,
                    )
                    avaliacoes.append(avaliacao)
            #print(avaliacoes) # Debug


            self.stdout.write(self.style.SUCCESS("Avaliações criadas."))

            self.stdout.write(self.style.SUCCESS("Todos os modelos criados."))

        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Erro ao popular banco de dados: {str(e)}"))
            pass
