from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login
from django.views import View
from django.contrib import messages

from .models import User
from .forms import AdminForm  # Assumindo que você tem um formulário chamado AdminForm

def index(request):
    return render(request, 'index.html')

class Login(View):
    def get(self, request):
        form = AdminForm()
        return render(request, 'login.html', {'form': form})

    def post(self, request):
        form = AdminForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('email')
            password = form.cleaned_data.get('password')
            
        try:
            # Buscar usuário pelo email
            user = User.objects.get(email=email)
            
            # Verificar se a senha está correta
            if user.check_password(password):
                # Senha correta, retorne o usuário ou faça o login# Por exemplo, você pode logar o usuário agora
                auth_login(request, user)
                return redirect('gambiarra:dashboard')
            else:
                # Senha incorreta, adicione mensagem de erro
                messages.error(request, 'Senha incorreta.')
        except User.DoesNotExist:
            # O usuário não existe, adicione mensagem de erro
            messages.error(request, 'Usuário com este email não foi encontrado.')
           
        
        # Se o formulário não for válido ou as credenciais forem incorretas, retorna para a página de login
        return render(request, 'login.html', {'form': form})