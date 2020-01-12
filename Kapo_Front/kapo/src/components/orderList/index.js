import React from 'react';

import './style.scss';

import OrderCard from '../basic/orderCard';
import OrderDetails from '../orderDetails';

class OrderList extends React.Component {
    state = {orders: []}

    componentDidMount() {
        this.setState({orders: [{'product': {'name': 'تست', 'price': 120000, 'owner': {'name': 'علی', 'address': 'نیاوران'}}, 'state': 'completed',
                                'customer': {'name': 'محمد', 'address': 'پاسداران'}, 'count': '3', 'deadline': '18:52', 'created': '2020/01/01'}, 
                                {'product': {'name': 'تست', 'price': 120000, 'owner': {'name': 'علی', 'address': 'نیاوران'}}, 'state': 'completed',
                                'customer': {'name': 'محمد', 'address': 'پاسداران'}, 'count': '3', 'deadline': '18:52', 'created': '2020/01/01'},
                                {'product': {'name': 'تست', 'price': 120000, 'owner': {'name': 'علی', 'address': 'نیاوران'}}, 'state': 'failed',
                                'customer': {'name': 'محمد', 'address': 'پاسداران'}, 'count': '3', 'deadline': '18:52', 'created': '2020/01/01'}, 
                                {'product': {'name': 'تست', 'price': 120000, 'owner': {'name': 'علی', 'address': 'نیاوران'}}, 'state': 'awaiting',
                                'customer': {'name': 'محمد', 'address': 'پاسداران'}, 'count': '3', 'deadline': '18:52', 'created': '2020/01/01'}]})
    }

    render() {
        return (
            <div className="order-list__container">
                <OrderCard details="-"></OrderCard>
                {this.state.orders.map((element, index) => 
                    <div key={index}>
                        <OrderCard key={2*index + 1} order={element}></OrderCard>
                        <OrderDetails key={-1-index} order={element}></OrderDetails>
                    </div>)}
            </div>
        );
    }
}

export default OrderList;