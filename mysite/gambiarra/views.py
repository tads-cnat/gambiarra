
from django.views import View
from django.views.generic.detail import DetailView
from django.urls import reverse
from django.views.generic import CreateView
from django.shortcuts import render, redirect, get_object_or_404
from .forms import *
from .models import *
from django.contrib.auth.decorators import login_required

class AvaliarForms(View):
    avaliar = AvaliacaoForm()

    def post(self, request, *args, **kwargs):
        chamado_id=kwargs['pk']
        form = AvaliacaoForm(request.POST)
        print(chamado_id)
        chamado = get_object_or_404(Chamado, pk=chamado_id)

        if form.is_valid():
            avaliacao = form.save(commit=False)  # Não salva ainda
            avaliacao.chamado = chamado          # Define o campo chamado
            avaliacao.save()                    # Salva o objeto Avaliacao
            return redirect('gambiarra:detalhes', pk=chamado_id)     

        else:
            return render({'avaliar': form})

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


    
class ChamadoDetailView(View):
    def get(self, request, *args, **kwargs):
        
        chamado_id = kwargs['pk']
        chamado = get_object_or_404(Chamado, pk=chamado_id)

        mensagens = Mensagem.objects.filter(chamado= chamado).order_by('data_envio')

        mensagem_form = MensagemForm()
        context = {'chamado':chamado, 'mensagens':mensagens, 'mensagem_form': mensagem_form}
        
        return render(request, 'dashboard/chamado/detalhes.html', context)
    
    def post(self, request, *args, **kwargs):
        mensagem_form = MensagemForm(request.POST)
        chamado_id = kwargs['pk']
        chamado = get_object_or_404(Chamado, pk=chamado_id)
        print(request.user)
        autor = request.user
        if mensagem_form.is_valid():
            mensagem = mensagem_form.save(commit=False)
            mensagem.chamado = chamado
            mensagem.autor = autor
            mensagem.save()
            return redirect('gambiarra:detalhes', chamado_id)


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
        avaliar = AvaliacaoForm()
        context = {'chamados':chamados, "avaliar":avaliar}
        return render(request, 'dashboard/index.html', context)
