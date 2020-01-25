import React from "react";
import { connect } from "react-redux";
import { fetchOrder, completeOrder, cancelOrder } from '../../actions';


import "./style.scss";

class Bank extends React.Component {
    componentDidMount() {
        this.props.fetchOrder(this.props.match.params.id);
      }
    render() {
        // console.log(this.props.match.params.id)
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
                    <button className="bank__button bank__button--accept" onClick={() => this.props.completeOrder(this.props.match.params.id)}>پرداخت</button>
                    <button className="bank__button bank__button--reject" onClick={() => this.props.cancelOrder(this.props.match.params.id)}>انصراف</button>
                </div>
                </div>
            </div>
            <div className="bank__leftside">
                <div className="bank__details">
                <div className="bank__label">
                    دارنده حساب:
                </div>
                <div className="bank__value">
                    {this.props.order ? this.props.order.customer ? this.props.order.customer.first_name + " " + this.props.order.customer.last_name : '-' : '-'}
                </div>
                </div>
                <div className="bank__details">
                <div className="bank__label">
                    مبلغ:
                </div>
                <div className="bank__value">
                    {this.props.order ? this.props.order.product.price * this.props.order.count : '-'} تومان
                </div>
                </div>
            </div>
            </div>
            <div className="bank__footer-container">
    
            </div>
        </div>
        );
    }
    
}

const mapStatToProps = (state, ownProps) => {
    let orderItem = null
    if(ownProps.match)
    {
      orderItem = state.orders.orders[ownProps.match.params.id]
    }else{
      orderItem = null
    }
    return { order: orderItem}
  }
  
  export default connect(mapStatToProps, { fetchOrder, completeOrder, cancelOrder })(Bank);
// export default Bank;