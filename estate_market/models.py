from django.db import models
from django.contrib.auth.models import User


class Seller(models.Model):
    SellerID = models.AutoField(primary_key=True)
    DateSignUp = models.DateTimeField(blank=True, null=False)
    FirstName = models.CharField(max_length=30, blank=True, null=False)
    LastName = models.CharField(max_length=30, blank=True, null=False)
    Telephone = models.CharField(max_length=20, blank=True, null=True)


class Type(models.Model):
    TypeID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=30, blank=False, null=False)
    NumBedrooms = models.IntegerField(null=False)


class Flat(models.Model):
    FlatID = models.AutoField(primary_key=True)
    Area = models.FloatField(null=False)
    Address = models.CharField(max_length=150, blank=False, null=False)
    Floor = models.IntegerField(null=False)
    TypeID = models.ForeignKey(Type, models.DO_NOTHING, db_column='TypeID')
    Balcony = models.BooleanField(null=False)
    YearBuilt = models.IntegerField(null=True)
    BuildTech = models.CharField(max_length=30, blank=True, null=True)


class Customer(models.Model):
    CustomerID = models.AutoField(primary_key=True)
    DateSignUp = models.DateTimeField(blank=True, null=False)
    FirstName = models.CharField(max_length=30, blank=True, null=False)
    LastName = models.CharField(max_length=30, blank=True, null=False)


class Ad(models.Model):
    AdID = models.AutoField(primary_key=True)
    Price = models.IntegerField(blank=False, null=False)
    CustomerID = models.ForeignKey(Customer, models.DO_NOTHING, db_column='CustomerID', blank=True, null=True)
    Title = models.CharField(max_length=120, blank=False, null=False)
    Description = models.CharField(max_length=500, blank=True, null=True)
    Status = models.CharField(max_length=30, blank=True, null=False)
    CreationDate = models.DateTimeField(blank=True, null=False)
    SaleDate = models.DateTimeField(blank=True, null=True)
    SellerID = models.ForeignKey(Seller, models.DO_NOTHING, db_column='SellerID', blank=False, null=False)
    FlatID = models.ForeignKey(Flat, models.DO_NOTHING, db_column='FlatID', blank=False, null=False)
    Photo = models.ImageField(blank=True, null=True)


class Basket(models.Model):
    UserID = models.ForeignKey(User, models.DO_NOTHING, db_column='UserID', blank=False, null=False)
    AdID = models.ForeignKey(Ad, models.DO_NOTHING, db_column='AdID', blank=False, null=False)
    Status = models.TextField(blank=False, null=False)
