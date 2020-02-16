import operator

from background_task.models import Task
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from kapo.serializers import *
from .filters import *
from .permissions import *
from .tasks import *


class ProductCreateView(generics.CreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated, HasEnoughBalance]

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
    queryset = Product.objects.filter(deleted=False)


class OwnerProductListView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        return Product.objects.filter(owner=self.request.user, deleted=False)


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [IsOwnerOrReadOnly]

    def perform_destroy(self, instance):
        instance.deleted = True
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
    queryset = Product.objects.all().filter(available=True, deleted=False)
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filter_class = ProductFilter
    search_fields = ['name', 'description']
    ordering_fields = ['production_year', 'price', 'created']

    def list(self, request, *args, **kwargs):
        sponsored_search_list = [obj.product.id for obj in SponsoredSearch.objects.filter(valid=True)]
        response = super(ProductSearchView, self).list(request, args, kwargs)
        response.data = [obj for obj in response.data if obj['id'] not in sponsored_search_list]
        ordering = request.query_params.get('ordering')
        if ordering and ordering == 'average_rating':
            response.data = sorted(response.data, key=operator.itemgetter(ordering.replace('-', ''), ))

            if "-" in ordering:
                response.data = sorted(response.data,
                                       key=lambda k: (k[ordering.replace('-', '')],),
                                       reverse=True)
            else:
                response.data = sorted(response.data, key=lambda k: (k[ordering],))
        return response


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


class SponsoredSearchView(generics.ListAPIView):
    queryset = SponsoredSearch.objects.filter(valid=True)
    serializer_class = SponsoredSearchSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['search_phrases']
    ordering_fields = ['remaining_count']

    def get(self, request, *args, **kwargs):
        for sponsored_search in self.get_queryset():
            sponsored_search.remaining_count -= 1
            sponsored_search.save()
        return super(SponsoredSearchView, self).get(request, *args, **kwargs)


class CampaignCreateView(generics.CreateAPIView):
    serializer_class = CampaignSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOfProduct]

    def perform_create(self, serializer):
        try:
            product = Product.objects.get(id=self.kwargs['pk'])
            campaigns = Campaign.objects.filter(product=product, remaining_days__gt=0)
            if len(campaigns) > 0:
                raise ValidationError('There is an existing campaign on this product')
            else:
                days = int(self.request.data['days'])
                discount = int(self.request.data['discount'])
                remaining_days = days
                serializer.save(product=product, days=days, remaining_days=remaining_days, discount=discount)

        except Product.DoesNotExist:
            return Response(self.request.data, status=status.HTTP_404_NOT_FOUND)


class OwnerCampaignListView(generics.ListAPIView):
    serializer_class = CampaignSerializer
    queryset = Banner.objects.filter(valid=True, state=Banner.State.COMPLETED)

    def get_queryset(self):
        return Campaign.objects.filter(product__owner=self.request.user)


class CampaignDetailView(generics.RetrieveAPIView):
    serializer_class = CampaignSerializer
    queryset = Campaign.objects.all()
    permission_classes = [IsOwnerOfProductOrReadOnly]


class BannerCreateView(generics.CreateAPIView):
    serializer_class = BannerSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOfProduct]

    def perform_create(self, serializer):
        try:
            product = Product.objects.get(id=self.kwargs['pk'])
            banners = Banner.objects.filter(product=product, remaining_days__gt=0)
            if len(banners) > 0:
                raise ValidationError('There is an existing banner on this product')
            days = int(self.request.data['days'])
            place = self.request.data['place']
            slogan = self.request.data['slogan']
            remaining_days = days
            serializer.save(product=product, days=days, remaining_days=remaining_days,
                            place=place, slogan=slogan)

        except Product.DoesNotExist:
            return Response(self.request.data, status=status.HTTP_404_NOT_FOUND)


class ProductCampaignListView(generics.ListAPIView):
    serializer_class = CampaignSerializer

    def get_queryset(self):
        try:
            product = Product.objects.get(id=self.kwargs['pk'])
            return Campaign.objects.filter(product=product)
        except Product.DoesNotExist:
            return Response(self.request.data, status=status.HTTP_404_NOT_FOUND)


class BannerDetailView(generics.RetrieveAPIView):
    serializer_class = BannerSerializer
    permission_classes = [IsOwnerOfProductOrReadOnly]
    queryset = Banner.objects.all()


class CampaignFirstListView(generics.ListAPIView):
    serializer_class = CampaignSerializer
    queryset = Campaign.objects.filter(valid=True, state=Campaign.State.COMPLETED, place=Campaign.Place.FIRST).order_by(
        '-created')[:Campaign.MAX_FIRST_NUM]


class CampaignSecondListView(generics.ListAPIView):
    serializer_class = CampaignSerializer
    queryset = Campaign.objects.filter(valid=True, state=Campaign.State.COMPLETED, place=Campaign.Place.SECOND).order_by(
        '-created')[:Campaign.MAX_SECOND_NUM]


class CampaignThirdListView(generics.ListAPIView):
    serializer_class = CampaignSerializer
    queryset = Campaign.objects.filter(valid=True, state=Campaign.State.COMPLETED, place=Campaign.Place.THIRD).order_by(
        '-created')[:Campaign.MAX_THIRD_NUM]


class BannerFirstListView(generics.ListAPIView):
    serializer_class = BannerSerializer
    queryset = Banner.objects.filter(valid=True, state=Banner.State.COMPLETED, place=Banner.Place.FIRST).order_by(
        '-created')[:Banner.MAX_FIRST_NUM]


class BannerSecondListView(generics.ListAPIView):
    serializer_class = BannerSerializer
    queryset = Banner.objects.filter(valid=True, state=Banner.State.COMPLETED, place=Banner.Place.SECOND).order_by(
        '-created')[:Banner.MAX_SECOND_NUM]


class BannerThirdListView(generics.ListAPIView):
    serializer_class = BannerSerializer
    queryset = Banner.objects.filter(valid=True, state=Banner.State.COMPLETED, place=Banner.Place.THIRD).order_by(
        '-created')[:Banner.MAX_THIRD_NUM]


class ProductRateView(generics.CreateAPIView):
    serializer_class = RateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        try:
            product = Product.objects.get(id=self.kwargs['pk'])
            user = self.request.user
            rating = self.request.data['rating']
            serializer.save(product=product, user=user, rating=rating)
        except Product.DoesNotExist:
            return Response(self.request.data, status=status.HTTP_404_NOT_FOUND)


class OwnerBannerListView(generics.ListAPIView):
    serializer_class = BannerSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOfProduct]

    def get_queryset(self):
        return Banner.objects.filter(product__owner=self.request.user)


class OwnerSponsorSearchListView(generics.ListAPIView):
    serializer_class = SponsoredSearchSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOfProduct]

    def get_queryset(self):
        return SponsoredSearch.objects.filter(product__owner=self.request.user)


class TransactionDetailView(generics.RetrieveAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOfTransaction]
    queryset = Transaction.objects.all()


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_pending_banners_count(request, pid):
    place_id = pid
    if place_id == 1:
        place = Banner.Place.FIRST
        limit = Banner.MAX_FIRST_NUM
    elif place_id == 2:
        place = Banner.Place.SECOND
        limit = Banner.MAX_SECOND_NUM
    else:
        place = Banner.Place.THIRD
        limit = Banner.MAX_THIRD_NUM
    total = len(Banner.objects.filter(valid=True, place=place))
    if total > limit:
        return Response({'count': total - limit}, status=status.HTTP_200_OK)
    return Response({'count': 0}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_pending_campaigns_count(request, pid):
    place_id = pid
    if place_id == 1:
        place = Campaign.Place.FIRST
        limit = Campaign.MAX_FIRST_NUM
    elif place_id == 2:
        place = Campaign.Place.SECOND
        limit = Campaign.MAX_SECOND_NUM
    else:
        place = Campaign.Place.THIRD
        limit = Campaign.MAX_THIRD_NUM
    total = len(Campaign.objects.filter(valid=True, place=place))
    if total > limit:
        return Response({'count': total - limit}, status=status.HTTP_200_OK)
    return Response({'count': 0}, status=status.HTTP_200_OK)


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
def order_complete_view(request, pk):
    try:
        order = Order.objects.get(id=pk)
        if order.state != order.State.AWAITING:
            raise ValidationError("Operation failed. This order is {}".format(order.state))
        else:
            order.state = order.State.COMPLETED
            order.save()
            owner = order.product.owner
            amount = int(owner.percentage * order.product.price)
            Liquidate.objects.create(owner=owner, amount=amount)

            transaction_type = Transaction.Type.ORDER
            Transaction.objects.create(sender=order.customer, transaction_object=order,
                                       amount=order.product.price, type=transaction_type)

            owner.balance -= amount
            owner.save()
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


@api_view(['POST'])
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
            banner.valid = True
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


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated, IsOwnerOfProduct])
def campaign_complete_view(request, pk):
    try:
        campaign = Campaign.objects.get(id=pk)
        if campaign.state != campaign.State.AWAITING:
            raise ValidationError("Operation failed. This object is {}".format(campaign.state))
        else:
            campaign.state = campaign.State.COMPLETED
            update_campaign(campaign.id, repeat=Task.DAILY,
                            repeat_until=datetime.datetime.now() + datetime.timedelta(days=campaign.remaining_days))
            campaign.valid = True
            return Response(request.data, status=status.HTTP_200_OK)
    except Banner.DoesNotExist:
        return Response(request.data, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated, IsOwnerOfProduct])
def campaign_fail_view(request, pk):
    try:
        campaign = Campaign.objects.get(id=pk)
        if campaign.state != campaign.State.AWAITING:
            raise ValidationError("Operation failed. This order is {}".format(campaign.state))
        else:
            campaign.delete()
            return Response(request.data, status=status.HTTP_200_OK)
    except Banner.DoesNotExist:
        return Response(request.data, status=status.HTTP_404_NOT_FOUND)


def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})


def ping(request):
    return JsonResponse({'result': 'OK'})


def cat_hierarchy(request):
    cat_hierarchy = {"categories": []}
    labels1 = Product.Cat1.labels
    labels2 = Product.Cat2.labels
    labels3 = Product.Cat3.labels
    for cat1 in Product.category_hierarchy:
        tmp_cat1 = {"name": labels1[int(cat1) - 1], "text": labels1[int(cat1) - 1], "value": cat1, "categories": []}
        for cat2 in list(Product.category_hierarchy[cat1].keys()):
            tmp_cat2 = {"name": labels2[int(cat2) - 1], "text": labels2[int(cat2) - 1], "value": cat2, "categories": []}
            for cat3 in Product.category_hierarchy[cat1][cat2]:
                tmp_cat2["categories"].append(
                    {"name": labels3[int(cat3) - 1], "text": labels3[int(cat3) - 1], "value": cat3})
            tmp_cat1["categories"].append(tmp_cat2)
        cat_hierarchy["categories"].append(tmp_cat1)
    return JsonResponse(cat_hierarchy)


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
