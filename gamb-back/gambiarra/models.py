from django.db import models 
from django.utils import timezone
import uuid
from authentication.models import Usuario
import os


#criar uma entidade para guardar esses status
STATUS_CHOICES = [
    ("1","Em Análise"),
    ("2","Aceito"),
    ("3","Em Diagnóstico"),
    ("4","Equipamento Em Conserto"),
    ("5","Aguardando Peça"),
    ("6","Fechado Sem Resolução"),
    ("7","Resolvido"),
    ("8","Recusado"),
    ("9","Arquivado"),
] 
 
 
class Item(models.Model):
    modelo = models.CharField(max_length=30, default="")
    diagnostico = models.CharField(max_length=200, default="")
    class Meta:
        verbose_name_plural = "Itens"
    def __str__(self):
        return f"{self.modelo} - {self.diagnostico}"


class Chamado(models.Model):
    titulo = models.CharField(max_length=50, default="") 
    descricao = models.TextField(max_length=240, default="")
    code = models.UUIDField(default=uuid.uuid4)
    professor = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='chamados_professor', null=True, blank=True)
    bolsistas = models.ManyToManyField(Usuario, related_name='chamados_bolsista', blank=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="1")
    item = models.OneToOneField('Item', on_delete=models.CASCADE, null=True)
    cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='chamados_cliente', null=True, blank=True)

    def __str__(self):
        return f"Chamado {self.titulo} - {self.status}"


class Mensagem(models.Model):
    data_envio = models.DateTimeField('Data de publicação', default=timezone.now)
    autor = models.ForeignKey(Usuario, on_delete=models.CASCADE, null=True)        
    texto = models.CharField(max_length=240, default="", blank=False)
    chamado = models.ForeignKey(Chamado, on_delete=models.CASCADE)
    class Meta:
        verbose_name_plural = "Mensagens"

    def __str__(self):
        return f"Mensagem de {self.autor} - {self.texto[:30]}..."


class Avaliacao(models.Model):
    texto = models.TextField(max_length=240, default="")
    nota = models.IntegerField()
    chamado = models.OneToOneField(Chamado, on_delete=models.CASCADE)
    class Meta:
        verbose_name_plural = "Avaliações"

    def __str__(self):
        return f"Avaliação {self.nota} - {self.texto[:30]}..."


class Alteracao(models.Model):
    autor = models.ForeignKey(Usuario, on_delete=models.CASCADE, null=True) 
    status = models.CharField(max_length=30, choices=STATUS_CHOICES)
    data_alteracao = models.DateTimeField('Data de modificação', default=timezone.now)
    chamado = models.ForeignKey(Chamado, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Alterações"

    def __str__(self):
        return f"Alteração {self.status} - {self.data_alteracao}"


class Acessorio(models.Model):
    nome = models.CharField(max_length=50, default="")
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    class Meta:
        verbose_name_plural = "Acessórios"

    def __str__(self):
        return f"Acessório: {self.nome} ({self.item.modelo})"
