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
                <div className={this.state.active ? "order-details__image-container" : "order-details__image-container order-details__image-container--hidden"}>
                    <img src={this.props.order ? this.props.order.product ? this.props.order.product.image : '' : ''} 
                        alt={this.props.order ? this.props.order.product ? this.props.order.product.name : '-' : '-'}
                        className="order-details__image"></img>
                </div>
                <div className={this.state.active ? "order-details__container-text" : "order-details__container-text order-details__container-text--hidden"}>
                    <div className="order-details__details">
                        <div className={this.state.active ? "order-details__row" : "order-details__row order-details__row--hidden"}>
                            <div className="order-details__values">
                                <div className="order-details__detail" id="order-details__count">تعداد: {this.props.order ? this.props.order.count : '-'} عدد</div>
                                <div className="order-details__detail" id="order-details__price">هزینه: {this.state.price} تومان</div>
                            </div>
                        </div>
                        <div className={this.state.active ? "order-details__row" : "order-details__row order-details__row--hidden"}>
                        <div className="order-details__label"><div className="order-details__label--vertical-align">فروشنده</div></div>
                            <div className="order-details__values">
                                <div className="order-details__detail">نام: {this.props.order ? this.props.order.product ? this.props.order.product.owner ? this.props.order.product.owner.name : '-' : '-' : '-'}</div>
                                <div className="order-details__detail" id="order-details__address">آدرس: {this.props.order ? this.props.order.product ? this.props.order.product.owner ? this.props.order.product.owner.address : '-' : '-' : '-'}</div>
                            </div>
                        </div>
                        <div className={this.state.active ? "order-details__row" : "order-details__row order-details__row--hidden"}>
                            
                            <div className="order-details__values">
                                <div className="order-details__detail">نام: {this.props.order ? this.props.order.customer ? this.props.order.customer.name : '-' : '-'}</div>
                                <div className="order-details__detail" id="order-details__address">آدرس: {this.props.order ? this.props.order.customer ? this.props.order.customer.address : '-' : '-'}</div>
                            </div>
                            <div className="order-details__label"><div className="order-details__label--vertical-align">خریدار</div></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderDetails;