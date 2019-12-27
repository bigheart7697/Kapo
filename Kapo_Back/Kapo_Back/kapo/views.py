from rest_framework import generics, status
from rest_framework.response import Response

from Kapo_Back.kapo.models import *
from Kapo_Back.kapo.serializers import *
from rest_framework import permissions


class ProductCreateView(generics.CreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=Profile.objects.get(user=self.request.user))


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class ProductDetailView(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [permissions.IsAuthenticated]


class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        try:
            product = Product.objects.get(id=self.kwargs['pk'])
            remaining_quantity = product.quantity
            order_count = int(self.request.data['count'])
            if order_count > remaining_quantity:
                content = {'error_message': 'The count ordered exceeds product quantity'}
                return Response(content, status=status.HTTP_412_PRECONDITION_FAILED)
            else:
                product.quantity = remaining_quantity - order_count
                product.save()
                serializer.save(customer=Profile.objects.get(user=self.request.user),
                                product=product)
        except Product.DoesNotExist:
            return Response(self.request.data, status=status.HTTP_404_NOT_FOUND)
