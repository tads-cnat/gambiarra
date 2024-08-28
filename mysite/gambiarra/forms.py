from django import forms
from .models import Chamado, Avaliacao, Mensagem, Bolsista

class ChamadoItemForm(forms.ModelForm):
    # Campos do modelo Item
    modelo = forms.CharField(max_length=30)
    problema = forms.CharField(max_length=30)
    class Meta:
        model = Chamado
        fields = ['titulo', 'descricao', 'modelo', 'problema', 'bolsistas']
        widgets = {
            'bolsistas': forms.CheckboxSelectMultiple(),  # Exibe como caixas de seleção múltipla
        }  
     

    def __init__(self, *args, **kwargs):
        super(ChamadoItemForm, self).__init__(*args, **kwargs)
        # Aqui você pode personalizar o formulário se necessário

class AdicionarBolsistasForm(forms.ModelForm):
    bolsistas = forms.ModelMultipleChoiceField(
        queryset=Bolsista.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        required=False
    )

    class Meta:
        model = Chamado
        fields = ['bolsistas']

class BolsistaForm(forms.ModelForm):
    class Meta:
        model = Bolsista
        fields = ['nome', 'matricula', 'foto_perfil']

    def __init__(self, *args, **kwargs):
        super(BolsistaForm, self).__init__(*args, **kwargs)

class MensagemForm(forms.ModelForm):
    class Meta:
        model = Mensagem
        fields = ['texto']
        widgets = {
            'texto': forms.Textarea(attrs={
                'placeholder': 'Mensagem...',
                'style': 'height: 100px;',
            })
        }
    
    def __init__(self, *args, **kwargs):
        super(MensagemForm, self).__init__(*args, **kwargs)

#avaliar chamado
class AvaliacaoForm(forms.ModelForm):
    class Meta:
        model = Avaliacao
        fields = ['texto', 'nota']
        widgets = {
            'texto': forms.Textarea(attrs={'rows': 4, 'placeholder': 'Escreva sua avaliação aqui'}),
            'nota': forms.NumberInput(attrs={'min': 1, 'max': 5}),
        }
    def __init__(self, *args, **kwargs):
        super(AvaliacaoForm, self).__init__(*args, **kwargs)