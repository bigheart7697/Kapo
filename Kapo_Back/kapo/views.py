from django.core.exceptions import ValidationError, PermissionDenied
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .tasks import update_order_state

from kapo.serializers import *
from .filters import *
from .permissions import *


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
    permission_classes = [permissions.IsAuthenticated, IsNotOwnerOfOrderedProduct]

    def perform_create(self, serializer):
        try:
            product = Product.objects.get(id=self.kwargs['pk'])
            remaining_quantity = product.quantity
            order_count = int(self.request.data['count'])
            if product.owner == self.request.user:
                raise PermissionDenied()
            if order_count > remaining_quantity:
                raise ValidationError('The count ordered exceeds product quantity')
            else:
                product.quantity = remaining_quantity - order_count
                product.save()
                order = serializer.save(customer=self.request.user,
                                        product=product)
                update_order_state(order.id)

        except Product.DoesNotExist:
            return Response(self.request.data, status=status.HTTP_404_NOT_FOUND)


class ProductSearchView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filter_class = ProductFilter
    search_fields = ['name', 'description']
    ordering_fields = ['production_year', 'price', 'created']


class CustomerOrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated, IsCustomerOfOrderedProduct]

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user)


class CustomerOrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated, IsCustomerOfOrderedProduct]

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user)


class OwnerOrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOfOrderedProduct]

    def get_queryset(self):
        return Order.objects.filter(product__owner=self.request.user)


class ProductOrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOfOrderedProduct]

    def get_queryset(self):
        Order.objects.filter(product__id=self.kwargs['pk'])


class OwnerOrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated, IsCustomerOfOrderedProduct]

    def get_queryset(self):
        return Order.objects.filter(product__owner=self.request.user)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated, IsCustomerOfOrderedProduct])
def order_complete_view(request, pk):
    try:
        order = Order.objects.get(id=pk)
        if order.state != order.State.AWAITING:
            raise ValidationError("Operation failed. This order is {}".format(order.state))
        else:
            order.state = order.State.COMPLETED
            order.save()
            return Response(request.data, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response(request.data, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated, IsCustomerOfOrderedProduct])
def order_fail_view(request, pk):
    try:
        order = Order.objects.get(id=pk)
        product = order.product
        if order.state != order.State.AWAITING:
            raise ValidationError("Operation failed. This order is {}".format(order.state))
        else:
            order.state = order.State.FAILED
            product.quantity += order.count
            order.save()
            product.save()
            return Response(request.data, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response(request.data, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated, IsCustomerOfOrderedProduct])
def order_cancel_view(request, pk):
    try:
        order = Order.objects.get(id=pk)
        product = order.product
        if order.state != order.State.AWAITING:
            raise ValidationError("Operation failed. This order is {}".format(order.state))
        else:
            order.state = order.State.CANCELED
            product.quantity += order.count
            order.save()
            product.save()
            return Response(request.data, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response(request.data, status=status.HTTP_404_NOT_FOUND)


def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})


def ping(request):
    return JsonResponse({'result': 'OK'})


def categories(request):
    return JsonResponse({'categories': Product.Category.choices})
