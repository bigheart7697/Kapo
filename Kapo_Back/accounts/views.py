from rest_framework.decorators import api_view
from rest_framework.generics import *
from rest_framework.permissions import *
from rest_framework.response import Response

from accounts.permissions import IsOwnerProfileOrReadOnly
from accounts.serializers import *


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserCreateView(CreateAPIView):
    serializer_class = UserSerializerWithToken


class ProfileDetailView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsOwnerProfileOrReadOnly, IsAuthenticated]
