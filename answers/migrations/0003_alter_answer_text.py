# Generated by Django 4.0.3 on 2022-03-07 22:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('answers', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='text',
            field=models.CharField(default=None, max_length=50),
        ),
    ]
