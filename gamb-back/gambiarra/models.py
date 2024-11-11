from django.db import models 
from django.utils import timezone
import uuid
from users.models import User
import os


#criar uma entidade para guardar esses status
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


class Bolsista(models.Model):
    nome = models.CharField(max_length=100, default="")
    matricula = models.CharField(max_length=20, default="")
    foto_perfil = models.ImageField(upload_to='Bolsista', null=True, blank=True, default='../media/Padrao/perfil_default.png')

    def __str__(self):
        return self.nome 
    
    def delete(self, *args, **kwargs):
        if self.foto_perfil:
            if os.path.isfile(self.foto_perfil.path):
                os.remove(self.foto_perfil.path)
        super().delete(*args, **kwargs)
    


class Item(models.Model):
    modelo = models.CharField(max_length=30, default="")
    problema = models.CharField(max_length=30, default="")


class Chamado(models.Model):
    titulo = models.CharField(max_length=50, default="") 
    descricao = models.TextField(max_length=240, default="")
    code = models.UUIDField(default=uuid.uuid4)
    professor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chamados_professor', null=True, blank=True)
    bolsistas = models.ManyToManyField(Bolsista, blank = True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="1")
    item = models.OneToOneField('Item', on_delete=models.CASCADE, null=True)
    cliente = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chamados_cliente', null=True, blank=True)
    
class Mensagem(models.Model):
    data_envio = models.DateTimeField('Data de publicação', default=timezone.now)
    autor = models.ForeignKey(User, on_delete=models.CASCADE, null=True)        
    texto = models.CharField(max_length=240, default="", blank=False)
    chamado = models.ForeignKey(Chamado, on_delete=models.CASCADE)

class Avaliacao(models.Model):
    texto = models.TextField(max_length=240, default="")
    nota = models.IntegerField()
    chamado = models.OneToOneField(Chamado, on_delete=models.CASCADE)

class Alteracao(models.Model):
    autor = models.ForeignKey(User, on_delete=models.CASCADE, null=True) 
    status = models.CharField(max_length=30, choices=STATUS_CHOICES)
    data_alteracao = models.DateTimeField('Data de modificação', default=timezone.now)
    chamado = models.ForeignKey(Chamado, on_delete=models.CASCADE)


