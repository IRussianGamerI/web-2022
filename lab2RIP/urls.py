"""lab2RIP URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin

from django.conf.urls.static import static
from django.conf import settings

from rest_framework import routers

from rest_framework import permissions
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_simplejwt.views import TokenObtainPairView

import views

schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny,],
)

router = routers.DefaultRouter()
router.register(r'Customers', views.CustomerViewSet)
router.register(r'Sellers', views.SellerViewSet)
router.register(r'Ads', views.AdViewSet, basename='Ad')
router.register(r'Flats', views.FlatViewSet)
router.register(r'Types', views.TypeViewSet)
router.register(r"Basket", views.BasketViewSet)
router.register(r"ExpandedBasket", views.ExpandedBasketViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.get_all_ads),
    path('ad/<id>/', views.get_ad_with_flat, name='ad_url'),

    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

    path('add_user', views.get_json, name='get_json'),
    path('api/user', views.user, name='user'),
    path('api/token/obtain', TokenObtainPairView.as_view(), name='token_obtain'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
