from django import forms
from .models import User

class AdminForm(forms.ModelForm):

    class Meta:
        model = User
        fields = ['email', 'password'] 
