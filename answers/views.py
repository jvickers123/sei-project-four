from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# serializers
from .serializers.common import AnswerSerializer

# exceptions
from rest_framework.exceptions import NotFound, PermissionDenied

# models
from .models import Answer

# Create your views here.
class AnswerListView(APIView):

    def get(self, _request):
        answers = Answer.objects.all()
        serialized_answers = AnswerSerializer(answers, many=True)
        return Response(serialized_answers.data, status = status.HTTP_200_OK)

class AnswerDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )
    
    def get_answer(self, pk):
        try:
            return Answer.objects.get(pk=pk)
        except Answer.DoesNotExist:
            raise NotFound(detail="Answer not found.")

    def get(self, _request, pk):
        answer = self.get_answer(pk=pk)
        serialized_answer = AnswerSerializer(answer)
        return Response(serialized_answer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        
        answer = self.get_answer(pk=pk)
        serialized_answer = AnswerSerializer(answer, data=request.data, partial=True)
        
        if answer.owner != request.user:
            raise PermissionDenied(detail="Unauthorised")

        try:
            serialized_answer.is_valid()
            serialized_answer.save()
            return Response(serialized_answer.data, status=status.HTTP_202_ACCEPTED)

        except Answer.DoesNotExist:
            raise NotFound(detail="Answer not found")
        except:
            return Response({"detail": serialized_answer.errors}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        