from accounts.models import User
from .permissions import IsStaff
from accounts.serializers import UserSerializer
from rest_framework import generics


class UsersListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsStaff]
    queryset = User.objects.all().order_by("-date_joined")


