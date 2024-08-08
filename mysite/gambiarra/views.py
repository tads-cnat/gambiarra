from django.shortcuts import render

from .models import *

# Create your views here.
def index(request):
    
    return render(request, 'index.html')

def listar_chamados(request):
    chamados = Chamado.objects.all().prefetch_related('bolsistas')
    context = {'chamados':chamados}

    return render(request, 'gambiarra/listar-chamados.html', context)
