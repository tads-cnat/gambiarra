from django.db import models
from django.contrib.auth.models import AbstractUser, Group

class Usuario(AbstractUser):
    
    grupo = models.ForeignKey(
        to=Group,
        on_delete=models.DO_NOTHING,
        related_name="usuarios",
        blank=True,
        null=True,
    )