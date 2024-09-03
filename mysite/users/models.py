from django.contrib.auth.models import AbstractUser, Group
from django.db import models


class User(AbstractUser):
    cpf = models.CharField(max_length=11, unique=True, null=True)
    matricula = models.CharField(max_length=20, unique=True, null=True) 
    telefone = models.CharField(max_length=15, blank=True, null=True)

    tipo_usuario = models.CharField(
        max_length=20,
        choices=[
            ('1', 'Aluno'),
            ('2', 'Externo'),
            ('3', 'Servidor'),
            ('4', 'Professor'),
        ],
        default='4'  
    )

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        if self.tipo_usuario == '4': 
            self.is_staff = True 
            self.is_superuser = True
            admin_group, created = Group.objects.get_or_create(name='Admin')
            self.groups.add(admin_group) 
        else:
            self.is_staff = False 
            admin_group = Group.objects.filter(name='Admin').first()
            if admin_group:
                self.groups.remove(admin_group) 
            self.is_superuser = False
        
       
        super().save(update_fields=['is_staff', 'is_superuser'])

    def __str__(self):
        return f'{self.username} - {self.get_tipo_usuario_display()}'