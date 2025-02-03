from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from gambiarra.urls import gambiarra_urls
from authentication.urls import auth_urls
from drf_yasg import openapi
from drf_yasg.views import get_schema_view as swagger_get_schema_view
from rest_framework import permissions

schema_view = swagger_get_schema_view(
    openapi.Info(
        title="Gamb Documentation",
        default_version='1.0.0',
        description='Documentação para o Gamb',
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

api_doc = [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

#adicionar apps aqui
api_path = [
    path("", include(gambiarra_urls)),
    path("auth/", include(auth_urls))
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(api_path)),
    path('api/doc/', include(api_doc)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)