"""Kapo_Back URL Configuration

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
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework_jwt.views import obtain_jwt_token
from django.views.generic import TemplateView
from django.conf.urls.static import static

from . import settings
from .settings import DEBUG

urlpatterns = [
    path('admin/', admin.site.urls),

    path('token-auth/', obtain_jwt_token, name='token-auth'),

    path('accounts/', include("accounts.urls")),
    path('kapo/', include('kapo.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if not DEBUG:
    urlpatterns.append(re_path(".*", TemplateView.as_view(template_name="index.html")))
