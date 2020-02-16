from django.urls import path

from .views import *

urlpatterns = [
    path('current-user/', current_user, name='current-user'),
    path('register/', UserCreateView.as_view(), name="register"),
    path('<int:pk>/', ProfileDetailView.as_view(), name="profile"),
    path('increase-balance/', BalanceIncreaseCreateVIew.as_view(), name="increase-balance"),
    path('increase-balance/<int:pk>', BalanceIncreaseDetailView, name='increase-balance-datail'),
    path('balance/<int:pk>/complete/', increase_balance_complete_view, name='complete-balance-increase'),
    path('balance/<int:pk>/fail/', increase_balance_fail_view, name='fail-balance-increase'),
]
