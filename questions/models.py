from django.db import models

# Create your models here.
class Question(models.Model):
    text = models.CharField(max_length=250, default=None)
    owner = models.ForeignKey(
        "jwt_auth.User", 
        related_name="questions_owned",
        on_delete = models.CASCADE,
        null=True
    )

    def __str__(self):
        return self.text