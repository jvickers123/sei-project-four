from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    profile_pic = models.CharField(max_length=500)
    pictures = ArrayField(
        models.CharField(max_length=500), 
        size=5,
        default=list
    )
    location = models.CharField(max_length=50)
    latitude = models.IntegerField(default=0)
    longitude = models.IntegerField(default=0)
    age = models.IntegerField(default=0)
    gender = models.CharField(max_length=50)
    interested_in = models.CharField(max_length=50)