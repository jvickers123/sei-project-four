from .common import AnswerSerializer
from questions.serializers.populated import PopulatedQuestionSerializer

class PopulatedAnswerSerializer(AnswerSerializer):
    question = PopulatedQuestionSerializer()