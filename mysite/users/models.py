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
        default='1'  # Definido como 'Aluno' por padrão
    )

    def save(self, *args, **kwargs):
        # Chama o método save da classe pai (AbstractUser)
        super().save(*args, **kwargs)

        # Verifica se o usuário é um Professor
        if self.tipo_usuario == '4':  # '4' para Professor
            self.is_staff = True  # Permite acesso ao Django Admin
            self.is_superuser = True
            admin_group, created = Group.objects.get_or_create(name='Admin')
            self.groups.add(admin_group)  # Adiciona ao grupo Admin
        else:
            self.is_staff = False  # Outros usuários não podem acessar o Django Admin
            admin_group = Group.objects.filter(name='Admin').first()
            if admin_group:
                self.groups.remove(admin_group)  # Remove do grupo Admin, se presente
            self.is_superuser = False  # Garante que não é superusuário
        
        # Atualiza o usuário após definir as permissões
        super().save(update_fields=['is_staff', 'is_superuser'])

