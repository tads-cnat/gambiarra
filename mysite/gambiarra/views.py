
from django.views import View
from django.views.generic.detail import DetailView
from django.shortcuts import render, redirect, get_object_or_404
from .forms import *
from .models import *
from django.contrib.auth.decorators import login_required

class ListarBolsistas(View):
    def get(self, request, *args, **kwargs):
        bolsistas = Bolsista.objects.all()
        return render(request, 'dashboard/bolsista/listar_bolsistas.html', {'bolsistas': bolsistas})

class CriarBolsista(View):
    def get(self, request, *args, **kwargs):
        form = BolsistaForm()
        return render(request, 'dashboard/bolsista/registrar_bolsista.html', {'bolsista': form})

    def post(self, request, *args, **kwargs):
        form = BolsistaForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('gambiarra:listar-bolsistas')
        return render(request, 'dashboard/bolsista/registrar_bolsista.html', {'bolsista': form})

class EditarBolsista(View):
    def get(self, request, pk, *args, **kwargs):
        bolsista = get_object_or_404(Bolsista, pk=pk)
        form = BolsistaForm(instance=bolsista)
        return render(request, 'dashboard/bolsista/registrar_bolsista.html', {'bolsista': form})

    def post(self, request, pk, *args, **kwargs):
        bolsista = get_object_or_404(Bolsista, pk=pk)
        form = BolsistaForm(request.POST, request.FILES, instance=bolsista)
        if form.is_valid():
            form.save()
            return redirect('gambiarra:listar-bolsistas')
        return render(request, 'dashboard/bolsista/registrar_bolsista.html', {'bolsista': form})

class DeletarBolsista(View):
    def get(self, request, pk, *args, **kwargs):
        bolsista = get_object_or_404(Bolsista, pk=pk)
        return render(request, 'dashboard/bolsista/deletar_bolsista.html', {'bolsista': bolsista})

    def post(self, request, pk, *args, **kwargs):
        bolsista = get_object_or_404(Bolsista, pk=pk)
        bolsista.delete()
        return redirect('gambiarra:listar-bolsistas')

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

class AdicionarBolsistas(View):
    def get(self, request, pk):
        chamado = get_object_or_404(Chamado, pk=pk)
        form = AdicionarBolsistasForm(instance=chamado)
        return render(request, 'dashboard/chamado/adicionar_bolsistas.html', {'form': form, 'chamado': chamado, 'titulo': "Adicionar Bolsistas"})

    def post(self, request, pk):
        chamado = get_object_or_404(Chamado, pk=pk)
        form = AdicionarBolsistasForm(request.POST, instance=chamado)
        if form.is_valid():
            chamado = form.save(commit=False)
            chamado.save()  

            # Salva relacionamentos many-to-many 
            form.save_m2m()

            return redirect('gambiarra:detalhes', pk=chamado.pk)
        return render(request, 'dashboard/chamado/adicionar_bolsistas.html', {'form': form, 'chamado': chamado, 'titulo': "Adicionar Bolsistas"})

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

            form.save_m2m() 

            print(chamado.pk)
            return redirect('gambiarra:detalhes', pk=chamado.pk)
        else:
            return render(request, 'dashboard/chamado/registar.html', {'chamado': form, 'titulo': "Abrir chamado"})   
        
class DashboardView(View):
    def get(self, request, *args, **kwargs):
        chamados = Chamado.objects.all().prefetch_related('bolsistas')
        context = {'chamados':chamados}
        return render(request, 'dashboard/index.html', context)
