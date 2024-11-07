from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

api_doc = [
    path("schema/", 
        SpectacularAPIView.as_view(), 
        name="schema"),
    path(
        "",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
]

api_path = [

]
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(api_doc)),
    path('api/doc/', include(api_doc)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)