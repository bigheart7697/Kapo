import React from 'react';

import './style.scss';

import OrderCard from '../basic/orderCard';

class OrderList extends React.Component {
    state = {orders: []}

    componentDidMount() {
        this.setState({orders: [{'name': 'قلیون مش حسن', 'quantity': '1', 'person': {'name': 'علی'}}, 
                                {'name': 'قلیون مش حسن', 'quantity': '1', 'person': {'name': 'علی'}},
                                {'name': 'قلیون مش حسن', 'quantity': '1', 'person': {'name': 'علی'}}, 
                                {'name': 'قلیون مش حسن', 'quantity': '1', 'person': {'name': 'علی'}}]})
    }

    render() {
        return (
            <div className="order-list__container">
                <OrderCard order={{'name': 'نام کالا', 'quantity': 'تعداد', 'person': {'name': 'نام سفارش دهنده'}}} details="-"></OrderCard>
                {this.state.orders.map((element, index) => <OrderCard key={index} order={element}></OrderCard>)}
            </div>
        );
    }
}

export default OrderList;