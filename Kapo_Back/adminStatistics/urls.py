from django.urls import path

from .views import *

urlpatterns = [
    path('user_statistics/', UsersListView.as_view(), name='user_statistics'),
]
