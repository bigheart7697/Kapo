import React from 'react';

import './style.scss';

class OrderDetails extends React.Component {
    state = {price : 0, active: false}

    componentDidMount() {
        this.setState({price: this.props.order ? this.props.order.count ? this.props.order.product ? this.props.order.product.price ? this.props.order.product.price * this.props.order.count : '-' : '-' : '-' : '-'})
    }

    onButtonClick = () => {
        this.setState({active: this.state.active ? false : true})
    }

    render() {
        return (
            <div className={this.state.active ? "order-details__container" : "order-details__container order-details__container--hidden"}>
                <div className={this.state.active ? "order-details__container-text" : "order-details__container-text order-details__container-text--hidden"}>
                <div id="order-details__name">{this.props.order ? this.props.order.product ? this.props.order.product.name : '-' : '-'}</div>
                <div id="order-details__count">تعداد: {this.props.order ? this.props.order.count : '-'} عدد</div>
                <div id="order-details__price">قیمت: {this.state.price} تومان</div>
                <div id="order-details__deadline">مهلت پرداخت: {this.props.order ? this.props.order.deadline : '-'}</div>
                <div id="order-details__address">آدرس: {this.props.order ? this.props.order.product ? this.props.order.product.owner ? this.props.order.product.owner.address : '-' : '-' : '-'}</div>
                </div>
            </div>
        );
    }
}

export default OrderDetails;