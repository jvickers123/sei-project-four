from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# serializers
from .serializers.common import AnswerSerializer

# models
from .models import Answer

# Create your views here.
class AnswerListView(APIView):

    def get(self, _request):
        answers = Answer.objects.all()
        serialized_answers = AnswerSerializer(answers, many=True)
        return Response(serialized_answers.data, status = status.HTTP_200_OK)