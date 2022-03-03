from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# serializers
from .serializers.common import QuestionSerializer
from .serializers.populated import PopulatedQuestionSerializer

# models
from .models import Question

# Create your views here.
class QuestionListView(APIView):

    def get(self, _request):
        questions = Question.objects.all()
        serialized_questions = PopulatedQuestionSerializer(questions, many=True)
        return Response(serialized_questions.data, status = status.HTTP_200_OK)