import React from 'react';

import './style.scss';

const OrderCard = (props) => {
    return (
        <div className={props.details == '-' ? "order-card__container order-card__container--gray-background" : "order-card__container"}>
            <div className="order-card__section">
                {props.details == '-' ? 'نام کالا' : props.order ? props.order.name : '-'}
            </div>
            <div className="order-card__section">
                {props.details == '-' ? 'تعداد' : props.order ? props.order.quantity : '-'}
            </div>
            <div className="order-card__section">
                <div className={props.details == '-' ? '' : props.order ? props.order.state ? props.order.state == "awaiting" ? 'order-card__state--awaiting' : props.order.state == "completed" ? 'order-card__state--completed' : 'order-card__state--failed' : '' : ''}>
                    {props.details == '-' ? 'وضعیت' : props.order ? props.order.state ? props.order.state == "awaiting" ? 'در انتظار' : props.order.state == "completed" ? 'کامل شده' : props.order.state == "failed" ? 'نا موفق' : 'لغو شده' : '-' : '-'}
                </div>
            </div>
            <div className="order-card__section">
                {props.details == '-' ? '' : 'نمایش جزئیات'}
            </div>
        </div>
    );
}

export default OrderCard;