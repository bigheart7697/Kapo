import datetime

from background_task.models import Task
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from kapo.serializers import *
from .filters import *
from .permissions import *
from .tasks import update_order_state, update_banner


class ProductCreateView(generics.CreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        cat1 = self.request.data['cat1']
        cat2 = self.request.data['cat2']
        cat3 = self.request.data['cat3']

        if cat2 != "" and cat2 not in Product.category_hierarchy[cat1]:
            raise ValidationError('{} is not a sub-category of {}'.format(cat2, cat1))
        if cat3 != "":
            if cat2 == "":
                raise ValidationError('Level 2 category not entered')
            elif cat3 not in Product.category_hierarchy[cat1][cat2]:
                raise ValidationError('{} is not a sub-category of {}'.format(cat3, cat2))

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

    def perform_destroy(self, instance):
        instance.available = False
        instance.save()
        return instance


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
    queryset = Product.objects.all().filter(available=True)
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
    permission_classes = [permissions.IsAuthenticated, IsOwnerOfProduct]

    def get_queryset(self):
        return Order.objects.filter(product__owner=self.request.user)


class ProductOrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOfProduct]

    def get_queryset(self):
        print(self.kwargs['pk'])
        return Order.objects.filter(product__id=self.kwargs['pk'])


class OwnerOrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated, IsCustomerOfOrderedProduct]

    def get_queryset(self):
        return Order.objects.filter(product__owner=self.request.user)


class SponsoredSearchCreateView(generics.CreateAPIView):
    serializer_class = SponsoredSearchSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOfProduct]

    def perform_create(self, serializer):
        try:
            product = Product.objects.get(id=self.kwargs['pk'])
            count = int(self.request.data['count'])
            phrases = self.request.data['search_phrases']
            remaining_count = count
            serializer.save(product=product, count=count, remaining_count=remaining_count,
                            search_phrases=phrases)

        except Product.DoesNotExist:
            return Response(self.request.data, status=status.HTTP_404_NOT_FOUND)


class SponsoredSearch(generics.ListAPIView):
    queryset = SponsoredSearch.objects.all().filter(valid=True)
    serializer_class = SponsoredSearchSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['search_phrases']
    ordering_fields = ['remaining_count']

    def get(self, request, *args, **kwargs):
        for sponsored_search in self.get_queryset():
            sponsored_search.remaining_count -= 1
            sponsored_search.save()
        return super(SponsoredSearch, self).get(request, *args, **kwargs)


class BannerCreateView(generics.CreateAPIView):
    serializer_class = BannerSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOfProduct]

    def perform_create(self, serializer):
        try:
            product = Product.objects.get(id=self.kwargs['pk'])
            days = int(self.request.data['days'])
            place = self.request.data['place']
            remaining_days = days
            serializer.save(product=product, days=days, remaining_days=remaining_days,
                            place=place)

        except Product.DoesNotExist:
            return Response(self.request.data, status=status.HTTP_404_NOT_FOUND)


class BannerDetailView(generics.RetrieveAPIView):
    serializer_class = BannerSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOfProduct]

    def get_queryset(self):
        return Banner.objects.filter(product__owner=self.request.user)


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


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated, IsOwnerOfProduct])
def sponsor_complete_view(request, pk):
    try:
        sponsored_search = SponsoredSearch.objects.get(id=pk)
        if sponsored_search.state != sponsored_search.State.AWAITING:
            raise ValidationError("Operation failed. This object is {}".format(sponsored_search.state))
        else:
            sponsored_search.state = sponsored_search.State.COMPLETED
            sponsored_search.save()
            return Response(request.data, status=status.HTTP_200_OK)
    except SponsoredSearch.DoesNotExist:
        return Response(request.data, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated, IsOwnerOfProduct])
def sponsor_fail_view(request, pk):
    try:
        sponsored_search = SponsoredSearch.objects.get(id=pk)
        if sponsored_search.state != sponsored_search.State.AWAITING:
            raise ValidationError("Operation failed. This order is {}".format(sponsored_search.state))
        else:
            sponsored_search.delete()
            return Response(request.data, status=status.HTTP_200_OK)
    except SponsoredSearch.DoesNotExist:
        return Response(request.data, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated, IsOwnerOfProduct])
def banner_complete_view(request, pk):
    try:
        banner = Banner.objects.get(id=pk)
        if banner.state != banner.State.AWAITING:
            raise ValidationError("Operation failed. This object is {}".format(banner.state))
        else:
            banner.state = banner.State.COMPLETED
            update_banner(banner.id, repeat=Task.DAILY,
                          repeat_until=datetime.datetime.now() + datetime.timedelta(days=banner.remaining_days))
            banner.save()
            return Response(request.data, status=status.HTTP_200_OK)
    except Banner.DoesNotExist:
        return Response(request.data, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated, IsOwnerOfProduct])
def banner_fail_view(request, pk):
    try:
        banner = Banner.objects.get(id=pk)
        if banner.state != banner.State.AWAITING:
            raise ValidationError("Operation failed. This order is {}".format(banner.state))
        else:
            banner.delete()
            return Response(request.data, status=status.HTTP_200_OK)
    except Banner.DoesNotExist:
        return Response(request.data, status=status.HTTP_404_NOT_FOUND)


def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})


def ping(request):
    return JsonResponse({'result': 'OK'})


def cat_hierarchy(request):
    return JsonResponse(Product.category_hierarchy)


def cat1_categories(request):
    return JsonResponse({'categories': Product.Cat1.choices})


def cat2_categories(request, cat1):
    labels = Product.Cat2.labels
    indices = list(Product.category_hierarchy[cat1].keys())
    cats = [(i, labels[int(i) - 1]) for i in indices]
    return JsonResponse({'categories': cats})


def cat3_categories(request, cat1, cat2):
    labels = Product.Cat3.labels
    indices = Product.category_hierarchy[cat1][cat2]
    cats = [(i, labels[int(i) - 1]) for i in indices]
    return JsonResponse({'categories': cats})
