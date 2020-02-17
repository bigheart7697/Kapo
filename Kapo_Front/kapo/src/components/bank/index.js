import React from "react";
import { connect } from "react-redux";
import { completeCharge, failCharge, fetch_factor, completeBanner, completeOrder, completeSponsor, completeCampaign, cancelOrder, failBanner, failCampaign, failSponsor } from '../../actions';


import "./style.scss";
import history from "../../history";

class Bank extends React.Component {
    componentDidMount() {
        this.props.fetch_factor(this.props.match.params.id);
      }
    render() {
        
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
                    <button className="bank__button bank__button--accept" onClick={() => [(this.props.type === 1)? this.props.completeSponsor(this.props.id) : (this.props.type === 2)? this.props.completeBanner(this.props.id) : (this.props.type === 3)? this.props.completeCampaign(this.props.id) : (this.props.type === 4)? this.props.completeOrder(this.props.id) : (this.props.type === 5)? this.props.completeCharge(this.props.id) : this.props.completeMethod(this.props.id)
                    ]}>پرداخت</button>
                    <button className="bank__button bank__button--reject" onClick={() => [(this.props.type === 1)? this.props.failSponsor(this.props.id) : (this.props.type === 2)? this.props.failBanner(this.props.id) : (this.props.type === 3)? this.props.failCampaign(this.props.id) : (this.props.type === 4)? this.props.cancelOrder(this.props.id) : (this.props.type === 5)? this.props.failCharge(this.props.id) : this.props.cancelMethod(this.props.id)]}>انصراف</button>
                </div>
                </div>
            </div>
            <div className="bank__leftside">
                <div className="bank__details">
                <div className="bank__label">
                    دارنده حساب:
                </div>
                <div className="bank__value">
                    {this.props.owner? this.props.owner : '-'}
                </div>
                </div>
                <div className="bank__details">
                <div className="bank__label">
                    مبلغ:
                </div>
                <div className="bank__value">
                    {this.props.price ? this.props.price : '-'} تومان
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
    let price = null
    let owner = null
    let completeMethod  = null
    let cancelMethod = null
    let id = null
    let type = null
    if(ownProps.match && state.advertisements.transactions && state.advertisements.transactions[ownProps.match.params.id])
    {
        const factorItem = state.advertisements.transactions[ownProps.match.params.id];
        type = factorItem.type
        id = factorItem.transaction_object.id
        switch (factorItem.type){
            case 1:
                    price = factorItem.amount * (factorItem.transaction_object.count? factorItem.transaction_object.count : factorItem.transaction_object.days)
                    owner = "شرکت کاپوکالا"
                    completeMethod = completeSponsor
                    cancelMethod = failSponsor
            
            case 2:
                    price = factorItem.amount * (factorItem.transaction_object.count? factorItem.transaction_object.count : factorItem.transaction_object.days)
                    owner = "شرکت کاپوکالا"
                    completeMethod = completeBanner
                    cancelMethod = [failBanner]

            case 3:
                
                    price = factorItem.amount * (factorItem.transaction_object.count? factorItem.transaction_object.count : factorItem.transaction_object.days)
                    owner = "شرکت کاپوکالا"
                    completeMethod = ownProps.completeCampaign
                    cancelMethod = failCampaign
        

            case 4:
                price = factorItem.transaction_object.count * factorItem.transaction_object.product.price
                owner = factorItem.transaction_object.product.owner.is_corporate ? factorItem.transaction_object.product.owner.corporate_name : factorItem.transaction_object.product.owner.first_name + " " + factorItem.transaction_object.product.owner.last_name
                completeMethod = completeOrder
                cancelMethod = cancelOrder
            case 5:
                price = factorItem.amount
                owner = "شرکت کاپوکالا"
                completeMethod = completeCharge
                cancelMethod = failCharge
        }
    }
    
  return {price: price, owner: owner, completeMethod: completeMethod, cancelMethod: cancelMethod, id: id, type: type} 
}
  
  export default connect(mapStatToProps, { fetch_factor, completeBanner, completeBanner, completeCampaign, completeOrder, cancelOrder, failBanner, failCampaign, failSponsor, completeCharge, failCharge })(Bank);