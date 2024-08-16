from django import forms
from .models import Chamado

class ChamadoForm(forms.ModelForm):
    
    class Meta:
        model = Chamado
        fields = '__all__'