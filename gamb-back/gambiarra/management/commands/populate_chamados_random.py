from django.core.management.base import BaseCommand
from authentication.models import Usuario
from gambiarra.models import *
import random

PROBLEMAS_COMUNS = [
    "Computador não liga",
    "Tela azul ao iniciar o sistema",
    "Wi-Fi desconectando sozinho",
    "Notebook superaquecendo",
    "Teclado parou de funcionar",
    "Monitor piscando constantemente",
    "Erro de disco rígido detectado",
    "Sistema operacional travado na inicialização",
    "Impressora não responde",
    "Erro de autenticação na rede",
    "Alto-falantes não estão emitindo som",
    "Webcam não reconhecida pelo sistema",
    "Perda de arquivos importantes",
    "Programa fechando sozinho",
    "Atualização do sistema falhou",
    "Bateria do notebook não carrega",
    "Erro de conexão com servidor da empresa",
    "PC reiniciando aleatoriamente",
    "Driver de vídeo corrompido",
    "Mouse com comportamento errático",
    "Computador com desempenho muito lento",
    "Erro ao acessar aplicativos após atualização",
    "Aquecimento excessivo no processador",
    "Problemas de sincronização no OneDrive",
    "Bluetooth não está funcionando",
    "Tela com cores distorcidas",
    "Som com eco durante chamadas de vídeo",
    "Problema de conectividade com dispositivos externos",
    "Erro ao tentar instalar software",
    "Sistema travando ao abrir vários aplicativos",
    "Rede de internet intermitente",
    "Exibição de mensagens de erro de sistema",
    "Sistema não reconhece dispositivo USB conectado",
    "Falha ao imprimir devido a erro de driver",
]


DIAGNOSTICOS_POSSIVEIS = [
    "Foi identificado um problema na fonte de alimentação.",
    "Atualização de driver necessária para resolver o erro.",
    "O problema foi causado por superaquecimento do processador.",
    "Setores defeituosos no HD foram detectados.",
    "O sistema operacional estava corrompido e precisou ser reinstalado.",
    "O teclado estava desconectado internamente, foi reconectado e testado.",
    "A memória RAM apresentou falhas e precisará ser substituída.",
    "Configuração incorreta na BIOS estava impedindo a inicialização.",
    "Havia um conflito entre drivers de áudio e vídeo.",
    "O antivírus estava bloqueando a funcionalidade do sistema.",
    "Foi detectado um vírus, e o sistema foi limpo e restaurado.",
    "A conexão Wi-Fi estava instável devido a interferência de sinal.",
    "Houve um erro de configuração na conta do usuário.",
    "A tela estava com mau contato e precisou ser ajustada.",
    "O disco rígido estava com erros lógicos que causaram a falha.",
    "A placa de vídeo estava com falha e precisou ser substituída.",
    "Problema causado por incompatibilidade de hardware.",
    "O sistema estava sobrecarregado com processos em segundo plano.",
    "Falha no módulo de memória causou a lentidão do sistema.",
    "O Windows estava com arquivos de sistema corrompidos.",
    "Configuração incorreta de rede impediu a conexão com servidores.",
    "O problema foi resolvido após a reinstalação do driver de rede.",
    "O problema foi causado por interferência eletromagnética no ambiente.",
    "Falta de espaço no disco rígido estava causando travamentos.",
    "Foi identificado um erro na configuração de rede local.",
    "Problema de conexão com o servidor de autenticação.",
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
    "Equipe muito atenciosa, resolveram meu problema sem complicações.",
    "O conserto demorou um pouco, mas ficou perfeito!",
    "Fiquei satisfeito com o serviço, tudo funcionando bem agora.",
    "O problema foi resolvido, mas precisei voltar duas vezes.",
    "Atendimento excelente, explicaram tudo direitinho.",
    "Não resolveu completamente, ainda estou com dificuldades.",
    "O suporte foi rápido e eficiente, sem grandes complicações.",
    "Infelizmente, o problema não foi totalmente solucionado.",
    "Serviço de excelente qualidade, mas houve um pequeno atraso.",
    "A equipe foi muito prestativa e resolutiva.",
    "A solução foi muito eficaz, sem mais problemas até agora.",
    "Precisei de ajuda adicional, mas o suporte foi útil.",
    "O problema foi resolvido de forma satisfatória, mas demorou um pouco.",
    "Satisfeito com o atendimento, apesar de um pequeno contratempo.",
    "Atendimento rápido, mas a solução não durou muito.",
    "Excelente suporte técnico, muito bem explicado.",
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
    "Solicitação aberta por {cliente} devido ao problema: {problema}.",
    "Segundo {cliente}, o problema descrito foi: {problema}.",
    "Aparentemente, o problema de {problema} foi causado por {cliente}.",
    "O cliente {cliente} informou que está enfrentando {problema}.",
    "De acordo com a descrição de {cliente}, o erro é: {problema}.",
    "O problema de {problema} foi reportado por {cliente}.",
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
                    self.style.ERROR("Rode o script 'python manage.py populate_user' antes")
                )
                return

            for i in range(quantidade):
                bolsista = random.choice(bolsistas)
                professor = random.choice(professores)
                cliente = random.choice(clientes)
                sequencia_status = random.choice(ALTERACOES_POSSIVEIS)
                problema = random.choice(PROBLEMAS_COMUNS)
                descricao = random.choice(DESCRICOES_POSSIVEIS).format(cliente=cliente.username, problema=problema)

                item = Item.objects.create(
                    modelo=random.choice(ITEMS_POSSIVEIS),
                    diagnostico=random.choice(DIAGNOSTICOS_POSSIVEIS),
                )

                acessorios_nomes = []
                if random.choice([True, False]):
                    acessorios_nomes = random.sample(ACESSORIOS_POSSIVEIS, k=random.randint(1, 2))
                    for acessorio_nome in acessorios_nomes:
                        Acessorio.objects.create(nome=acessorio_nome, item=item)

                chamado = Chamado.objects.create(
                    titulo=problema,
                    descricao = descricao,
                    status=sequencia_status[-1],
                    cliente=cliente,
                    item=item
                )

                if sequencia_status[-1] != 1:  # Se o chamado passou de "Em análise"
                    chamado.professor = professor
                    chamado.save()

                    for status in sequencia_status:
                        Alteracao.objects.create(
                            autor=professor,  # Definindo um professor como autor da mudança
                            status=status,
                            chamado=chamado
                        )

                if sequencia_status[-1] == 7:  # Se foi resolvido
                    Avaliacao.objects.create(
                        texto=random.choice(AVALIACOES_POSSIVEIS),
                        nota=random.randint(3, 5),  # Avaliações mais positivas
                        chamado=chamado,
                    )

                if chamado.status != '1':  # Se saiu de "Em análise"
                    chamado.bolsistas.add(bolsista)
                
            self.stdout.write(self.style.SUCCESS(f"Criados chamados novos"))

        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Erro ao popular banco de dados: {str(e)}"))
