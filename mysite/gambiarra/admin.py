from django.contrib import admin

from .models import Chamado, Cliente, Professor, Avaliacao, Mensagem
# Register your models here.
admin.site.register(Chamado)
admin.site.register(Cliente)
admin.site.register(Professor)
admin.site.register(Avaliacao)
admin.site.register(Mensagem)