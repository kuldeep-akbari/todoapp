from django.db import models
from numpy import empty

# Create your models here.

class Item(models.Model):
    id = models.AutoField(primary_key = True)
    name = models.CharField(max_length=80)
    created_date = models.DateTimeField()
    expiration_date = models.DateTimeField(null=True)

# class ItemExpiration(models.Model):
#     id = models.AutoField(primary_key = True)
#     item = models.ForeignKey(Item, on_delete=models.CASCADE, unique=True)
#     expiration_date = models.DateTimeField()