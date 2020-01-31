from background_task import background
from .models import Order


@background(schedule=30*60)
def update_order_state(order_id):
    order = Order.objects.get(pk=order_id)
    product = order.product
    if order.state == order.State.AWAITING:
        order.state = order.State.FAILED
        product.quantity += order.count
    order.save()
    product.save()
