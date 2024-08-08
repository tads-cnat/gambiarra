from django.shortcuts import render

from .models import *

# Create your views here.
def index(request):
    
    return render(request, 'index.html')

def dashboard(request):
    chamados = Chamado.objects.all().prefetch_related('bolsistas')
    context = {'chamados':chamados}

    return render(request, 'dashboard/index.html', context)


def login(request):
    
    return render(request, 'Login/index.html')

   
