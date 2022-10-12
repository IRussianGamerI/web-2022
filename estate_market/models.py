from django.db import models


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
    Type = models.ForeignKey(Type, models.DO_NOTHING, db_column='TypeID')
    Balcony = models.BooleanField(null=False)
    YearBuilt = models.IntegerField(null=True)
    BuildTech = models.CharField(max_length=30, blank=True, null=True)


class Ad(models.Model):
    AdID = models.AutoField(primary_key=True)
    Title = models.CharField(max_length=120, blank=False, null=False)
    Description = models.CharField(max_length=500, blank=True, null=True)
    Status = models.CharField(max_length=30, blank=True, null=False)
    CreationDate = models.DateTimeField(blank=True, null=False)
    SellerID = models.ForeignKey(Seller, models.DO_NOTHING, db_column='SellerID')
    FlatID = models.ForeignKey(Flat, models.DO_NOTHING, db_column='FlatID')


class Customer(models.Model):
    CustomerID = models.AutoField(primary_key=True)
    DateSignUp = models.DateTimeField(blank=True, null=False)
    FirstName = models.CharField(max_length=30, blank=True, null=False)
    LastName = models.CharField(max_length=30, blank=True, null=False)


class Order(models.Model):
    OrderID = models.AutoField(primary_key=True)
    CustomerID = models.ForeignKey(Customer, models.DO_NOTHING, db_column='CustomerID')
    AdID = models.ForeignKey(Ad, models.DO_NOTHING, db_column='AdID')
    Status = models.CharField(max_length=30, blank=True, null=False)
    OrderStartDate = models.DateField(blank=True, null=False)
    OrderEndDate = models.DateField(blank=True, null=False)
