from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

# exceptions
from django.core.exceptions import ValidationError

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    pass_confirmation = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("id", "email", "first_name", "last_name", "profile_pic", "pictures",
                "location", "latitude", "longitude", "age", "gender", "interested_in")
    
    def validate(self, data):
        password = data.pop("password")
        password_confirmation = data.pop("password_confirmation")

        if password != password_confirmation:
            raise ValidationError({'password_confirmation': 'Does not match password'})
        
        data['password'] = make_password(password)
        
        return data


