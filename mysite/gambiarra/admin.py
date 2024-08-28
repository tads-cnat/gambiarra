from django.contrib import admin

from .models import Chamado,Avaliacao, Mensagem, Alteracao, Item
# Register your models here.
admin.site.register(Chamado)
admin.site.register(Avaliacao)
admin.site.register(Mensagem)
admin.site.register(Alteracao)
admin.site.register(Item)