from django.urls import path

from .views import *

urlpatterns = [
    path('current-user/', current_user, name='current-user'),
    path('register/', UserCreateView.as_view(), name="register"),
    path('<int:pk>/', ProfileDetailView.as_view(), name="profile"),
    path('increase-balance/<int:pk>/', balance_increase_view, name="increase-balance"),
]
