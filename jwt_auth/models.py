from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    username=None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    profile_pic = models.CharField(max_length=500, blank=True)
    pictures = ArrayField(
        models.CharField(max_length=500), 
        default=list,
        blank=True
    )
    location = models.CharField(max_length=50, blank=True)
    latitude = models.FloatField(default=0)
    longitude = models.FloatField(default=0)
    age = models.IntegerField(default=0)
    gender = models.CharField(max_length=50, blank=True)
    interested_in = models.CharField(max_length=50, blank=True)
    matches = models.ManyToManyField("self", blank=True)
    answers = models.ManyToManyField(
        "answers.Answer",
        symmetrical=False, 
        blank=True, 
        default=list
    )
    likes_sent = models.ManyToManyField(
        "self", 
        symmetrical=False, 
        blank=True,
        related_name="likes_recieved",
        default=list,
        )

    
    
    def __str__(self):
        return self.first_name