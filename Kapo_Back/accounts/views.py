from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import *
from rest_framework.permissions import *
from rest_framework.response import Response
from rest_framework.views import APIView

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


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def balance_increase_view(request, pk):
    try:
        user = User.objects.get(id=pk)
        amount = int(request.data['amount'])
        user.balance += amount
        return Response(request.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response(request.data, status=status.HTTP_404_NOT_FOUND)
