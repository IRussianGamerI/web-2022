from estate_market.models import Customer, Seller, Ad, Flat, Type, Basket
from rest_framework import serializers


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['CustomerID', 'DateSignUp', 'FirstName', 'LastName']


class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = ['SellerID', 'DateSignUp', 'FirstName', 'LastName', 'Telephone']


class AdSerializer(serializers.ModelSerializer):
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


class FlatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flat
        fields = ['FlatID', 'Area', 'Address', 'Floor', 'TypeID', 'Balcony', 'YearBuilt',
                  'BuildTech']


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ['TypeID', 'Name', 'NumBedrooms']


class BasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Basket
        fields = ['id', 'CustomerID', 'AdID', 'Status']


class ExpandedBasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Basket
        fields = ['id', 'CustomerID', 'AdID', 'Status']
        depth = 2
