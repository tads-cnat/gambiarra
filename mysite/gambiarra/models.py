from django.db import models 
from django.utils import timezone
import uuid

CARACTERISTICA_CHOICE = [
    ("1", "Aluno"),
    ("2", "Externo"),
    ("3", "Servidor"),
]

STATUS_CHOICES = [
    ("1","Em Análise"),
    ("2","Aceito"),
    ("3","Em Diagnóstico"),
    ("4","Equipamento em conserto"),
    ("5","Aguardando peça"),
    ("6","Fechado sem resolução"),
    ("7","Resolvido"),
    ("8","Recusado"),
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
    titulo = models.CharField(max_length=50, default=0) 
    descricao = models.TextField(max_length=240, default=0)
    code = models.UUIDField(default=uuid.uuid4) #5 DÍGITOS
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE)
    bolsistas = models.ManyToManyField(Cliente)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES)

class Mensagem(models.Model):
    id = models.AutoField(primary_key=True)
    data_envio = models.DateTimeField('Data de publicação', default=timezone.now)
    id_autor = models.IntegerField(default=0)        # estratégia pra descobrir quem enviou(prof ou cliente)
    eh_professor = models.BooleanField(default=True) #
    texto = models.TextField(max_length=240, default=0)
    chamado = models.ForeignKey(Chamado, on_delete=models.CASCADE)

class Avaliacao(models.Model):
    id = models.AutoField(primary_key=True)
    texto = models.TextField(max_length=240, default=0)
    nota = models.IntegerField()
    chamado = models.ForeignKey(Chamado, on_delete=models.CASCADE)

class Alteracao(models.Model):
    id = models.AutoField(primary_key=True);
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE) #professor que modificou o status
    status = models.CharField(max_length=30, choices=STATUS_CHOICES)
    data_alteracao = models.DateTimeField('Data de modificação', default=timezone.now)
    chamado = models.ForeignKey(Chamado, on_delete=models.CASCADE)

class Item(models.Model):
    id = models.AutoField(primary_key=True);
    modelo = models.CharField(max_length=30, default=0)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE) 
    descricao = models.CharField(max_length=30, default=0)
    chamado = models.ForeignKey(Chamado, on_delete=models.CASCADE)