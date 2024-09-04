
from django.views import View
from django.views.generic.detail import DetailView
from django.urls import reverse
from django.views.generic import CreateView
from django.shortcuts import render, redirect, get_object_or_404
from .forms import *
from .models import *
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib import messages


@method_decorator(login_required, name='dispatch')
class ListarBolsistas(View):
    def get(self, request, *args, **kwargs):
        bolsistas = Bolsista.objects.all()
        return render(request, 'dashboard/bolsista/listar_bolsistas.html', {'bolsistas': bolsistas})

@method_decorator(login_required, name='dispatch')
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

@method_decorator(login_required, name='dispatch')
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

@method_decorator(login_required, name='dispatch')
class DeletarBolsista(View):
    def get(self, request, pk, *args, **kwargs):
        bolsista = get_object_or_404(Bolsista, pk=pk)
        return render(request, 'dashboard/bolsista/deletar_bolsista.html', {'bolsista': bolsista})

    def post(self, request, pk, *args, **kwargs):
        bolsista = get_object_or_404(Bolsista, pk=pk)
        bolsista.delete()
        return redirect('gambiarra:listar-bolsistas')

@method_decorator(login_required, name='dispatch')
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

@method_decorator(login_required, name='dispatch')
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
        alt = Alteracao()
        alt.chamado = chamado
        alt.autor = request.user
        alt.status = '7'
        alt.save()
        return redirect("gambiarra:detalhes", pk=chamado_id)

@method_decorator(login_required, name='dispatch')
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

@method_decorator(login_required, name='dispatch')  
class ChamadoDetailView(View):
    def get(self, request, *args, **kwargs):

        chamado_id = kwargs['pk']
        chamado = get_object_or_404(Chamado, pk=chamado_id)
        alteracoes = Alteracao.objects.filter(chamado=chamado.pk)  # Corrigido para usar filter

        mensagens = Mensagem.objects.filter(chamado=chamado).order_by('data_envio')

        mensagem_form = MensagemForm()
        context = {'chamado':chamado, 'mensagens':mensagens, 'mensagem_form': mensagem_form, 'alteracoes': alteracoes}
        
        return render(request, 'dashboard/chamado/detalhes.html', context)
    
    def post(self, request, *args, **kwargs):
        mensagem_form = MensagemForm(request.POST)
        chamado_id = kwargs['pk']
        chamado = get_object_or_404(Chamado, pk=chamado_id)
        autor = request.user
        texto = request.POST.get('texto')
        print(texto)
        if texto.strip():
            if mensagem_form.is_valid():
                mensagem = mensagem_form.save(commit=False)
                mensagem.chamado = chamado
                mensagem.autor = autor
                if(mensagem.texto == ""): return redirect('gambiarra:detalhes', chamado_id)
                mensagem.save()
                return redirect('gambiarra:detalhes', chamado_id)

@method_decorator(login_required, name='dispatch')    
def aceitar(request, *args, **kwargs):
        chamado_id = kwargs['pk']
        chamado = get_object_or_404(Chamado, pk=chamado_id)
        chamado.professor = request.user
        chamado.status = '2'
        chamado.save()
        alt = Alteracao()
        alt.chamado = chamado
        alt.autor = request.user
        alt.status = '2'
        alt.save()
        
        messages.success(request, 'Sucesso. O chamado foi aceito.')

        return redirect('gambiarra:detalhes', chamado_id)

@method_decorator(login_required, name='dispatch')
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

            alt = Alteracao()
            alt.chamado = chamado
            alt.autor = request.user
            alt.status = '1'
            alt.save()
            form.save_m2m() 

            return redirect('gambiarra:detalhes', pk=chamado.pk)
        else:
            return render(request, 'dashboard/chamado/registar.html', {'chamado': form, 'titulo': "Abrir chamado"})   
        
@method_decorator(login_required, name='dispatch')
class DashboardView(View):
    def get(self, request, *args, **kwargs):
        chamados = Chamado.objects.all().prefetch_related('bolsistas')

        if request.user.tipo_usuario != '4':
            chamados = Chamado.objects.filter(cliente=request.user).prefetch_related('bolsistas')

        avaliar = AvaliacaoForm()
        context = {'chamados':chamados, "avaliar":avaliar}
        return render(request, 'dashboard/index.html', context)

@method_decorator(login_required, name='dispatch')
def alterar_status(request, pk):
    chamado = get_object_or_404(Chamado, pk=pk)
    
    if request.method == 'POST':
        novo_status = request.POST.get('status')
        if novo_status in dict(STATUS_CHOICES):
            chamado.status = novo_status
            chamado.save()
            alt = Alteracao()
            alt.autor = request.user
            alt.chamado = chamado
            alt.status = novo_status
            alt.save()
            messages.success(request, 'Sucesso. O status foi alterado.')

    return redirect('gambiarra:detalhes', pk)
