import React from "react";

import "./style.scss";

const PreviewOrder = props => {
    return (
        <div className="preview-order__container">
            <div className="preview-order__product-details">
                <div className="preview-order__image-container">
                    <img src={props.order ? props.order.product ? props.order.product.image : '' : ''} className="preview-order__image"
                        alt={props.order ? props.order.product ? props.order.product.name : '' : ''}></img>
                </div>
                <div className="preview-order__details">
                    <div className="preview-order__name">{props.order ? props.order.product ? props.order.product.name : '' : ''}</div>
                    <div className="preview-order__details-line">آدرس: {props.order ? props.order.product ? props.order.product.user ? props.order.product.user.address : '' : '' : ''}</div>
                    <div className="preview-order__details-line">تعداد: {props.order ? props.order.number : 0} عدد</div>
                    <div className="preview-order__details-line">مهلت پرداخت: {props.order ? props.order.deadline : '-'}</div>
                </div>
                <div className="preview-order__price">
                    <div className="preview-order__price-section">
                        <div className="preview-order__price-label">قیمت هر واحد:</div>
                        <div className="preview-order__price-value">{props.order ? props.order.product ? props.order.product.price : '-' : '-'} تومان</div>
                    </div>
                    <div className="preview-order__line"></div>
                    <div className="preview-order__price-section">
                        <div className="preview-order__price-label">قابل پرداخت:</div>
                        <div className="preview-order__price-value">{props.order ? props.order.price : '-'} تومان</div>
                    </div>
                </div>
            </div>
            <div className="preview-order__payment">
                <div className="preview-order__one-third-container">
                    <div className="preview-order__title">انتخاب روش پرداخت</div>
                </div>
                <div className="preview-order__one-third-container">
                    <div className="preview-order__input">
                        <input name="bank" type="radio"></input> 
                        <div className="preview-order__input-label">بانک صدارات</div>
                    </div>
                    <div className="preview-order__input">
                        <input name="bank" type="radio"></input> 
                        <div className="preview-order__input-label">بانک شتاب</div>
                    </div>
                </div>
                <div className="preview-order__one-third-container">
                    <a className="preview-order__button">انتقال به درگاه بانک</a>
                </div>
            </div>
        </div>
    );
}

export default PreviewOrder;