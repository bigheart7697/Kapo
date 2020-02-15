from django.urls import path

from .views import *

urlpatterns = [
    path('user_statistics/', UsersListView.as_view(), name='user_statistics'),
    path('transaction_statistics/', TransactionsListView.as_view(), name='transaction_statistics'),
    path('all_banners/', BannersListView.as_view(), name='all_banners'),
    path('all_sponsored_searches/', SponsoredSearchesListView.as_view(), name='all_sponsored_searches'),
    path('all_campaigns/', CampaignsListView.as_view(), name='all_campaigns'),
]
