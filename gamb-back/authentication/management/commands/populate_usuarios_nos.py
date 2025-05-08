import os
from django.contrib.auth.models import Group
from django.core.management.base import BaseCommand
from django.core.files import File
from django.conf import settings

from authentication.models import Usuario


class Command(BaseCommand):
    help = "Populate the User table with new users (Gerentes and Professores), including profile pictures"


    def handle(self, *args, **kwargs):
        pasta = os.path.join(settings.BASE_DIR, 'authentication', 'management', 'commands', 'img')
        def add_foto(usuario, nome):
            imagem_nome = f"{nome}.png".lower()
            imagem_caminho = os.path.join(pasta, imagem_nome)

            if os.path.exists(imagem_caminho):
                with open(imagem_caminho, 'rb') as img_file:
                    usuario.imagem.save(imagem_nome, File(img_file), save=True) 
        try:
            grupo_admin = Group.objects.get(pk=1)
            grupo_professor = Group.objects.get(pk=2)
            grupo_bolsista = Group.objects.get(pk=3)
            grupo_servidor = Group.objects.get(pk=4)
            grupo_cliente = Group.objects.get(pk=5)
            grupo_aluno = Group.objects.get(pk=6)

            usuarios = [
                #Gerentes
                {"username": "igor", "grupo": grupo_admin},
                {"username": "ryan", "grupo": grupo_admin},
                {"username": "leo", "grupo": grupo_admin},
                {"username": "lg", "grupo": grupo_admin},
                {"username": "livia", "grupo": grupo_admin},
            
                #Professores
                {"username": "jorgiano", "grupo": grupo_professor},
                {"username": "lucena", "grupo": grupo_professor},
                {"username": "braulio", "grupo": grupo_professor},
                {"username": "marilia", "grupo": grupo_professor},
                {"username": "felipao", "grupo": grupo_professor},
                {"username": "demostenes", "grupo": grupo_professor},
                {"username": "gracom", "grupo": grupo_professor},

                #Bolsistas
                {"username": "lili", "grupo": grupo_bolsista},
                {"username": "lua", "grupo": grupo_bolsista},
                {"username": "pitoco", "grupo": grupo_bolsista},

                #Servidores

                #Clientes

                #Alunos
            
            
            ]

            for usuario in usuarios:
                is_staff, is_superuser = False, False

                #Permissões baseadas em populate_user.py, mas to achando estranho
                if usuario["grupo"] in [grupo_admin, grupo_professor, grupo_bolsista]:
                    is_staff = True
                    is_superuser = True


                usuario_obj, created = Usuario.objects.update_or_create(
                    username = usuario["username"],
                    defaults = {
                        "email": "email@exemplo.com",
                        "is_staff": is_staff,
                        "is_superuser": is_superuser,
                        "is_active": True,
                        "grupo_id": usuario["grupo"].id,
                    },
                )

                if created:
                    usuario_obj.set_password("ZAP123!!")
                    add_foto(usuario_obj, usuario["username"])
                    usuario_obj.save()


        except Group.DoesNotExist:
            self.stderr.write(self.style.ERROR("Os grupos não existem"))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Erro: {str(e)}"))
