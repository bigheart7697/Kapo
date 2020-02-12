import React from 'react';

import './style.scss';

import OrderFactor from '../factor'

class OrderDetails extends React.Component {
    state = {price: 0, active: false, order: {}}
    defaultImg = "http://127.0.0.1:8000/media/default.jpg"

    componentDidMount() {
        this.setState({price: this.props.order ? this.props.order.count ? this.props.order.product ? this.props.order.product.price ? this.props.order.product.price * this.props.order.count : '-' : '-' : '-' : '-'})
    }

    onButtonClick = () => {
        this.setState({active: this.state.active ? false : true, order: this.props.order})
    }

    render() {
        console.log(this.state)
        return (
            <div className={this.state.active ? "order-details__container" : "order-details__container order-details__container--hidden"}>
                <OrderFactor order={this.state.order}/>
            </div>
        );
    }
}

export default OrderDetails;