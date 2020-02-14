"""Kapo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from kapo import views
from django.conf.urls import url


urlpatterns = [
    path('', views.ProductListView.as_view(), name='index'),
    url(r'^add-product/$', views.ProductCreateView.as_view(), name='add_product'),
    url(r'^products/$', views.OwnerProductListView.as_view(), name='my-products'),
    url(r'^products/(?P<pk>\d+)/$', views.ProductDetailView.as_view()),
    url(r'^products/(?P<pk>\d+)/rate$', views.ProductRateView.as_view(), name='rate'),
    url(r'^products/(?P<pk>\d+)/order/$', views.OrderCreateView.as_view(), name='order'),
    url(r'^products/(?P<pk>\d+)/sponsor/$', views.SponsoredSearchCreateView.as_view(), name='banner'),
    url(r'^products/(?P<pk>\d+)/banner/$', views.BannerCreateView.as_view(), name='sponsor'),
    url(r'^search/$', views.ProductSearchView.as_view(), name='search'),
    url(r'^sponsored-search/$', views.SponsoredSearchView.as_view(), name='sponsored_search'),
    url(r'^orders/$', views.CustomerOrderListView.as_view(), name='customer-orders'),
    url(r'^products/(?P<pk>\d+)/orders/$', views.ProductOrderListView.as_view(), name='owner-product-orders'),
    url(r'^orders/(?P<pk>\d+)/$', views.CustomerOrderDetailView.as_view(), name='customer-order-detail'),
    url(r'^orders/(?P<pk>\d+)/complete/$', views.order_complete_view, name='customer-order-complete'),
    url(r'^orders/(?P<pk>\d+)/cancel/$', views.order_cancel_view, name='customer-order-cancel'),
    url(r'^orders/(?P<pk>\d+)/fail/$', views.order_fail_view, name='customer-order-fail'),
    url(r'^ordered-products/$', views.OwnerOrderListView.as_view(), name='owner-orders'),
    url(r'^ordered-products/(?P<pk>\d+)/$', views.OwnerOrderDetailView.as_view(), name='owner-order-detail'),

    url(r'^first-banners/$', views.BannerFirstListView.as_view(), name='first-banners'),
    url(r'^second-banners/$', views.BannerSecondListView.as_view(), name='second-banners'),
    url(r'^third-banners/$', views.BannerThirdListView.as_view(), name='third-banners'),
    url(r'^my-banners/$', views.OwnerBannerListView.as_view(), name='my-banners'),
    url(r'^banner-count/(?P<banner_id>\d+)/$', views.get_pending_banners_count, name='pending-banners'),
    url(r'^banners/(?P<pk>\d+)/$', views.BannerDetailView.as_view(), name='banner-detail'),
    url(r'^banners/(?P<pk>\d+)/complete/$', views.banner_complete_view, name='banner-complete'),
    url(r'^banners/(?P<pk>\d+)/fail/$', views.banner_fail_view, name='banner-fail'),

    url(r'^sponsors/(?P<pk>\d+)/complete/$', views.sponsor_complete_view, name='sponsor-complete'),
    url(r'^sponsors/(?P<pk>\d+)/fail/$', views.sponsor_fail_view, name='sponsor-fail'),
    url(r'^my-sponsors/$', views.OwnerSponsorSearchListView.as_view(), name='my-sponsors'),

    url(r'^transaction/(?P<pk>\d+)/$', views.TransactionDetailView.as_view(), name='transaction-detail'),

    path('csrf/', views.csrf),
    path('ping/', views.ping),
    url(r'^cat-hierarchy/$', views.cat_hierarchy, name='cat-hierarchy'),
    url(r'^prod-cats/$', views.cat1_categories, name='cat1'),
    url(r'^prod-cats/(?P<cat1>\d+)/$', views.cat2_categories, name='cat2'),
    url(r'^prod-cats/(?P<cat1>\d+)/(?P<cat2>\d+)/$', views.cat3_categories, name='cat3'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
