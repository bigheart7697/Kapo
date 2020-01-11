import React from 'react';

import './style.scss';

const OrderCard = (props) => {
    if(props.details == '-'){
        return (
            <div className="order-card__container order-card__container--gray-background">
                <div className="order-card__section">
                    {props.order ? props.order.name : '-'}
                </div>
                <div className="order-card__section">
                    {props.order ? props.order.quantity : '-'}
                </div>
                <div className="order-card__section">
                    {props.order ? props.order.person ? props.order.person.name : '-' : '-'}
                </div>
                <div className="order-card__section">
                    
                </div>
            </div>
        );
    }
    return (
        <div className="order-card__container">
            <div className="order-card__section">
                {props.order ? props.order.name : '-'}
            </div>
            <div className="order-card__section">
                {props.order ? props.order.quantity : '-'}
            </div>
            <div className="order-card__section">
                {props.order ? props.order.person ? props.order.person.name : '-' : '-'}
            </div>
            <div className="order-card__section">
                نمایش جزئیات
            </div>
        </div>
    );
}

export default OrderCard;