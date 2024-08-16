
from django.http import  HttpResponseRedirect
from django.urls import reverse
from django.views import View
from django.views.generic.detail import DetailView
from django.shortcuts import render, redirect, get_object_or_404
from .forms import *
from .models import *



    
class ChamadoDetailView(DetailView):
    model = Chamado
    template_name = 'dashboard/chamado/detalhes.html'  


class ChamadoForms(View):
    
    def get(self, request):
        chamado = ChamadoItemForm()
        return render(request, 'dashboard/chamado/registar.html', {'chamado': chamado})

    def post(self, request):
        form = ChamadoItemForm(request.POST)
        if form.is_valid():
            # Criação do objeto Item
            item = Item()
            item.modelo = form.cleaned_data['modelo']
            item.descricao = form.cleaned_data['descricao']
            item.cliente = request.user.cliente  # Associa ao cliente logado (supondo um relacionamento com o cliente)
            item.save()

            # Criação do objeto Chamado
            chamado = form.save(commit=False)
            chamado.item = item  
            chamado.save()

            return redirect('detalhes', chamado.pk)
        

def index(request):
    return render(request, 'index.html')
def dashboard(request):
    chamados = Chamado.objects.all().prefetch_related('bolsistas')
    context = {'chamados':chamados}

    return render(request, 'dashboard/index.html', context)


def login(request):
    
    return render(request, 'Login/index.html')
