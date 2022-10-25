from django.shortcuts import render
from estate_market.models import Ad
from estate_market.models import Flat
from django.http import HttpResponse

from rest_framework import viewsets
from estate_market.serializers import *


class AdViewSet(viewsets.ModelViewSet):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer


class FlatViewSet(viewsets.ModelViewSet):
    queryset = Flat.objects.all()
    serializer_class = FlatSerializer


class TypeViewSet(viewsets.ModelViewSet):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer


class SellerViewSet(viewsets.ModelViewSet):
    queryset = Seller.objects.all()
    serializer_class = SellerSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


def get_all_ads(request):
    return render(request, 'index.html', {
        'data': {
            'ads': Ad.objects.all()
        }
    })


def get_ad_with_flat(request, id):
    ad = Ad.objects.filter(AdID=id)[0]
    return render(request, 'ad_full.html', {
        'data': {
            'flat': Flat.objects.filter(FlatID=ad.FlatID.FlatID)[0],
            'ad': ad
        }
    })
