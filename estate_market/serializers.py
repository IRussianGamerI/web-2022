from rest_framework.fields import CharField

from estate_market.models import Seller, Ad, User, Application, Status
from rest_framework import serializers


class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = ['SellerID', 'DateSignUp', 'FirstName', 'LastName', 'Telephone']


class AdSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ad
        fields = "__all__"


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = "__all__"


# contains all info about the application (seller, ad, status)
class ExpandedAppSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = "__all__"
        depth = 2  # depth = 2 not 1 because of the seller being in the ad


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
