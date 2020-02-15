from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from apps.user.api.api_rest import UserModelViewSet

router = routers.DefaultRouter()
router.register(r'users', UserModelViewSet)




urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('api/', include(router.urls)),

]

if settings.DEBUG:
    urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + urlpatterns
