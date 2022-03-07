from django.urls import path
from .views import RegisterView, LoginView, UserListView, UserDetailView, ChangePasswordView, ProfileDetailView

urlpatterns = [
    path('profile/', ProfileDetailView.as_view()),
    path('profiles/', UserListView.as_view()),
    path('profiles/<int:pk>/', UserDetailView.as_view()),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('changepassword/<int:pk>/', ChangePasswordView.as_view())
]