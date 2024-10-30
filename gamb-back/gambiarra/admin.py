from django.contrib import admin

from .models import Chamado,Avaliacao, Mensagem, Alteracao, Item, Bolsista
# Register your models here.
admin.site.register(Chamado)
admin.site.register(Bolsista)
admin.site.register(Avaliacao)
admin.site.register(Mensagem)
admin.site.register(Alteracao)
admin.site.register(Item)