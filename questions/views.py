from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# exceptions
from rest_framework.exceptions import NotFound, PermissionDenied

# serializers
from .serializers.common import QuestionSerializer
from .serializers.populated import PopulatedQuestionSerializer
from answers.serializers.common import AnswerSerializer

# models
from .models import Question

# Create your views here.
class QuestionListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        questions = Question.objects.all()
        serialized_questions = QuestionSerializer(questions, many=True)
        return Response(serialized_questions.data, status = status.HTTP_200_OK)

    def post(self, request):

        answer_1 = request.data['answer1']
        answer_2 = request.data['answer2']
        question = request.data['question']

        answer_1['owner'] = request.user.id
        answer_2['owner'] = request.user.id
        question['owner'] = request.user.id

        serialized_question = QuestionSerializer(data=question)

        try:

            serialized_question.is_valid()
            serialized_question.save()

            answer_1['question'] = serialized_question.data['id']
            answer_2['question'] = serialized_question.data['id']

            serialized_answer_1 = AnswerSerializer(data=answer_1)
            serialized_answer_2 = AnswerSerializer(data=answer_2)

            serialized_answer_1.is_valid()
            serialized_answer_1.save()

            serialized_answer_2.is_valid()
            serialized_answer_2.save()

            return Response(serialized_question.data, status=status.HTTP_201_CREATED)

        except AssertionError as e:
            return Response({"detail": str(e) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except KeyError as e:
            print(e)
            return Response({ "detail": "missing field"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response({ "detail": "failed to add question"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class QuestionDetailView(APIView):
    
    permission_classes = (IsAuthenticatedOrReadOnly, )

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

        if question.owner != request.user:
            raise PermissionDenied(detail="Unauthorised")

        try:
            serialized_question.is_valid()
            serialized_question.save()
            return Response(serialized_question.data, status=status.HTTP_202_ACCEPTED)
        except AssertionError as e:
            return Response({ "detail": str(e) }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response("Unprocessable Entity", status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        question = self.get_question(pk=pk)

        if question.owner != request.user:
            raise PermissionDenied(detail="Unauthorised")

        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

