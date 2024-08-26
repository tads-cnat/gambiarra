
from django.views import View
from django.views.generic.detail import DetailView
from django.shortcuts import render, redirect, get_object_or_404
from .forms import *
from .models import *
from django.contrib.auth.decorators import login_required


def encerrar_chamado(request, pk,):
    chamado = get_object_or_404(Chamado, pk=pk)
    chamado.status = '7'
    chamado.save()
    return redirect('')
    
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
        
@login_required
def dashboard(request):
    chamados = Chamado.objects.all().prefetch_related('bolsistas')
    context = {'chamados':chamados}

    return render(request, 'dashboard/index.html', context)

