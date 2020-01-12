import React from 'react';

import './style.scss';

class OrderCard extends React.Component {

    render() {
        return (
            <div className={this.props.details == '-' ? "order-card__container order-card__container--gray-background" : "order-card__container"}>
                <div className="order-card__section">
                    {this.props.details == '-' ? 'نام کالا' : this.props.order ? this.props.order.product ? this.props.order.product.name : '-' : '-'}
                </div>
                <div className="order-card__section">
                    {this.props.details == '-' ? 'تاریخ' : this.props.order ? this.props.order.created : '-'}
                </div>
                <div className="order-card__section">
                    <div className={this.props.details == '-' ? '' : this.props.order ? this.props.order.state ? this.props.order.state == "awaiting" ? 'order-card__state--awaiting' : this.props.order.state == "completed" ? 'order-card__state--completed' : 'order-card__state--failed' : '' : ''}>
                        {this.props.details == '-' ? 'وضعیت' : this.props.order ? this.props.order.state ? this.props.order.state == "awaiting" ? 'در انتظار' : this.props.order.state == "completed" ? 'کامل شده' : this.props.order.state == "failed" ? 'نا موفق' : 'لغو شده' : '-' : '-'}
                    </div>
                </div>
                <div className="order-card__section">
                    {this.props.details == '-' ? '' : 'نمایش جزئیات'}
                </div>
            </div>
        );
    }
}

export default OrderCard;