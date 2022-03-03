from .common import QuestionSerializer
from answers.serializers.common import AnswerSerializer

class PopulatedQuestionSerializer(QuestionSerializer):
    answers = AnswerSerializer(many=True)