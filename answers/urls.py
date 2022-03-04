from django.urls import path
from .views import AnswerListView, AnswerDetailView

urlpatterns = [
    path('', AnswerListView.as_view()),
    path('<int:pk>/', AnswerDetailView.as_view())
]