import React from 'react';

import './style.scss';

const JDate = require('jalali-date');

class OrderCard extends React.Component {
    state = {active: false}

    onButtonClick = () => {
        this.setState({active: this.state.active ? false : true})
    }

    get_date = () => {
        let date = new JDate(new Date(this.props.order ? this.props.order.created : '0'))
        return date.format('dddd DD MMMM YYYY')
    }

    render() {
        return (
            <div className={this.props.details === '-' ? "order-card__container order-card__container--gray-background" : "order-card__container"}>
                <div className={this.state.active ? "order-card__section" : "order-card__section"}>
                    {this.props.details === '-' ? 'نام کالا' : this.props.order ? this.props.order.product ? this.props.order.product.name : '-' : '-'}
                </div>
                <div className={this.state.active ? "order-card__section" : "order-card__section"}>
                    {this.props.details === '-' ? 'تاریخ' : this.get_date()}
                </div>
                <div className={this.state.active ? "order-card__section" : "order-card__section"}>
                    <div className={this.props.details === '-' ? '' : this.props.order ? this.props.order.state ? this.props.order.state === "Awaiting" ? 'order-card__state--awaiting' : this.props.order.state === "Completed" ? 'order-card__state--completed' : 'order-card__state--failed' : '' : ''}>
                        {this.props.details === '-' ? 'وضعیت' : this.props.order ? this.props.order.state ? this.props.order.state === "Awaiting" ? 'در انتظار' : this.props.order.state === "Completed" ? 'کامل شده' : this.props.order.state === "Failed" ? 'نا موفق' : 'لغو شده' : '-' : '-'}
                    </div>
                </div>
                <div className={this.state.active ? "order-card__section" : "order-card__section"}>
                    <div className="order-card__dropdown-toggle" onClick={this.props.onClick}>
                        {this.state.active ? 'جزئیات کمتر' : this.props.details === '-' ? 'لینک' : 'جزئیات بیشتر'}
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderCard;