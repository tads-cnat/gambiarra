from django import forms
from .models import User

class AdminForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control '}), max_length=30,  label='Senha', required=True)
    email = forms.CharField(widget=forms.EmailInput(attrs={'class': 'form-control'}),  label='Email', required=True)

    class Meta:
        model = User
        fields = ['email', 'password']

    def __init__(self, *args, **kwargs):
        super(AdminForm, self).__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.widget.attrs['class'] = 'form-control'
            if self.errors.get(field_name):
                field.widget.attrs['class'] += ' is-invalid'
            elif self.is_bound and not self.errors.get(field_name):
                field.widget.attrs['class'] += ' is-valid'
