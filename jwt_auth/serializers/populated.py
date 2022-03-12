from .common import UserSerializer
from questions.serializers.populated import PopulatedQuestionSerializer
from answers.serializers.populated import PopulatedAnswerSerializer
from answers.serializers.common import AnswerSerializer

class PopulatedUserSerializer(UserSerializer):
    likes_sent = UserSerializer(many=True)
    likes_recieved = UserSerializer(many=True)
    matches = UserSerializer(many=True)
    questions_owned = PopulatedQuestionSerializer(many=True)
    answers = PopulatedAnswerSerializer(many=True)