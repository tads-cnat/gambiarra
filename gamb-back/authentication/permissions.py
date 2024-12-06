from .constants import GrupoEnum
from rest_framework import permissions
from rest_framework.request import Request
from authentication.models import *

class OnlyGerente(permissions.BasePermission):
    message = "Seu usuário não tem permissão."

    def has_permission(self, request: Request, view):
        user = request.user
        if user.is_authenticated:
            return user.grupo.name == GrupoEnum.GERENTE
        return False
            
class OnlyProfessor(permissions.BasePermission):
    message = "Seu usuário não tem permissão."

    def has_permission(self, request: Request, view):
        user = request.user
        if user.is_authenticated:
            return user.grupo.name == GrupoEnum.PROFESSOR
        return False
    
class OnlyBolsista(permissions.BasePermission):
    message = "Seu usuário não tem permissão."

    def has_permission(self, request: Request, view):
        user = request.user
        if user.is_authenticated:
            return user.grupo.name == GrupoEnum.BOLSISTA
        return False
    
class OnlyServidor(permissions.BasePermission):
    message = "Seu usuário não tem permissão."

    def has_permission(self, request: Request, view):
        user = request.user
        if user.is_authenticated:
            return user.grupo.name == GrupoEnum.SERVIDOR
        return False
    
class OnlyCliente(permissions.BasePermission):
    message = "Seu usuário não tem permissão."

    def has_permission(self, request: Request, view):
        user = request.user
        if user.is_authenticated:
            return user.grupo.name == GrupoEnum.CLIENTE
        return False
    
class OnlyAluno(permissions.BasePermission):
    message = "Seu usuário não tem permissão."

    def has_permission(self, request: Request, view):
        user = request.user
        if user.is_authenticated:
            return user.grupo.name == GrupoEnum.ALUNO
        return False

class OnlyInterno(permissions.BasePermission):
    message = "Seu usuário não tem permissão."

    def has_permission(self, request: Request, view):
        user = request.user
        if user.is_authenticated:
            return user.grupo.name == GrupoEnum.INTERNO
        return False

class OnlyExterno(permissions.BasePermission):
    message = "Seu usuário não tem permissão."

    def has_permission(self, request: Request, view):
        user = request.user
        if user.is_authenticated:
            return user.grupo.name == GrupoEnum.EXTERNO
        return False

