
from django.http import  HttpResponseRedirect
from django.urls import reverse
from django.views import View
from django.views.generic.detail import DetailView

from django.shortcuts import render, redirect, get_object_or_404
from .forms import ChamadoForm
from .models import Chamado



    
class ChamadoDetailView(DetailView):
    model = Chamado
    template_name = 'dashboard/chamado/detalhes.html'  

class ChamadoForms(View):
    
    def get(self, request):
        form = ChamadoForm()
        return render(request, 'dashboard/chamado/form.html', {'form': form})

    def post(self, request):
        form = ChamadoForm(request.POST)
        if form.is_valid():
            chamado = form.save()
            return redirect('detalhes', pk=chamado.pk) 
        return render(request, 'dashboard/chamado/form.html', {'form': form})    
def index(request):
    return render(request, 'index.html')
def dashboard(request):
    chamados = Chamado.objects.all().prefetch_related('bolsistas')
    context = {'chamados':chamados}

    return render(request, 'dashboard/index.html', context)


def login(request):
    
    return render(request, 'Login/index.html')
