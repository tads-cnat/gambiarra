from django.db import models
from django.utils import timezone
import uuid
from django.core.exceptions import ValidationError
from authentication.models import Usuario
import os



# criar uma entidade para guardar esses status
STATUS_CHOICES = [
    ("1", "Em Análise"),
    ("2", "Aceito"),
    ("3", "Em Diagnóstico"),
    ("4", "Equipamento Em Conserto"),
    ("5", "Aguardando Peça"),
    ("6", "Fechado Sem Resolução"),
    ("7", "Resolvido"),
    ("8", "Recusado"),
    ("9", "Arquivado"),
]


class Item(models.Model):
    modelo = models.CharField(max_length=30, default="")
    diagnostico = models.CharField(max_length=200, default="")

    class Meta:
        verbose_name_plural = "Itens"

    def __str__(self):
        return f"{self.modelo} - {self.diagnostico}"

    def clean(self):
        # Custom validation for Item model
        if len(self.modelo) > 30:  # <--- This check is for 30
            raise ValidationError("O modelo pode conter no máximo 30 caracteres")


class Chamado(models.Model):
    titulo = models.CharField(max_length=50, default="")
    descricao = models.TextField(max_length=255, default="")
    code = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True
    )  # Added editable=False and unique=True
    professor = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        related_name="chamados_professor",
        null=True,
        blank=True,
    )
    bolsistas = models.ManyToManyField(
        Usuario, related_name="chamados_bolsista", blank=True
    )
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="1")
    item = models.OneToOneField("Item", on_delete=models.CASCADE, null=True)
    cliente = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        related_name="chamados_cliente",
        null=True,
        blank=True,
    )
    acessorio = models.CharField(
        max_length=255, blank=True, null=True
    )  # Added acessorio field

    def __str__(self):
        return f"Chamado {self.titulo} - {self.status}"

    def clean(self):
        # Model-level validation for Chamado
        super().clean()  # Call the parent clean method

        if not self.titulo:
            raise ValidationError({"titulo": "O título é obrigatório"})
        if len(self.titulo) > 50:
            raise ValidationError(
                {"titulo": "O título pode conter no máximo 50 caracteres"}
            )

        if not self.descricao:
            raise ValidationError({"descricao": "A descrição é obrigatória"})
        if (
            len(self.descricao) > 240
        ):  # Note: TextField max_length is usually for forms, not DB.
            # For DB constraint, consider a CharField or
            # implement custom DB validation or pre_save signal.
            # This ValidationError still works for model.clean().
            raise ValidationError(
                {"descricao": "A descrição pode conter no máximo 255 caracteres"}
            )

        if not self.item:
            raise ValidationError({"item": "O modelo é obrigatório"})

        if self.acessorio and len(self.acessorio) > 255:
            raise ValidationError(
                {"acessorio": "O acessório pode conter no máximo 255 caracteres"}
            )

    def save(self, *args, **kwargs):
        # Call clean() before saving to ensure validation runs
        self.full_clean()  # This calls clean_fields(), clean(), and validate_unique()
        super().save(*args, **kwargs)


class Mensagem(models.Model):
    data_envio = models.DateTimeField("Data de publicação", default=timezone.now)
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
    data_alteracao = models.DateTimeField("Data de modificação", default=timezone.now)
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
