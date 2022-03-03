from functools import partial
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# exceptions
from rest_framework.exceptions import NotFound

# serializers
from .serializers.common import QuestionSerializer
from .serializers.populated import PopulatedQuestionSerializer

# models
from .models import Question

# Create your views here.
class QuestionListView(APIView):

    def get(self, _request):
        questions = Question.objects.all()
        serialized_questions = QuestionSerializer(questions, many=True)
        return Response(serialized_questions.data, status = status.HTTP_200_OK)

class QuestionDetailView(APIView):
        
    def get_question(self, pk):
        try:
            return Question.objects.get(pk=pk)
        except Question.DoesNotExist:
            raise NotFound(detail="Question not found.")

    def get(self, _request, pk):
        question = self.get_question(pk=pk)
        serialized_question = PopulatedQuestionSerializer(question)
        return Response(serialized_question.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        question = self.get_question(pk=pk)
        serialized_question = QuestionSerializer(question, data=request.data, partial=True)
        try:
            serialized_question.is_valid()
            serialized_question.save()
            return Response(serialized_question.data, status=status.HTTP_202_ACCEPTED)
        except AssertionError as e:
            return Response({ "detail": str(e) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response("Unprocessable Entity", status=status.HTTP_422_UNPROCESSABLE_ENTITY)