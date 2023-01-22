from datetime import datetime

from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser, BasePermission, \
    SAFE_METHODS, AllowAny
from rest_framework.decorators import api_view, permission_classes, authentication_classes

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_jwt.utils import jwt_encode_handler
from rest_framework_simplejwt.tokens import RefreshToken

from estate_market.serializers import *
from estate_market.models import *


class IsStaffOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        print(request.user)
        return bool(request.user and request.user.is_staff)


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


# ad info. Gets all ads or filtered by query params: q, min_price, max_price
@authentication_classes([JWTAuthentication])
@permission_classes([IsStaffOrReadOnly])
class AdViewSet(viewsets.ModelViewSet):
    # authentication is performed when a user is accessed (e.g. checking permissions for a user)
    def perform_authentication(self, request):
        pass

    # def get_permissions(self):
    #     if self.request.method == 'GET':
    #         permission_classes = [AllowAny]
    #     else:
    #         permission_classes = [IsStaffOrReadOnly]
    #     return [permission() for permission in permission_classes]

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
            if 'show_all' in params.keys():
                if params['show_all'] != 'true':
                    try:
                        queryset = queryset.filter(Active__exact=True)
                    except:
                        pass
                else:
                    pass

        return queryset


# seller info. TODO: add authentication requirements
@authentication_classes([JWTAuthentication])
@permission_classes([IsStaffOrReadOnly])
class SellerViewSet(viewsets.ModelViewSet):
    def perform_authentication(self, request):
        pass

    queryset = Seller.objects.all()
    serializer_class = SellerSerializer


@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        queryset = Application.objects.all().order_by('-DateAdded')
        user_id = self.request.query_params.get('UserID')
        status = self.request.query_params.get('Status')
        if user_id:
            queryset = queryset.filter(UserID=user_id)
        if status:
            queryset = queryset.filter(Status=status)
        return queryset

    # This function is called when a POST request is made to the endpoint.
    # Need to create an Application instance in the database
    # only when there is no other Application with the same AdID and UserID.
    # If there is, then return a message that the user has already applied for this ad
    def create(self, request):
        # get AdID and UserID from request data
        ad_id = request.data['AdID']
        user_id = request.data['UserID']
        # check if there is an Application with the same AdID and UserID
        if Application.objects.filter(AdID=ad_id, UserID=user_id).exists():
            # if there is, return a message
            return Response(
                {'message': 'You have already applied for this ad'},
                status=status.HTTP_200_OK
            )
        else:
            # if there is not, create an Application instance in the database
            serializer = ApplicationSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class ExpandedAppViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all().order_by('-id')
    serializer_class = ExpandedAppSerializer

    def get_queryset(self):
        params = self.request.query_params.dict()
        if len(params) > 0:
            queryset = Application.objects.filter(UserID=params['id'])
        else:
            return []
        return queryset


@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class ManagerAppViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ExpandedAppSerializer

    def get_queryset(self):
        params = self.request.query_params.dict()
        if len(params) > 0 and 'StatusID' in params.keys():
            if params['StatusID'] == '0':
                queryset = Application.objects.all()
            else:
                queryset = Application.objects.filter(StatusID=params['StatusID'])
        else:
            return []

        if 'min_da' in params.keys():
            queryset = queryset.filter(DateAdded__gte=datetime.strptime(params['min_da'], '%Y-%m-%d'))
        if 'max_da' in params.keys():
            queryset = queryset.filter(DateAdded__lte=datetime.strptime(params['max_da'], '%Y-%m-%d'))
        if 'min_la' in params.keys():
            queryset = queryset.filter(DateLastAction__gte=datetime.strptime(params['min_la'], '%Y-%m-%d'))
        if 'max_la' in params.keys():
            queryset = queryset.filter(DateLastAction__lte=datetime.strptime(params['max_la'], '%Y-%m-%d'))
        return queryset


@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer

    def get_queryset(self):
        queryset = Status.objects.all()
        params = self.request.query_params.dict()
        if len(params) > 0:
            if 'id' in params.keys():
                if params['id'] == '1' or params['id'] == '3':
                    queryset = Status.objects.filter(StatusID='4')
                elif params['id'] == '2':
                    queryset = Status.objects.filter(StatusID='3') | Status.objects.filter(StatusID='4')
                else:
                    return []
        return queryset
