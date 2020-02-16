from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import *
from rest_framework.permissions import *
from rest_framework.response import Response

from accounts.permissions import IsOwnerProfileOrReadOnly
from accounts.serializers import *
from kapo.models import BalanceIncrease
from kapo.serializers import BalanceIncreaseSerializer


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


class BalanceIncreaseCreateVIew(CreateAPIView):
    serializer_class = BalanceIncreaseSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BalanceIncreaseDetailView(RetrieveAPIView):
    serializer_class = BalanceIncreaseSerializer

    def get_queryset(self):
        return BalanceIncrease.objects.filter(user=self.request.user)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def increase_balance_complete_view(request, pk):
    try:
        increase_balance = BalanceIncrease.objects.get(id=pk)
        if increase_balance.state != increase_balance.State.AWAITING:
            raise ValidationError("Operation failed. This object is {}".format(increase_balance.state))
        else:
            increase_balance.state = increase_balance.State.COMPLETED
            return Response(request.data, status=status.HTTP_200_OK)
    except BalanceIncrease.DoesNotExist:
        return Response(request.data, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def increase_balance_fail_view(request, pk):
    try:
        increase_balance = BalanceIncrease.objects.get(id=pk)
        if increase_balance.state != increase_balance.State.AWAITING:
            raise ValidationError("Operation failed. This order is {}".format(increase_balance.state))
        else:
            transaction = increase_balance.get_transaction
            transaction.delete()
            increase_balance.delete()
            return Response(request.data, status=status.HTTP_200_OK)
    except BalanceIncrease.DoesNotExist:
        return Response(request.data, status=status.HTTP_404_NOT_FOUND)
