from rest_framework import generics, status
from rest_framework.response import Response
from kapo.serializers import *
from rest_framework import filters
from rest_framework import permissions
from .permissions import *
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.middleware.csrf import get_token


class ProductCreateView(generics.CreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class OwnerProductListView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        return Product.objects.filter(owner=self.request.user)


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [IsOwnerOrReadOnly]


class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        try:
            product = Product.objects.get(id=self.kwargs['pk'])
            remaining_quantity = product.quantity
            order_count = int(self.request.data['count'])
            if order_count > remaining_quantity:
                raise ValidationError('The count ordered exceeds product quantity')
            else:
                product.quantity = remaining_quantity - order_count
                product.save()
                serializer.save(customer=User.objects.get(id=self.request.user.id),
                                product=product)
        except Product.DoesNotExist:
            return Response(self.request.data, status=status.HTTP_404_NOT_FOUND)


class ProductSearchView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']


def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})


def ping(request):
    return JsonResponse({'result': 'OK'})
