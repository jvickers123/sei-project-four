from django.urls import path
from .views import RegisterView, LoginView, UserListView, UserDetailView, ChangePasswordView

urlpatterns = [
    path('profile/', UserListView.as_view()),
    path('profile/<int:pk>/', UserDetailView.as_view()),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('changepassword/<int:pk>/', ChangePasswordView.as_view())
]