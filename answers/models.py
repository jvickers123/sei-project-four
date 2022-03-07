from django.db import models

# Create your models here.
class Answer(models.Model):
    text = models.CharField(max_length=50, default=None)
    question = models.ForeignKey(
        "questions.Question",
        related_name = "answers",
        on_delete = models.CASCADE,
    )
    owner = models.ForeignKey(
        "jwt_auth.User", 
        related_name="answers_owned",
        on_delete = models.CASCADE
    )

    def __str__(self):
        return self.text