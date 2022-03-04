from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from datetime import datetime, timedelta
import jwt
from django.conf import settings
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from django.contrib.auth import get_user_model

#exceptions
from rest_framework.exceptions import PermissionDenied, NotFound
from django.forms import ValidationError

# serializers
from .serializers.common import UserSerializer
from .serializers.populated import PopulatedUserSerializer

User = get_user_model()

# Create your views here.

class RegisterView(APIView):

    def post(self, request):
        user_to_create = UserSerializer(data=request.data)

        try:
            user_to_create.is_valid()
            print('errors ----> ', user_to_create.errors)
            user_to_create.save()
            return Response(user_to_create.data, status=status.HTTP_201_CREATED)
        
        except ValidationError as e:
            return Response({ "detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except AssertionError as e:
            return Response({ "detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):

    def post(self, request):
        
        try:
            user_to_login = User.objects.get(email=request.data.get('email'))
        except User.DoesNotExist:
            return PermissionDenied(detail="Unauthorised")
        
        if not user_to_login.check_password(request.data.get('password')):
            return PermissionDenied(detail="Unauthorised")

        dt = datetime.now() + timedelta(days=7)

        token = jwt.encode({
            'sub': user_to_login.id,
            'exp': int(dt.strftime('%s'))
        }, settings.SECRET_KEY, 'HS256')


        return Response({
            'token': token,
            'message': f"Welcome back {user_to_login.first_name}!"
        }, status=status.HTTP_202_ACCEPTED)

class UserListView(APIView):

    def get(self, _request):
        users = User.objects.all()
        serialized_users = UserSerializer(users, many=True)
        return Response(serialized_users.data, status = status.HTTP_200_OK)

class UserDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound(detail="User Not Found")

    def get(self, _request, pk):
        user = self.get_user(pk=pk)
        serialised_user = PopulatedUserSerializer(user)
        return Response(serialised_user.data, status=status.HTTP_202_ACCEPTED)

    def put(self, request, pk):
        user = self.get_user(pk=pk)
        serialized_user = UserSerializer(user, data=request.data, partial=True)
        try:
            serialized_user.is_valid()
            print('erorrs ---->', serialized_user.errors)
            serialized_user.save()
            return Response(serialized_user.data, status=status.HTTP_202_ACCEPTED)
        except AssertionError as e:
            return Response({ "detail": str(e) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        # except:
        #     return Response("Unprocessable Entity", status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        user = self.get_user(pk=pk)
        if user.id != request.user.id:
            raise PermissionDenied(detail="Unauthorised")
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)