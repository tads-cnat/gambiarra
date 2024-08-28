from django import forms
from .models import Chamado, Avaliacao

class ChamadoItemForm(forms.ModelForm):
    # Campos do modelo Item
    modelo = forms.CharField(max_length=30)
    problema = forms.CharField(max_length=30)
    class Meta:
        model = Chamado
        fields = ['titulo', 'descricao', 'modelo', 'problema']  
     

    def __init__(self, *args, **kwargs):
        super(ChamadoItemForm, self).__init__(*args, **kwargs)
        # Aqui você pode personalizar o formulário se necessário

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