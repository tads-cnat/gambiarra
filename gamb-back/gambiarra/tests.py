import uuid
from django.test import TestCase
from .models import Chamado, Usuario, Item, Avaliacao, Mensagem
from django.core.exceptions import ValidationError


class ChamadoModelTest(TestCase):

    def setUp(self):
        # Create test users and an item
        self.professor = Usuario.objects.create(
            username="professor1", email="prof@example.com"
        )
        self.bolsista = Usuario.objects.create(
            username="bolsista1", email="bolsista@example.com"
        )
        self.cliente = Usuario.objects.create(
            username="cliente1", email="cliente@example.com"
        )
        self.item = Item.objects.create(modelo="Item de Teste")

        # Create a Chamado instance for testing
        self.chamado = Chamado.objects.create(
            titulo="Teste de Chamado",
            descricao="Descrição de teste",
            professor=self.professor,
            item=self.item,
            cliente=self.cliente,
        )
        self.chamado.bolsistas.add(self.bolsista)

    def test_chamado_str(self):
        """
        Test the __str__ method of the Chamado model.
        """
        self.assertEqual(
            str(self.chamado), f"Chamado Teste de Chamado - {self.chamado.status}"
        )

    def test_campos_chamado(self):
        """
        Test if the Chamado fields are correctly saved.
        """
        self.assertEqual(self.chamado.titulo, "Teste de Chamado")
        self.assertEqual(self.chamado.descricao, "Descrição de teste")
        self.assertIsInstance(self.chamado.code, uuid.UUID)  # Ensure 'code' is a UUID

    def test_relacionamentos(self):
        """
        Test the relationships between Chamado and other models.
        """
        self.assertEqual(self.chamado.professor, self.professor)
        self.assertIn(self.bolsista, self.chamado.bolsistas.all())
        self.assertEqual(self.chamado.cliente, self.cliente)
        self.assertEqual(self.chamado.item, self.item)

    def test_status_default(self):
        """
        Test if the default status for a new Chamado is correctly set.
        """
        self.assertEqual(
            self.chamado.status, "1"
        )  # Assuming '1' is the default status code

    def test_campo_acessorio_opcional(self):
        """
        Test that 'acessorio' is an optional field.
        """
        # Create a NEW Item instance for this test to avoid OneToOneField conflict
        new_item_for_optional_test = Item.objects.create(
            modelo="Item para Teste Opcional"
        )

        chamado_sem_acessorio = Chamado.objects.create(
            titulo="Chamado Sem Acessório",
            descricao="Descrição sem acessório",
            professor=self.professor,
            item=new_item_for_optional_test,  # Use the new item
            cliente=self.cliente,
        )
        self.assertIsNone(chamado_sem_acessorio.acessorio)

    def test_campo_modelo_max_length(self):
        string = "a" * 31
        item = Item(modelo=string, diagnostico="oi")
        with self.assertRaisesMessage(
            ValidationError, "O modelo pode conter no máximo 30 caracteres"
        ):
            item.full_clean()

    def test_campo_titulo_max_length(self):
        """
        Test the maximum length constraint for the 'titulo' field.
        """
        long_title = "a" * 51  # More than 50 characters
        with self.assertRaisesMessage(
            ValidationError, "O título pode conter no máximo 50 caracteres"
        ):
            # Create a new item for this test too
            item_for_long_title = Item.objects.create(modelo="Item para Titulo Longo")
            Chamado.objects.create(
                titulo=long_title,
                descricao="Descrição",
                professor=self.professor,
                item=item_for_long_title,
                cliente=self.cliente,
            )

    def test_campo_acessorio_max_length(self):
        """
        Test the maximum length constraint for the 'acessorio' field.
        """
        long_acessorio = "a" * 256  # More than 255 characters
        with self.assertRaisesMessage(
            ValidationError, "O acessório pode conter no máximo 255 caracteres"
        ):
            # Create a new item for this test
            item_for_long_acc = Item.objects.create(modelo="Item para Acessorio Longo")
            Chamado.objects.create(
                titulo="Título",
                descricao="Descrição",
                professor=self.professor,
                item=item_for_long_acc,
                cliente=self.cliente,
                acessorio=long_acessorio,
            )

    def test_campo_descricao_max_length(self):
        """
        Test the maximum length constraint for the 'descricao' field.
        """
        long_description = (
            "a" * 256
        )  # More than 255 characters (adjusted to match model's max_length=255)
        with self.assertRaisesMessage(
            ValidationError, "A descrição pode conter no máximo 255 caracteres"
        ):
            # Create a new item for this test
            item_for_long_desc = Item.objects.create(modelo="Item para Descricao Longa")
            Chamado.objects.create(
                titulo="Título",
                descricao=long_description,
                professor=self.professor,
                item=item_for_long_desc,
                cliente=self.cliente,
            )

    # Added tests for missing required fields based on your `clean()` method
    def test_campo_titulo_obrigatorio(self):
        """
        Test that the 'titulo' field is required.
        """
        with self.assertRaisesMessage(ValidationError, "O título é obrigatório"):
            item_for_missing_title = Item.objects.create(
                modelo="Item para Titulo Ausente"
            )
            Chamado.objects.create(
                titulo="",  # Missing title
                descricao="Descrição de teste",
                professor=self.professor,
                item=item_for_missing_title,
                cliente=self.cliente,
            )

    def test_campo_descricao_obrigatoria(self):
        """
        Test that the 'descricao' field is required.
        """
        with self.assertRaisesMessage(ValidationError, "A descrição é obrigatória"):
            item_for_missing_desc = Item.objects.create(
                modelo="Item para Descricao Ausente"
            )
            Chamado.objects.create(
                titulo="Título de Teste",
                descricao="",  # Missing description
                professor=self.professor,
                item=item_for_missing_desc,
                cliente=self.cliente,
            )

    def test_campo_modelo_obrigatorio(self):
        """
        Test that the 'item' (modelo) field is required.
        """
        with self.assertRaisesMessage(ValidationError, "O modelo é obrigatório"):
            Chamado.objects.create(
                titulo="Título de Teste",
                descricao="Descrição de teste",
                professor=self.professor,
                item=None,  # Missing item
                cliente=self.cliente,
            )

    def test_status_invalido(self):
        item_teste = Item.objects.create(modelo="Item Status Inválido")
        chamado = Chamado(
            titulo="Chamado com status inválido",
            descricao="Descrição",
            professor=self.professor,
            item=item_teste,
            cliente=self.cliente,
            status="999",  # inválido
        )
        with self.assertRaises(ValidationError):
            chamado.full_clean()

    def test_code_unico(self):
        with self.assertRaises(Exception):
            Chamado.objects.create(
                titulo="Chamado com code duplicado",
                descricao="Descrição",
                professor=self.professor,
                item=Item.objects.create(modelo="Item Novo"),
                cliente=self.cliente,
                code=self.chamado.code,  # forçando duplicação
            )

    def test_chamado_varios_bolsistas(self):
        bolsista2 = Usuario.objects.create(
            username="bolsista2", email="bolsista2@example.com"
        )
        self.chamado.bolsistas.add(bolsista2)
        self.assertEqual(self.chamado.bolsistas.count(), 2)
        self.assertIn(bolsista2, self.chamado.bolsistas.all())
