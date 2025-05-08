from .constants import GrupoEnum
from rest_framework import permissions
from rest_framework.request import Request
from authentication.models import *

class BaseGrupoPermission(permissions.BasePermission):
    grupo_permitido = None 
    message = "Seu usuário não tem permissão."

    def has_permission(self, request: Request, view):
        user = request.user
        if not user.is_authenticated or not hasattr(user, "grupo"):
            return False

        if isinstance(self.grupo_permitido, (list, tuple, set)):
            return user.grupo.name in self.grupo_permitido
        return user.grupo.name == self.grupo_permitido

# Permissões específicas herdando da base
class OnlyGerente(BaseGrupoPermission):
    grupo_permitido = GrupoEnum.GERENTE

class OnlyProfessor(BaseGrupoPermission):
    grupo_permitido = GrupoEnum.PROFESSOR

class OnlyBolsista(BaseGrupoPermission):
    grupo_permitido = GrupoEnum.BOLSISTA

class OnlyServidor(BaseGrupoPermission):
    grupo_permitido = GrupoEnum.SERVIDOR

class OnlyCliente(BaseGrupoPermission):
    grupo_permitido = GrupoEnum.CLIENTE

class OnlyAluno(BaseGrupoPermission):
    grupo_permitido = GrupoEnum.ALUNO

class OnlyInterno(BaseGrupoPermission):
    grupo_permitido = GrupoEnum.INTERNO 

class OnlyExterno(BaseGrupoPermission):
    grupo_permitido = GrupoEnum.EXTERNO

class OnlyStaff(BaseGrupoPermission):
    grupo_permitido = GrupoEnum.STAFF
