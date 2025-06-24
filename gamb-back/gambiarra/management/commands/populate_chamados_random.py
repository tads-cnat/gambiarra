from django.core.management.base import BaseCommand
from authentication.models import Usuario
from gambiarra.models import *
import random

PROBLEMAS_COMUNS = [
    "Computador não liga",
    "Tela azul ao iniciar",
    "Wi-Fi desconectando",
    "Notebook superaquecendo",
    "Teclado não funciona",
    "Monitor piscando",
    "Erro de disco rígido",
    "Sistema travado na inicialização",
    "Impressora não responde",
    "Erro de autenticação",
    "Som não sai dos alto-falantes",
    "Webcam não reconhecida",
    "Perda de arquivos",
    "Programa fechando sozinho",
    "Atualização falhou",
    "Bateria não carrega",
    "Erro conexão com servidor",
    "PC reiniciando",
    "Driver de vídeo corrompido",
    "Mouse com comportamento errado",
    "Computador muito lento",
    "Erro ao acessar após atualização",
    "Aquecimento excessivo no processador",
    "Problema de sincronização no OneDrive",
    "Bluetooth não funciona",
    "Tela com cores distorcidas",
    "Eco em chamadas de vídeo",
    "Problema com dispositivos externos",
    "Erro ao instalar software",
    "Sistema travando ao abrir apps",
    "Rede intermitente",
    "Mensagens de erro de sistema",
    "Sistema não reconhece USB",
    "Falha ao imprimir (erro de driver)",
]

DIAGNOSTICOS_POSSIVEIS = [
    "Problema na fonte de alimentação.",
    "Atualização de driver necessária.",
    "Superaquecimento do processador.",
    "Setores defeituosos no HD.",
    "Sistema corrompido, reinstalado.",
    "Teclado desconectado, reconectado.",
    "Memória RAM com falhas, substituir.",
    "Configuração incorreta na BIOS.",
    "Conflito entre drivers de áudio e vídeo.",
    "Antivírus bloqueando sistema.",
    "Vírus detectado e removido.",
    "Conexão Wi-Fi instável por interferência.",
    "Erro de configuração de conta.",
    "Tela com mau contato, ajustada.",
    "Disco rígido com erros lógicos.",
    "Placa de vídeo falha, substituída.",
    "Incompatibilidade de hardware.",
    "Sistema sobrecarregado com processos.",
    "Falha no módulo de memória.",
    "Windows com arquivos corrompidos.",
    "Configuração de rede incorreta.",
    "Driver de rede reinstalado.",
    "Interferência eletromagnética no ambiente.",
    "Falta de espaço no HD, causando travamento.",
    "Erro na configuração de rede local.",
    "Problema de conexão com servidor de autenticação.",
]

ITEMS_POSSIVEIS = [
    "Notebook Dell Inspiron",
    "Computador HP Pavilion",
    "MacBook",
    "Monitor LG Ultrawide",
    "Teclado Mecânico",
    "Mouse Logitech MX Master",
    "Impressora Epson EcoTank",
    "HD Externo Seagate 1TB",
    "SSD NVMe Samsung 500GB",
    "Placa de Vídeo RTX 3060",
    "Roteador TP-Link AX1500",
    "Microfone Blue Yeti",
    "Headset Gamer Razer",
    "Tablet Samsung Galaxy",
    "Notebook Lenovo ThinkPad",
    "Computador Apple iMac",
    "Monitor Acer Predator",
    "Teclado Logitech G Pro",
    "Mouse Razer DeathAdder",
    "Impressora HP LaserJet",
    "Câmera Canon EOS 80D",
    "Fones de ouvido Sony",
    "SSD Kingston 1TB",
    "Placa-mãe ASUS ROG Strix",
    "Fonte Corsair 750W",
    "Cadeira Gamer DXRacer",
    "Webcam Logitech C920",
    "Microfone condensador",
]

AVALIACOES_POSSIVEIS = [
    "Ótimo atendimento, problema resolvido rapidamente.",
    "Equipe muito atenciosa, resolveram meu problema.",
    "O conserto demorou, mas ficou perfeito!",
    "Fiquei satisfeito com o serviço, tudo bem agora.",
    "O problema foi resolvido, mas precisei voltar.",
    "Atendimento excelente, explicaram tudo.",
    "Não resolveu completamente, ainda com dificuldades.",
    "Suporte rápido e eficiente, sem complicações.",
    "Infelizmente, o problema não foi totalmente resolvido.",
    "Serviço de excelente qualidade, mas com atraso.",
    "A equipe foi prestativa e resolutiva.",
    "Solução eficaz, sem mais problemas.",
    "Precisei de ajuda adicional, mas suporte útil.",
    "Problema resolvido, mas demorou um pouco.",
    "Satisfeito com o atendimento, apesar de contratempo.",
    "Atendimento rápido, mas solução durou pouco.",
    "Excelente suporte técnico, bem explicado.",
    "Problema resolvido com rapidez e eficiência.",
]

DESCRICOES_POSSIVEIS = [
    "{cliente} informou que {problema}.",
    "{cliente} entrou em contato relatando que {problema}.",
    "Chamado aberto por {cliente}: {problema}.",
    "De acordo com {cliente}, {problema}.",
    "Relato de {cliente}: {problema}.",
    "O cliente {cliente} reportou que {problema}.",
    "O cliente relatou o seguinte: {problema}.",
    "Solicitação aberta por {cliente} devido a {problema}.",
    "Segundo {cliente}, o problema foi: {problema}.",
    "Aparentemente, {problema} foi causado por {cliente}.",
    "O cliente {cliente} informou que está com {problema}.",
    "De acordo com {cliente}, o erro é: {problema}.",
    "Problema de {problema} reportado por {cliente}.",
]

ACESSORIOS_POSSIVEIS = [
    "Carregador original",
    "Mouse sem fio",
    "Cabo HDMI",
    "Dock station",
    "Fonte de alimentação extra",
    "Teclado externo",
    "Adaptador USB-C",
    "Headset com microfone",
    "Cabo de rede Ethernet",
    "Fone de ouvido Bluetooth",
    "Hub USB",
    "Carregador portátil",
    "Extensor de alcance Wi-Fi",
    "Suporte para notebook",
    "Luminária de mesa LED",
    "Cabo DisplayPort",
    "Adaptador de vídeo VGA",
    "Capa de proteção para notebook",
    "Repetidor de sinal Wi-Fi",
    "Placa de captura de vídeo",
    "Alto-falantes Bluetooth",
    "Mousepad grande",
    "Cabo de alimentação extra",
]


ALTERACOES_POSSIVEIS = [
    [1],  # Em análise
    [1, 2],  # Aceito
    [1, 2, 3],  # Em Diagnóstico
    [1, 2, 3, 5, 4],  # Equipamento Em Conserto
    [1, 2, 3, 5],  # Aguardando Peça
    [1, 2, 3, 5, 4, 6],  # Fechado Sem Resolução
    [1, 2, 3, 5, 4, 7],  # Resolvido
    [1, 8],  # Recusado
]


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("quantidade", type=int)
        parser.add_argument("deletar", type=bool)

    help = "Popula o banco de dados com os modelos de chamado"

    def handle(self, *args, **options):
        quantidade = options["quantidade"]
        deletar = options["deletar"]

        if deletar:
            chamados = Chamado.objects.all()
            qtd = len(chamados)
            chamados.delete()
            self.stderr.write(self.style.SUCCESS(f"Deletados todos os {qtd} chamados."))

        try:
            professores = Usuario.objects.filter(grupo__name="professor")
            bolsistas = Usuario.objects.filter(grupo__name="bolsista")
            clientes = Usuario.objects.filter(grupo__name="cliente")

            if not (professores.exists() and bolsistas.exists() and clientes.exists()):
                self.stderr.write(
                    self.style.ERROR(
                        "Rode o script 'python manage.py populate_user' antes"
                    )
                )
                return

            for i in range(quantidade):
                bolsista = random.choice(bolsistas)
                professor = random.choice(professores)
                cliente = random.choice(clientes)
                sequencia_status = random.choice(ALTERACOES_POSSIVEIS)
                problema = random.choice(PROBLEMAS_COMUNS)
                descricao = random.choice(DESCRICOES_POSSIVEIS).format(
                    cliente=cliente.username, problema=problema
                )

                item = Item.objects.create(
                    modelo=random.choice(ITEMS_POSSIVEIS),
                    diagnostico=random.choice(DIAGNOSTICOS_POSSIVEIS),
                )

                acessorios_nomes = []
                if random.choice([True, False]):
                    acessorios_nomes = random.sample(
                        ACESSORIOS_POSSIVEIS, k=random.randint(1, 2)
                    )
                    for acessorio_nome in acessorios_nomes:
                        Acessorio.objects.create(nome=acessorio_nome, item=item)

                chamado = Chamado.objects.create(
                    titulo=problema,
                    descricao=descricao,
                    status=sequencia_status[-1],
                    cliente=cliente,
                    item=item,
                )

                if sequencia_status[-1] != 1:  # Se o chamado passou de "Em análise"
                    chamado.professor = professor
                    chamado.save()

                    for status in sequencia_status:
                        Alteracao.objects.create(
                            autor=professor,  # Definindo um professor como autor da mudança
                            status=status,
                            chamado=chamado,
                        )

                if sequencia_status[-1] == 7:  # Se foi resolvido
                    Avaliacao.objects.create(
                        texto=random.choice(AVALIACOES_POSSIVEIS),
                        nota=random.randint(3, 5),  # Avaliações mais positivas
                        chamado=chamado,
                    )

                if chamado.status != "1":  # Se saiu de "Em análise"
                    chamado.bolsistas.add(bolsista)

            self.stdout.write(self.style.SUCCESS(f"Criados chamados novos"))

        except Exception as e:
            self.stderr.write(
                self.style.ERROR(f"Erro ao popular banco de dados: {str(e)}")
            )
