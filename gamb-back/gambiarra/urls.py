from django.urls import path

from . import views

app_name = "gambiarra"
gambiarra_urls = [
    path("chamado/", views.CreateChamadoView.as_view(), name="create-chamado"),
    path("chamado/listar/", views.ListarChamadoView.as_view(), name="list-chamado"),
    path(
        "chamado/aceitar/<int:id>/",
        views.AceitarChamadoView.as_view(),
        name="accept-chamado",
    ),
]
