from django import forms
from .models import Chamado, Avaliacao, Bolsista

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

class BolsistaForm(forms.ModelForm):
    class Meta:
        model = Bolsista
        fields = ['nome', 'matricula', 'foto_perfil']

    def __init__(self, *args, **kwargs):
        super(BolsistaForm, self).__init__(*args, **kwargs)