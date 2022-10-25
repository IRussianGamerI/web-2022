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
from django.urls import path, include

import views

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'Customers', views.CustomerViewSet)
router.register(r'Sellers', views.SellerViewSet)
router.register(r'Ads', views.AdViewSet)
router.register(r'Flats', views.FlatViewSet)
router.register(r'Types', views.TypeViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.get_all_ads),
    path('ad/<id>/', views.get_ad_with_flat, name='ad_url'),

    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
