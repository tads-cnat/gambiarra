from django.db import models 
from django.utils import timezone
import uuid

CARACTERISTICA_CHOICE = [
    ("AL", "Aluno"),
    ("EX", "Externo"),
    ("SE", "Servidor"),
]

STATUS_CHOICES = [
    ("Em Análise", " O problema está sendo avaliado. "),
    ("Aceito", "Um professor aceitou o seu chamado, traga seu equipamento!"),
    ("Em Diagnóstico", "A causa raiz está sendo identificada."),
    ("Equipamento em conserto", "O reparo está em andamento."),
    ("Aguardando peça", "Estamos esperando por uma peça de reposição."),
    ("Fechado sem resolução", "O problema foi encerrado sem solução."),
    ("Resolvido", "O problema foi corrigido com sucesso."),
    ("Recusado", "O chamado foi recusado."),
] 

class Professor(models.Model):
    id = models.AutoField(primary_key=True)
    cpf = models.CharField(max_length=11, default=0)
    matricula = models.CharField(max_length=20, default=0)
    nome = models.CharField(max_length=30, default=0)
    email = models.EmailField(max_length=30, default=0)
    senha = models.CharField(max_length=30, default=0)
    telefone = models.CharField(max_length=30, default=0)
    #foto_perfil = models.ImageField(upload_to='media', default=0)

class Cliente(models.Model):
    id = models.AutoField(primary_key=True)
    cpf = models.CharField(max_length=11, default=0)
    matricula = models.CharField(max_length=20, default=0)
    nome = models.CharField(max_length=30, default=0)
    email = models.EmailField(max_length=30, default=0)
    senha = models.CharField(max_length=30, default=0)
    telefone = models.CharField(max_length=15, default=0)
    #foto_perfil = models.ImageField(upload_to='media', default=0)
    caracteristica = models.CharField(max_length=2, choices=CARACTERISTICA_CHOICE)

class Chamado(models.Model):
    id = models.AutoField(primary_key=True)
    code = models.UUIDField(default=uuid.uuid4)
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE)
    bolsistas = models.ManyToManyField(Cliente)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES)

class Mensagem(models.Model):
    id = models.AutoField(primary_key=True)
    data_envio = models.DateTimeField('Data de publicação', default=timezone.now)
    autor = models.ForeignKey(Cliente, on_delete=models.CASCADE)  ##Descobrir como atribuir Cliente ou Professor
    texto = models.TextField(max_length=240, default=0)
    chamado = models.ForeignKey(Chamado, on_delete=models.CASCADE)

class Avaliacao(models.Model):
    id = models.AutoField(primary_key=True)
    texto = models.TextField(max_length=240, default=0)
    nota = models.DecimalField(max_digits=2, decimal_places=0, default=0)
    id_chamado = models.ForeignKey(Chamado, on_delete=models.CASCADE)
