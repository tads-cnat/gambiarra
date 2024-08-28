from django import forms
from .models import Chamado, Avaliacao, Mensagem

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
class AvaliarForm(forms.ModelForm):
    class Meta:
        model = Avaliacao
        fields = ['texto', 'nota', 'chamado']  

    def __init__(self, *args, **kwargs):
        super(AvaliarForm, self).__init__(*args, **kwargs)

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
