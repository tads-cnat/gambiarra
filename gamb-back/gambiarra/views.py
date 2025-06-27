from django.db.models import Q
from rest_framework import status, filters
from .filters import ChamadoFilter
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_filters import rest_framework as filters
from rest_framework.filters import SearchFilter
from authentication.constants import GrupoEnum
from authentication.permissions import *
from gambiarra.serializers import *
from .models import *
from authentication.models import *
from django.db.models import Count

TAB_STATUS_MAPPING = {
    "todos": [],
    "aceitos": ["2", "3", "4", "5"],
    "pendentes": ["1"],
    "recusados": ["8"],
    "fechados": ["6", "7", "8"],
    "arquivados": ["9"],
}


class ChamadoViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Chamado.objects.all()
    filter_backends = (SearchFilter, filters.DjangoFilterBackend)
    search_fields = [
        "status",  # Campo status
        "titulo__icontains",  # Campo titulo
        "descricao__icontains",  # Campo descricao
        "code__icontains",  # Campo code
        "professor__username",  # Campo professor username
        "bolsistas__username",  # Campo bolsistas username
        "cliente__username",  # Campo cliente username
    ]
    filterset_class = ChamadoFilter

    def get_serializer_class(
        self,
    ):  # Função pra retornar o serializador apropriado pra cada função
        acao = self.action
        if acao == "create":
            return CreateChamadoSerializer
        if acao == "aceitar_chamado":
            return AceitarChamadoSerializer
        if acao == "alterar_status":
            return AlterarStatusSerializer
        if acao == "update_bolsistas":
            return UpdateBolsistaSerializer
        if acao == "list":
            return ListarChamadoSerializer
        if acao == "mensagens":
            return MensagemSerializer
        if acao == "alteracoes":
            return AlteracaoSerializer
        if acao == "retrieve":
            return DetalharChamadoSerializer
        if acao == "partial_update":
            return UpdateChamadoSerializer

        return ListarChamadoSerializer

    def get(self, pk):
        try:

            chamado = Chamado.objects.get(pk=pk)

            # Verifica se o usuário tem permissão para ver o chamado
            user: Usuario = self.request.user
            grupo = user.grupo.name
            if grupo == GrupoEnum.PROFESSOR and chamado.professor != user:
                status_permitidos = (
                    TAB_STATUS_MAPPING["pendentes"]
                    + TAB_STATUS_MAPPING["fechados"]
                    + TAB_STATUS_MAPPING["arquivados"]
                )
                if str(chamado.status) not in status_permitidos:
                    return Response(
                        {"erro": "Você não tem permissão para ver este chamado."},
                        status=status.HTTP_403_FORBIDDEN,
                    )

        except Chamado.DoesNotExist:
            return Response(
                {"erro": "Chamado não encontrado."}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = DetalharChamadoSerializer(chamado)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_queryset(self):
        user: Usuario = self.request.user
        grupo = user.grupo.name

        if grupo == GrupoEnum.GERENTE:
            queryset = Chamado.objects.all()
        elif grupo == GrupoEnum.PROFESSOR:
            # Se o professor está assimilado, ou é aberto, ou fechado, ou arquivado
            queryset = Chamado.objects.filter(
                Q(professor=user) | Q(status="1") | Q(status="6") | Q(status="9")
            )
        elif grupo == GrupoEnum.BOLSISTA:
            queryset = Chamado.objects.filter(bolsistas=user)
        else:
            queryset = Chamado.objects.filter(cliente=user)

        status_param = self.request.GET.get("status", None)
        tab_param = self.request.GET.get("tab", "todos")  # default

        if tab_param not in TAB_STATUS_MAPPING:
            raise ValueError(f"Valor inválido para o parâmetro 'tab': {tab_param}")

        mapeamento = TAB_STATUS_MAPPING[tab_param]
        if tab_param in TAB_STATUS_MAPPING and mapeamento:
            queryset = queryset.filter(status__in=mapeamento)

        if status_param:
            queryset = queryset.filter(status=status_param)

        return queryset

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def contagem_chamados(self, request):
        user: Usuario = self.request.user
        grupo = user.grupo.name

        if grupo == GrupoEnum.GERENTE:
            chamados = Chamado.objects.all()
            contagem = {
                "cadastrados": chamados.count(),
                "pendentes": chamados.filter(status="1").count(),
                "resolvidos": chamados.filter(status="5").count(),
                "fechados": chamados.filter(status__in=["6", "7", "8"]).count(),
            }

        else:
            if grupo == GrupoEnum.PROFESSOR:
                chamados = Chamado.objects.filter(Q(professor=user) | Q(status="1"))
            elif grupo == GrupoEnum.BOLSISTA:
                chamados = Chamado.objects.filter(bolsistas=user)
            else:  # Cliente
                chamados = Chamado.objects.filter(cliente=user)

            contagem = {
                "atribuidas": chamados.count(),
                "concluidas": chamados.filter(status__in=["5", "6", "7", "8"]).count(),
                "pendentes": chamados.filter(status="1").count(),
                "recusadas": (
                    chamados.filter(status="8").count()
                    if grupo != GrupoEnum.BOLSISTA
                    else 0
                ),
            }

        return Response({"quantidades": contagem}, status=status.HTTP_200_OK)

    def create(self, request):
        # print("Authenticated user:", request.user.grupo.name)
        if not OnlyExterno().has_permission(request, self):
            return Response(
                {"erro": "Você não tem permissão para criar chamados."},
                status=status.HTTP_403_FORBIDDEN,
            )
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        chamado = serializer.instance
        # print("DEBUUUUUUG", chamado, type(chamado))
        # chamado.save()
        alteracao = Alteracao.objects.create(
            autor=self.request.user, status=chamado.status, chamado=chamado
        )
        return Response(
            data={
                "success": True,
                "data": {
                    "id": chamado.id,
                },
                "message": "Chamado aberto com sucesso!",
            },
            status=status.HTTP_201_CREATED,
        )

    @action(detail=True, methods=["patch"], permission_classes=[OnlyStaff])
    def alterar_status(self, request, pk):
        chamado = self.get_object()
        status_antigo = chamado.status
        status_novo = request.data.get("status")

        # Definindo transições válidas com base nas decisões projetuais
        transicoes = {
            "Em Análise": ["Aceito", "Recusado"],
            "Aceito": ["Em Diagnóstico"],
            "Em Diagnóstico": [
                "Aguardando Peça",
                "Fechado Sem Resolução",
                "Equipamento Em Conserto",
            ],
            "Aguardando Peça": ["Equipamento Em Conserto", "Fechado Sem Resolução"],
            "Equipamento Em Conserto": ["Resolvido", "Fechado Sem Resolução"],
            "Resolvido": ["Fechado", "Arquivado"],
            "Fechado Sem Resolução": ["Fechado", "Arquivado"],
            "Recusado": ["Fechado", "Arquivado"],
        }

        # Resolvendo erros:
        # Se os status não são iguais
        # Se status não foi passado
        # Se status não é inteiro
        # Se o status atual é inváliso (nunca é pra acontecer)

        if str(status_novo) == str(chamado.status):
            return erro("O status antigo é igual ao status atual.")

        if status_novo is None:
            return erro("O campo 'status' é obrigatório.")

        try:
            status_novo = int(status_novo)
        except:
            return erro("O campo 'status' deve ser um número inteiro")

        # Transforma STATUS_CHOICE em um dict de ids:chaves
        status_dict = {
            status_id: status_texto for status_id, status_texto in STATUS_CHOICES
        }

        if str(status_novo) not in status_dict:
            return erro("Status inválido")

        status_atual_texto = status_dict.get(str(chamado.status))
        status_novo_texto = status_dict.get(str(status_novo))

        if not status_atual_texto:
            return erro("Status atual inválido")
            # Nunca é pra chegar aqui, mas vai que...

        # Mais verificação de erros:
        # Se o status atual tem transições definidas (mais um que não é pra dar erro nunca)
        # Se a transição desejada é permitida

        if status_atual_texto not in transicoes:
            return erro(
                f"Não há transições definidas para o status {status_atual_texto}"
            )

        if status_novo_texto not in transicoes[status_atual_texto]:
            return erro(
                f"Não é possível ir de '{status_atual_texto}' para '{status_novo_texto}'"
            )

        # Linkando o professor ao chamado, se ele aceitá-lo
        if status_novo_texto == "Aceito":
            chamado.professor = request.user

        chamado.status = status_novo
        chamado.save()

        alteracao = Alteracao(
            autor=self.request.user, status=status_novo, chamado=chamado
        )
        alteracao.save()

        return Response(
            {
                "mensagem": "Status atualizado com sucesso",
                "novo_status": status_novo_texto,
            }
        )

    @action(detail=True, methods=["patch"], permission_classes=[OnlyStaff])
    def update_bolsistas(self, request, pk):
        bolsista_ids = request.data.get("bolsistas")
        if not bolsista_ids:
            return erro("O campo bolsistas é obrigatório")

        chamado = get_object_or_404(Chamado, pk=pk)

        if not bolsista_ids or not isinstance(bolsista_ids, list):
            return erro("'bolsistas' deve ser uma lista de IDs.")

        bolsistas_validos = []

        for bolsista_id in bolsista_ids:
            bolsista = Usuario.objects.filter(pk=bolsista_id).first()
            if bolsista and bolsista.grupo.name == GrupoEnum.BOLSISTA:
                bolsistas_validos.append(bolsista_id)

        chamado.bolsistas.set(bolsistas_validos)
        chamado.save()

        resposta = {"bolsistas": bolsistas_validos}

        return Response(resposta, status=status.HTTP_200_OK)

    @action(detail=True, methods=["get", "post"], permission_classes=[IsAuthenticated])
    def mensagens(self, request, pk=None):
        chamado = self.get_object()

        if request.method == "GET":
            mensagens = Mensagem.objects.filter(chamado=chamado).order_by("data_envio")
            serializer = MensagemSerializer(mensagens, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method == "POST":
            texto = request.data.get("texto")

            if len(texto) > 240:
                erro("Texto longo demais")  # Ajeitar isso no front

            mensagem = Mensagem(autor=request.user, texto=texto, chamado=chamado)

            serializer = MensagemSerializer(mensagem)

            mensagem.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["get"], permission_classes=[IsAuthenticated])
    def alteracoes(self, request, pk=None):
        chamado = self.get_object()
        alteracoes = Alteracao.objects.filter(chamado=chamado).order_by(
            "data_alteracao"
        )
        serializer = AlteracaoSerializer(alteracoes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["get"], permission_classes=[IsAuthenticated])
    def get_acessorios_item(self, request, pk):
        item = get_object_or_404(Item, pk=pk)
        acessorios = Acessorio.objects.filter(item=item)
        serializer = AcessorioSerializer(acessorios, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Função pro código não ficar tão verboso feio
def erro(e):
    return Response({"erro": e}, status=status.HTTP_400_BAD_REQUEST)
