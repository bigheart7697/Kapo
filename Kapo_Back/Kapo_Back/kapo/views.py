from rest_framework import generics
from Kapo_Back.kapo.models import Product
from Kapo_Back.kapo.serializers import ProductSerializer
from rest_framework import permissions


class ProductCreate(generics.CreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProductList(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
