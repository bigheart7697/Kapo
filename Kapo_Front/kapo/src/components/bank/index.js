import React from "react";

import "./style.scss";

const Bank = props => {
    return (
        <div className="bank__container">
        <div className="bank__header-container">
        <div className="bank__header-title">
            درگاه پرداخت بانک
        </div>
        </div>
        <div>
        <div className="bank__rightside">
            <div className="bank__details">
            <div className="bank__label">
                شماره کارت
            </div>
            <div className="bank__value">
                <input className="custom-input__input bank__input--card-no" type="text" required="false"></input>
                <div className="bank__dash"></div>
                <input className="custom-input__input bank__input--card-no" type="text" required="false"></input>
                <div className="bank__dash"></div>
                <input className="custom-input__input bank__input--card-no" type="text" required="false"></input>
                <div className="bank__dash"></div>
                <input className="custom-input__input bank__input--card-no" type="text" required="false"></input>
            </div>
            </div>
            <div className="bank__details">
            <div className="bank__label">
                رمز دوم
            </div>
            <div className="bank__value">
                <input className="custom-input__input bank__input--full-width" type="text" required="false"></input>
            </div>
            </div>
            <div className="bank__details">
            <div className="bank__label">
                شناسه دوم
            </div>
            <div className="bank__value">
                <input className="custom-input__input bank__input--full-width" type="text" required="false"></input>
            </div>
            </div>
            <div className="bank__details">
            <div className="bank__label">
                تاریخ انقضا
            </div>
            <div className="bank__value">
                <input className="custom-input__input bank__input--card-no" type="text" required="false"></input>
                <div className="bank__dash"></div>
                <input className="custom-input__input bank__input--card-no" type="text" required="false"></input>
            </div>
            </div>
            <div className="bank__details">
            <div className="bank__button-containers">
                <a className="bank__button bank__button--accept">پرداخت</a>
                <a className="bank__button bank__button--reject">انصراف</a>
            </div>
            </div>
        </div>
        <div className="bank__leftside">
            <div className="bank__details">
            <div className="bank__label">
                دارنده حساب:
            </div>
            <div className="bank__value">
                {props.account_owner}
            </div>
            </div>
            <div className="bank__details">
            <div className="bank__label">
                مبلغ:
            </div>
            <div className="bank__value">
                {props.price}
            </div>
            </div>
        </div>
        </div>
        <div className="bank__footer-container">

        </div>
    </div>
    );
}

export default Bank;