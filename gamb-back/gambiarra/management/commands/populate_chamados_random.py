from django.core.management.base import BaseCommand
from authentication.models import Usuario
from gambiarra.models import *
import random

PROBLEMAS_COMUNS = [
    "Meu computador quebrou",
    "Caiu água na CPU",
    "Tela azul do Windows",
    "O notebook não liga",
    "Preciso de um upgrade de memória",
    "O HD está fazendo barulho estranho",
    "Erro ao inicializar o sistema",
    "Wi-Fi não funciona",
    "Teclado parou de responder",
    "Monitor piscando sem parar",
    "O mouse parou de funcionar",
    "O computador está muito lento",
    "Não consigo instalar um programa",
    "A impressora não imprime",
    "O sistema operacional não inicia",
    "Erro de BIOS ao ligar o PC",
    "A bateria do notebook não carrega",
    "Superaquecimento do processador",
    "Os alto-falantes não estão emitindo som",
    "Problema com driver de vídeo",
    "A webcam não está funcionando",
    "Internet muito lenta",
    "Perdi acesso ao meu e-mail",
    "A senha do Wi-Fi não funciona",
    "Arquivo corrompido, não consigo abrir",
    "Meu pendrive não é reconhecido",
    "Erro ao conectar dispositivo USB",
    "A tela do monitor ficou preta",
    "O PC reinicia sozinho",
    "Meu antivírus detectou um vírus",
    "Erro ao atualizar o sistema",
    "Não consigo acessar sites seguros",
    "O microfone não está funcionando",
    "O fone de ouvido não está saindo som",
    "Problema com compartilhamento de arquivos",
    "Erro de conexão com a VPN",
    "Câmera de segurança offline",
    "Perdi acesso ao servidor da empresa",
    "Meu software de edição não responde",
    "O teclado está digitando caracteres errados",
    "Erro crítico do Windows",
    "Problema com autenticação em dois fatores",
    "O Excel não abre minhas planilhas",
    "Erro ao conectar ao banco de dados",
    "Falha ao enviar e-mails",
    "Meu celular não sincroniza com o PC",
    "O projetor não detecta entrada de vídeo",
    "Erro na conexão Bluetooth",
    "Computador desligando sozinho",
    "Falha ao conectar ao drive de rede",
    "Problema com impressão em PDF",
    "Meu sistema está com bugs",
    "Erro de script ao rodar um programa",
    "A internet cai constantemente",
    "Erro ao instalar drivers",
    "Meu backup não foi realizado",
    "A tela do celular quebrou",
    "Preciso recuperar um arquivo deletado",
    "Meu computador está travando",
    "Erro ao rodar um comando no terminal",
    "Meu sistema parou de funcionar",
    "Erro de compatibilidade com um software",
    "Preciso resetar a senha do sistema",
    "Não consigo acessar a rede da empresa",
    "Meu pc monhou",
]

ALTERACOES_POSSIVEIS = [
    [1],                   # Em análise
    [1, 2],                # Aceito
    [1, 2, 3],             # Em Diagnóstico
    [1, 2, 3, 5, 4],       # Equipamento Em Conserto
    [1, 2, 3, 5],          # Aguardando Peça
    [1, 2, 3, 5, 4, 6],    # Fechado Sem Resolução
    [1, 2, 3, 5, 4, 7],    # Resolvido
    [1, 8],                # Recusado
]


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
                professor = random.choice(professores)
                status = random.choice(STATUS_CHOICES)[0]  #JEITO CERTO DE GUARDAR O STATUS
                item = Item.objects.create(
                        modelo=f"Item-{i}", 
                        diagnostico="Diagnóstico genérico",
                    )

                sequencia_status = random.choice(ALTERACOES_POSSIVEIS)


                chamado = Chamado.objects.create(
                    titulo = random.choice(PROBLEMAS_COMUNS),
                    descricao = f"descrição {i}",
                    status=sequencia_status[-1],
                    cliente = random.choice(clientes),
                    item=item
                )

                if sequencia_status[-1] != 1:
                    chamado.professor = professor
                    chamado.save()

                    for status in sequencia_status:
                        Alteracao.objects.create(
                            autor=professor,  # Definindo um professor como autor da mudança
                            status=status,
                            chamado=chamado
                        )

                if sequencia_status[-1] == 7:  
                    Avaliacao.objects.create(
                        texto="Avaliação",
                        nota=random.randint(1, 5),
                        chamado=chamado,
                    )

                if chamado.status != '1':      
                    chamado.bolsistas.add(bolsista)

            self.stderr.write(self.style.SUCCESS(f"Adicionados {quantidade} chamados aleatórios"))
            

        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Erro ao popular banco de dados: {str(e)}"))
            pass