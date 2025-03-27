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
            # Obtendo os grupos
            grupo_admin = Group.objects.get(pk=1)
            grupo_professor = Group.objects.get(pk=2)

            # Caminho da pasta de imagens (ajuste o caminho conforme necessário)
            img_folder_path = os.path.join(settings.BASE_DIR, 'authentication', 'management', 'commands', 'img')

            # Função para adicionar a imagem de perfil
            def add_profile_picture(usuario, nome):
                image_filename = f"{nome}.png".lower()  # Nome do arquivo da imagem
                image_path = os.path.join(img_folder_path, image_filename)

                if os.path.exists(image_path):
                    with open(image_path, 'rb') as img_file:
                        usuario.imagem.save(image_filename, File(img_file), save=True)

            # Gerentes
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
                    add_profile_picture(gerente_obj, gerente["username"])  # Adiciona a imagem
                    gerente_obj.save()

            # Professores
            professores = [
                {"username": "jorgiano", "email": "jorgiano@admin.com", "grupo": grupo_professor},
                {"username": "jucena", "email": "lucena@admin.com", "grupo": grupo_professor},
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
                    add_profile_picture(professor_obj, professor["username"])  # Adiciona a imagem
                    professor_obj.save()

        except Group.DoesNotExist:
            self.stderr.write(self.style.ERROR("Os grupos não existem"))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Erro: {str(e)}"))
