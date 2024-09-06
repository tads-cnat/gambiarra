from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout
from django.views import View
from django.contrib import messages

from .models import User
from .forms import AdminForm  # Assumindo que você tem um formulário chamado AdminForm


def index(request):
    return render(request, 'index.html')

class Login(View):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('gambiarra:dashboard')
        form = AdminForm()
        return render(request, 'login.html', {'form': form})

    def post(self, request):
        form = AdminForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('email')
            password = form.cleaned_data.get('password')
            
        try:
            user = User.objects.get(email=email)
            if user.check_password(password) or user.password == password:
                auth_login(request, user)
                return redirect('gambiarra:dashboard')
            else:
                form.add_error("password",'')
                form.add_error("email", '') 
                form.add_error(None, 'Email ou senha incorretos.') 

        except User.DoesNotExist:
                form.add_error("password",'')
                form.add_error("email", '') 
                form.add_error(None, 'Email ou senha incorretos.') 

        
        return render(request, 'login.html', {'form': form})
    



def user_logout(request):
    logout(request)  # Termina a sessão do utilizador
    return redirect('users:login')