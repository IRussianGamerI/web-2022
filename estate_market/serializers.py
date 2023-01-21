from rest_framework.fields import CharField

from estate_market.models import Customer, Seller, Ad, Flat, Type, User, Application, Status
from rest_framework import serializers


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['CustomerID', 'DateSignUp', 'FirstName', 'LastName']


class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = ['SellerID', 'DateSignUp', 'FirstName', 'LastName', 'Telephone']


class FlatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flat
        fields = ['FlatID', 'Area', 'Address', 'Floor', 'TypeID', 'Balcony', 'YearBuilt',
                  'BuildTech']


class AdSerializer(serializers.ModelSerializer):
    FlatID = FlatSerializer()

    class Meta:
        model = Ad
        fields = ['AdID',
                  'Price',
                  'CustomerID',
                  'Title',
                  'Description',
                  'Status',
                  'CreationDate',
                  'SaleDate',
                  'SellerID',
                  'FlatID',
                  'Photo']


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ['TypeID', 'Name', 'NumBedrooms']


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'UserID', 'AdID', 'StatusID', 'DateAdded', 'DateLastAction', 'DateFinished']


class ExpandedAppSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = "__all__"
        depth = 2


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ['StatusID', 'Name']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class LoginRequestSerializer(serializers.Serializer):
    model = User
    username = CharField(required=True)
    password = CharField(required=True)
