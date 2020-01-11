import React from 'react';

import './style.scss';

import OrderCard from '../basic/orderCard';

class OrderList extends React.Component {
    state = {orders: []}

    componentDidMount() {
        this.setState({orders: [{'name': 'قلیون مش حسن', 'quantity': '1', 'person': {'name': 'علی'}, 'state': 'completed'}, 
                                {'name': 'قلیون مش حسن', 'quantity': '2', 'person': {'name': 'علی'}, 'state': 'awaiting'},
                                {'name': 'قلیون مش حسن', 'quantity': '3', 'person': {'name': 'علی'}, 'state': 'canceled'}, 
                                {'name': 'قلیون مش حسن', 'quantity': '4', 'person': {'name': 'علی'}, 'state': 'failed'}]})
    }

    render() {
        return (
            <div className="order-list__container">
                <OrderCard details="-"></OrderCard>
                {this.state.orders.map((element, index) => <OrderCard key={index} order={element}></OrderCard>)}
            </div>
        );
    }
}

export default OrderList;