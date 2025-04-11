from rest_framework import permissions
from rest_framework.request import Request
from .constants import GrupoEnum


class GroupPermission(permissions.BasePermission):
    """Permissão base para checar grupo do usuário"""
    allowed_groups = []

    message = "Seu usuário não tem permissão."

    def has_permission(self, request: Request, view):
        user = request.user
        return user.is_authenticated and user.grupo.name in self.allowed_groups


class OnlyGerente(GroupPermission):
    allowed_groups = [GrupoEnum.GERENTE]


class OnlyProfessor(GroupPermission):
    allowed_groups = [GrupoEnum.PROFESSOR]


class OnlyBolsista(GroupPermission):
    allowed_groups = [GrupoEnum.BOLSISTA]


class OnlyServidor(GroupPermission):
    allowed_groups = [GrupoEnum.SERVIDOR]


class OnlyCliente(GroupPermission):
    allowed_groups = [GrupoEnum.CLIENTE]


class OnlyAluno(GroupPermission):
    allowed_groups = [GrupoEnum.ALUNO]


class OnlyInterno(GroupPermission):
    allowed_groups = list(GrupoEnum.INTERNO)


class OnlyExterno(GroupPermission):
    allowed_groups = list(GrupoEnum.EXTERNO)


class OnlyStaff(GroupPermission):
    allowed_groups = list(GrupoEnum.STAFF)
