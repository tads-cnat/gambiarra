
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

#rest framework
from rest_framework.generics import(
    GenericAPIView,
    CreateAPIView,
) 
from rest_framework.response import Response
from rest_framework import status
#serializers
from gambiarra.serializers import(
    ChamadoSerializer,
)
#swagger
from drf_spectacular.utils import extend_schema       
@extend_schema(
    request=ChamadoSerializer,
    responses=ChamadoSerializer,
)

#cria novo chamado com status 1
class CreateChamadoView(CreateAPIView):
    queryset = Chamado.objects.all()
    serializer_class = ChamadoSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(data={
            "success": True,
            "data": None,
            "message": "Chamado aberto com sucesso!"
        }, status=status.HTTP_201_CREATED)




# def get(self, request, id): #recupera um chamado pelo id
#     chamado = get_object_or_404(Chamado, id=id)
#     serializer = ChamadoSerializer(chamado)
#     return Response(serializer.data)

@method_decorator(login_required, name='dispatch')
class ListarBolsistas(View):
    def get(self, request, *args, **kwargs):
        bolsistas = Bolsista.objects.all()
        titulo = "Listar Bolsistas"
        return render(request, 'dashboard/bolsista/listar_bolsistas.html', {'bolsistas': bolsistas, 'titulo': titulo})

@method_decorator(login_required, name='dispatch')
class CriarBolsista(View):
    def post(self, request, *args, **kwargs):
        form = BolsistaForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
        return redirect('gambiarra:listar-bolsistas')
        

@method_decorator(login_required, name='dispatch')
class EditarBolsista(View):
    def post(self, request, pk, *args, **kwargs):
        bolsista = get_object_or_404(Bolsista, pk=pk)
        form = BolsistaForm(request.POST, request.FILES, instance=bolsista)

        #alterado para limpar a foto caso o campo seja acionado no formulario
        if form.is_valid():
            if 'clear_foto_perfil' in request.POST:
                if bolsista.foto_perfil:
                    bolsista.foto_perfil.delete(save=False)
                    bolsista.foto_perfil = url="../media/Padrao/perfil_default.png"  

            form.save()
            return redirect('gambiarra:listar-bolsistas')

        return render(request, 'dashboard/bolsista/registrar_bolsista.html', {'bolsista': form})


@method_decorator(login_required, name='dispatch')
class DeletarBolsista(View):
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
    def post(self, request, pk):
        chamado = get_object_or_404(Chamado, pk=pk)
        form = AdicionarBolsistasForm(request.POST, instance=chamado)
        if form.is_valid():
            chamado = form.save(commit=False)
            chamado.save()  
            form.save_m2m()

        return redirect('gambiarra:detalhes', pk=chamado.pk)

@method_decorator(login_required, name='dispatch')  
class ChamadoDetailView(View):
    def get(self, request, *args, **kwargs):

        chamado_id = kwargs['pk']
        chamado = get_object_or_404(Chamado, pk=chamado_id)
        alteracoes = Alteracao.objects.filter(chamado=chamado.pk)  # Corrigido para usar filter
        aceito_presente = alteracoes.filter(status='2').exists()
        fechado_presente = alteracoes.filter(status__in=['8', '7', '6']).exists()
        bolsistaForm = AdicionarBolsistasForm(instance=chamado)


        mensagens = Mensagem.objects.filter(chamado=chamado).order_by('data_envio')
        mensagem_form = MensagemForm()
        context = {'chamado':chamado, 'mensagens':mensagens, 'mensagem_form': mensagem_form, 'alteracoes': alteracoes, 'aceito_presente': aceito_presente, 'fechado_presente': fechado_presente, 'bolsistaForm': bolsistaForm}
        
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
class AceitarView(View):
    def aceitar(request, pk):
        chamado = get_object_or_404(Chamado, pk=pk)
        chamado.professor = request.user
        chamado.status = '2'
        chamado.save()
        alt = Alteracao()
        alt.chamado = chamado
        alt.autor = request.user
        alt.status = '2'
        alt.save()
        
        messages.success(request, 'Sucesso. O chamado foi aceito.')

        return redirect('gambiarra:detalhes', pk)

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
        chamados = Chamado.objects.all().prefetch_related('bolsistas', 'avaliacao')

        if request.user.tipo_usuario != '4':
            chamados = Chamado.objects.filter(cliente=request.user).prefetch_related('bolsistas', 'avaliacao')

        avaliar = AvaliacaoForm()
        context = {'chamados':chamados, "avaliar":avaliar}
        return render(request, 'dashboard/index.html', context)
    
@login_required
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
