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
from Kapo_Back.kapo import views
from django.conf.urls import url


urlpatterns = [
    path('', views.ProductListView.as_view()),
    url(r'add-product', views.ProductCreateView.as_view(), name='add_product'),
    url(r'^product/(?P<pk>\d+)$', views.ProductDetailView.as_view()),
    url(r'^product/(?P<pk>\d+)/order', views.OrderCreateView.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
