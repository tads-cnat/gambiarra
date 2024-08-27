
from django.views import View
from django.views.generic.detail import DetailView
from django.shortcuts import render, redirect, get_object_or_404
from .forms import *
from .models import *
from django.contrib.auth.decorators import login_required

class EncerrarView(View):
    def get(self, request, *args, **kwargs):
        chamado_id=kwargs['pk']
        chamado = get_object_or_404(Chamado, pk=chamado_id)
        return render(request, 'dashboard/chamado/encerrar.html', {'chamado': chamado, 'titulo': "Encerrar chamado"})

    def post(self, request, *args, **kwargs):
        chamado_id=kwargs['pk']
        chamado = get_object_or_404(Chamado, pk=chamado_id)
        chamado.status = '7'
        chamado.save()
        context = {'chamado': chamado}
        return render(request, 'dashboard/chamado/detalhes.html', context)
    
class AvaliacaoForm(View):
    def criar_avaliacao(request):
        if request.method == 'POST':
            form = AvaliacaoForm(request.POST)
            if form.is_valid():
                form.save()
                return redirect('dashboard') 
        else:
            form = AvaliacaoForm()

        return render(request, 'avaliacao_form.html', {'form': form})
    
class ChamadoDetailView(DetailView):
    model = Chamado
    template_name = 'dashboard/chamado/detalhes.html' 
    titulo = "Detalhes"

class ChamadoForms(View):
    chamado = ChamadoItemForm()

    def get(self, request):
        return render(request, 'dashboard/chamado/registrar.html', {'chamado': self.chamado, 'titulo': "Abrir chamado"})

    def post(self, request):

        form = ChamadoItemForm(request.POST)

        if form.is_valid():
            chamado = form.save(commit=False)
            chamado.cliente = request.user  # Associa o cliente ao chamado

            modelo = form.cleaned_data['modelo']
            problema_item = form.cleaned_data['problema']

            item = Item.objects.create(
                modelo=modelo,
                problema=problema_item
            )
            item.save()
            
            chamado.item = item  # Assign the Item instance, not the pk
            chamado.save()
            print(chamado.pk)
            return redirect('gambiarra:detalhes', pk=chamado.pk)
        else:
            return render(request, 'dashboard/chamado/registar.html', {'chamado': form, 'titulo': "Abrir chamado"})   
        
class DashboardView(View):
    def get(self, request, *args, **kwargs):
        chamados = Chamado.objects.all().prefetch_related('bolsistas')
        context = {'chamados':chamados}
        return render(request, 'dashboard/index.html', context)
