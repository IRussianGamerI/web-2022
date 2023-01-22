from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


# info about seller. It is provided when customer is approved by the manager
class Seller(models.Model):
    SellerID = models.AutoField(primary_key=True)
    DateSignUp = models.DateTimeField(blank=True, null=False)
    FirstName = models.CharField(max_length=30, blank=True, null=False)
    LastName = models.CharField(max_length=30, blank=True, null=False)
    Telephone = models.CharField(max_length=20, blank=True, null=True)


# info about advertisement
class Ad(models.Model):
    # Ad info
    AdID = models.AutoField(primary_key=True)
    Price = models.IntegerField(blank=False, null=False)
    Title = models.CharField(max_length=120, blank=False, null=False)
    Description = models.CharField(max_length=500, blank=True, null=True)
    CreationDate = models.DateTimeField(blank=True, null=False, default=timezone.now)

    Active = models.BooleanField(blank=False, null=False, default=True)

    # Seller info
    SellerID = models.ForeignKey(Seller, models.DO_NOTHING, db_column='SellerID', blank=False, null=False)
    SaleDate = models.DateTimeField(blank=True, null=True)

    # Flat info
    Address = models.CharField(max_length=150, blank=False, null=False)
    Area = models.FloatField(null=False)
    Floor = models.IntegerField(null=False)
    RoomNum = models.IntegerField(null=False)
    Balcony = models.BooleanField(null=False)

    Photo = models.ImageField(blank=True, null=True)


# Status of the for the purchase application
class Status(models.Model):
    StatusID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=60, blank=False, null=False)


class Application(models.Model):
    UserID = models.ForeignKey(User, models.DO_NOTHING, db_column='UserID', blank=False, null=False)
    AdID = models.ForeignKey(Ad, models.DO_NOTHING, db_column='AdID', blank=False, null=False)
    StatusID = models.ForeignKey(Status, models.DO_NOTHING, db_column='StatusID', blank=False, null=False, default=1)
    # three dates - HW requirement
    DateAdded = models.DateTimeField(blank=False, null=False, default=timezone.now)
    DateLastAction = models.DateTimeField(blank=False, null=False, default=timezone.now)
    DateFinished = models.DateTimeField(blank=True, null=True)