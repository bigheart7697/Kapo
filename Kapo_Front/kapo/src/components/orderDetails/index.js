import React from 'react';

import './style.scss';

class OrderDetails extends React.Component {
    state = {price : 0}

    componentDidMount() {
        this.setState({price: this.props.order ? this.props.order.count ? this.props.order.product ? this.props.order.product.price ? this.props.order.product.price * this.props.order.count : '-' : '-' : '-' : '-'})
    }

    render() {
        return (
            <div className="order-details__container">
                <div id="order-details__name">{this.props.order ? this.props.order.product ? this.props.order.product.name : '-' : '-'}</div>
                <div id="order-details__count">تعداد: {this.props.order ? this.props.order.count : '-'} عدد</div>
                <div id="order-details__price">قیمت: {this.state.price} تومان</div>
                <div id="order-details__deadline">مهلت پرداخت: {this.props.order ? this.props.order.deadline : '-'}</div>
                <div id="order-details__address">آدرس: {this.props.order ? this.props.order.product ? this.props.order.product.owner ? this.props.order.product.owner.address : '-' : '-' : '-'}</div>
            </div>
        );
    }
}

export default OrderDetails;