from .common import QuestionSerializer
from answers.serializers.common import AuxiliaryAnswerSerializer



class PopulatedQuestionSerializer(QuestionSerializer):
    answers = AuxiliaryAnswerSerializer(many=True)