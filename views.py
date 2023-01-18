from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_jwt.utils import jwt_encode_handler
from rest_framework_simplejwt.tokens import RefreshToken

from estate_market.serializers import *
from estate_market.models import *


@api_view(['GET', 'POST'])
def get_json(request):
    if request.method == 'POST':
        user = User.objects.create_user(request.data['username'], request.data['email'], request.data['password'])
        user.save()
        refresh = RefreshToken.for_user(user)
        return Response(
            {'access': str(refresh.access_token), }
        )
    else:
        return Response(
            {'status': 'Wrong username or password'}
        )


@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def user(request: Request):
    return Response({
        'data': UserSerializer(request.user).data
    })


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


@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class ExpandedAppViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ExpandedAppSerializer

    def get_queryset(self):
        queryset = Application.objects.all().order_by('-id')
        params = self.request.query_params.dict()
        if len(params) > 0:
            if params['id']:
                queryset = Application.objects.filter(UserID=params['id'])
        else:
            return []
        return queryset


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
