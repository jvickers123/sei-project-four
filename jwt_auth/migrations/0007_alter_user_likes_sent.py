# Generated by Django 4.0.3 on 2022-03-03 21:55

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0006_alter_user_likes_sent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='likes_sent',
            field=models.ManyToManyField(blank=True, default=list, related_name='likes_recieved', to=settings.AUTH_USER_MODEL),
        ),
    ]
