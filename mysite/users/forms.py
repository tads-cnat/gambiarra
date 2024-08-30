from django import forms
from .models import User

class AdminForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput, max_length=30,  label='Senha', required=True)  # Campo de senha mascarado
    email = forms.CharField(widget=forms.EmailInput,  label='Email', required=True)  # Campo de senha mascarado

    class Meta:
        model = User
        fields = ['email', 'password'] 
