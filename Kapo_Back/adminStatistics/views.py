from accounts.models import User
from kapo.models import Transaction, Banner, SponsoredSearch
from .permissions import IsStaff
from accounts.serializers import UserSerializer
from kapo.serializers import TransactionSerializer, BannerSerializer, SponsoredSearchSerializer
from rest_framework import generics, permissions


class UsersListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsStaff]
    queryset = User.objects.all().order_by("-date_joined")


class TransactionsListView(generics.ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated, IsStaff]
    queryset = Transaction.objects.all()


class BannersListView(generics.ListAPIView):
    serializer_class = BannerSerializer
    permission_classes = [permissions.IsAuthenticated, IsStaff]
    queryset = Banner.objects.all()


class SponsoredSearchesListView(generics.ListAPIView):
    serializer_class = SponsoredSearchSerializer
    permission_classes = [permissions.IsAuthenticated, IsStaff]
    queryset = SponsoredSearch.objects.all()


