from django.shortcuts import render
from estate_market.models import Ad
from estate_market.models import Flat
from django.http import HttpResponse

from rest_framework import viewsets
from estate_market.serializers import *


class AdViewSet(viewsets.ModelViewSet):
    serializer_class = AdSerializer
    def get_queryset(self):
        queryset = Ad.objects.all()
        if self.request.method == "GET":
            params = self.request.query_params.dict()
            if 'q' in params.keys() and params['q'] != '':
                queryset = queryset.filter(Title__icontains=params['q'])
            if 'min_price' in params.keys() and params['min_price'] != '':
                try:
                    queryset = queryset.filter(Price__gte=int(params['min_price']))
                except:
                    pass
            if 'max_price' in params.keys() and params['max_price'] != '':
                try:
                    queryset = queryset.filter(Price__lte=int(params['max_price']))
                except:
                    pass
        return queryset


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


class BasketViewSet(viewsets.ModelViewSet):
    queryset = Basket.objects.all()
    serializer_class = BasketSerializer


class ExpandedBasketViewSet(viewsets.ModelViewSet):
    queryset = Basket.objects.all()
    serializer_class = ExpandedBasketSerializer


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
