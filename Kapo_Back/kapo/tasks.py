from background_task import background
from .models import Order, Banner


@background(schedule=30*60)
def update_order_state(order_id):
    order = Order.objects.get(pk=order_id)
    product = order.product
    if order.state == order.State.AWAITING:
        order.state = order.State.FAILED
        product.quantity += order.count
    order.save()
    product.save()


@background()
def update_banner(banner_id):
    banner = Banner.objects.get(pk=banner_id)
    if banner.state == banner.State.COMPLETED and banner.valid:
        banner.remaining_days -= 1
    banner.save()
