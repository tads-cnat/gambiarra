from django import forms
from .models import Chamado

class ChamadoItemForm(forms.ModelForm):
    # Campos do modelo Item
    modelo = forms.CharField(max_length=30)
    descricao = forms.CharField(max_length=30)
    class Meta:
        model = Chamado
        fields = ['titulo', 'descricao', 'cliente']  
        widgets = {
            'cliente': forms.HiddenInput()  # Campo item oculto no formulário
        }

    def __init__(self, *args, **kwargs):
        super(ChamadoItemForm, self).__init__(*args, **kwargs)
        # Aqui você pode personalizar o formulário se necessário