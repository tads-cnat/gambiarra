from django.contrib.auth.models import Group
from django.core.management.base import BaseCommand

from authentication.models import Usuario


class Command(BaseCommand):
    help = "Populate the User table"

    def handle(self, *args, **kwargs):
        try:
            grupo = Group.objects.get(pk=5)

            grupo_admin = Group.objects.get(pk=1)

            cliente, created = Usuario.objects.update_or_create(
                username="cliente",
                defaults={
                    "email": "cliente@example.com",
                    "is_staff": False,
                    "is_active": True,
                    "grupo_id": grupo.id,
                },
            )
            if created:
                cliente.set_password("ZAP123!!")
                cliente.save()
                self.stdout.write(
                    self.style.SUCCESS(
                        f"User '{cliente.username}' created successfully."
                    )
                )
            else:
                self.stdout.write(
                    self.style.SUCCESS(
                        f"User '{cliente.username}' updated successfully."
                    )
                )

            gambadmin, created = Usuario.objects.update_or_create(
                username="gambadmin",
                defaults={
                    "email": "gamadmin@admin.com",
                    "is_staff": True,
                    "is_active": True,
                    "is_superuser": True,
                    "grupo_id": grupo_admin.id,
                },
            )
            if created:
                gambadmin.set_password("ZAP123!!")
                gambadmin.save()
                self.stdout.write(
                    self.style.SUCCESS(
                        f"User '{gambadmin.username}' created successfully."
                    )
                )
            else:
                self.stdout.write(
                    self.style.SUCCESS(
                        f"User '{gambadmin.username}' updated successfully."
                    )
                )

        except Group.DoesNotExist:
            self.stderr.write(self.style.ERROR("One or more Grupo IDs do not exist."))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"An error occurred: {str(e)}"))
