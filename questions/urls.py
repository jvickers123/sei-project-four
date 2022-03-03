from django.urls import path
from .views import QuestionListView, QuestionDetailView

urlpatterns = [
    path('', QuestionListView.as_view()),
    path('<int:pk>/', QuestionDetailView.as_view())
]