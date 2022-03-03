from asyncio import exceptions
from xml.dom import ValidationErr
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from django.contrib.auth import get_user_model

#exceptions
from rest_framework.exceptions import PermissionDenied
from django.forms import ValidationError

# serializers
from .serializers.common import UserSerializer

User = get_user_model()

# Create your views here.

class RegisterView(APIView):

    def post(self, request):
        user_to_create = UserSerializer(data=request.data)

        try:
            user_to_create.is_valid()
            user_to_create.save()
            return Response(user_to_create.data, status=status.HTTP_201_CREATED)
        
        except ValidationError as e:
            return Response({ "detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except AssertionError as e:
            return Response({ "detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

