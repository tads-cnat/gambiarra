import os
from django.contrib.auth.models import Group
from django.core.management.base import BaseCommand
from django.core.files import File
from django.conf import settings

from authentication.models import Usuario

class Command(BaseCommand):
    help = "Populate the User table with new users (Gerentes and Professores), including profile pictures"

    def handle(self, *args, **kwargs):
        try:
            grupo_admin = Group.objects.get(pk=1)
            grupo_professor = Group.objects.get(pk=2)

            pasta = os.path.join(settings.BASE_DIR, 'authentication', 'management', 'commands', 'img')

            def add_foto(usuario, nome):
                imagem_nome = f"{nome}.png".lower()
                imagem_caminho = os.path.join(pasta, imagem_nome)

                if os.path.exists(imagem_caminho):
                    with open(imagem_caminho, 'rb') as img_file:
                        usuario.imagem.save(imagem_nome, File(img_file), save=True)

            gerentes = [
                {"username": "igor", "email": "igor@admin.com", "grupo": grupo_admin},
                {"username": "ryan", "email": "ryan@admin.com", "grupo": grupo_admin},
                {"username": "leo", "email": "leo@admin.com", "grupo": grupo_admin},
                {"username": "lg", "email": "lg@admin.com", "grupo": grupo_admin},
                {"username": "livia", "email": "livia@admin.com", "grupo": grupo_admin},
            ]

            for gerente in gerentes:
                gerente_obj, created = Usuario.objects.update_or_create(
                    username=gerente["username"],
                    defaults={
                        "email": gerente["email"],
                        "is_staff": True,
                        "is_active": True,
                        "is_superuser": True,
                        "grupo_id": gerente["grupo"].id,
                    },
                )
                if created:
                    gerente_obj.set_password("ZAP123!!")
                    add_foto(gerente_obj, gerente["username"])
                    gerente_obj.save()

            # Professores
            professores = [
                {"username": "jorgiano", "email": "jorgiano@admin.com", "grupo": grupo_professor},
                {"username": "lucena", "email": "lucena@admin.com", "grupo": grupo_professor},
                {"username": "braulio", "email": "braulio@admin.com", "grupo": grupo_professor},
                {"username": "marilia", "email": "marilia@admin.com", "grupo": grupo_professor},
                {"username": "felipao", "email": "felipao@admin.com", "grupo": grupo_professor},
                {"username": "demostenes", "email": "demostenes@admin.com", "grupo": grupo_professor},
            ]

            for professor in professores:
                professor_obj, created = Usuario.objects.update_or_create(
                    username=professor["username"],
                    defaults={
                        "email": professor["email"],
                        "is_staff": True,
                        "is_active": True,
                        "is_superuser": False,
                        "grupo_id": professor["grupo"].id,
                    },
                )
                if created:
                    professor_obj.set_password("ZAP123!!")
                    add_foto(professor_obj, professor["username"])
                    professor_obj.save()

        except Group.DoesNotExist:
            self.stderr.write(self.style.ERROR("Os grupos não existem"))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Erro: {str(e)}"))
