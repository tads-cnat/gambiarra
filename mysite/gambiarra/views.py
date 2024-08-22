from django.shortcuts import render
from django.views import View
from .models import *

class DashboardView(View):
    def get(self, request, *args, **kwargs):
        chamados = Chamado.objects.all().prefetch_related('bolsistas')
        context = {'chamados':chamados}
        return render(request, 'dashboard/index.html', context)

