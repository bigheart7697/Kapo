import React from "react";
import { connect } from "react-redux";
import { fetchOrder } from '../../actions';

import "./style.scss";

class PreviewOrder extends React.Component {
    componentDidMount() {
        this.props.fetchOrder(this.props.match.params.id);
      }
    render() {
        return (
            <div className="preview-order__container">
                <div className="preview-order__product-details">
                    <div className="preview-order__image-container">
                        <img src={this.props.order ? this.props.order.product ? this.props.order.product.image : '' : ''} className="preview-order__image"
                            alt={this.props.order ? this.props.order.product ? this.props.order.product.name : '' : ''}></img>
                    </div>
                    <div className="preview-order__details">
                        <div className="preview-order__name">{this.props.order ? this.props.order.product ? this.props.order.product.name : '' : ''}</div>
                        <div className="preview-order__details-line">آدرس: {this.props.order ? this.props.order.product ? this.props.order.product.owner ? this.props.order.product.owner.country + "، " + this.props.order.product.owner.city + "، " +this.props.order.product.owner.address : '' : '' : ''}</div>
                        <div className="preview-order__details-line">تعداد: {this.props.order ? this.props.order.count : 0} عدد</div>
                        <div className="preview-order__details-line">مهلت پرداخت: {this.props.order ? this.props.order.deadline : '-'}</div>
                    </div>
                    <div className="preview-order__price">
                        <div className="preview-order__price-section">
                            <div className="preview-order__price-label">قیمت هر واحد:</div>
                            <div className="preview-order__price-value">{this.props.order ? this.props.order.product ? this.props.order.product.price : '-' : '-'} تومان</div>
                        </div>
                        <div className="preview-order__line"></div>
                        <div className="preview-order__price-section">
                            <div className="preview-order__price-label">قابل پرداخت:</div>
                            <div className="preview-order__price-value">{this.props.order ? this.props.order.product.price * this.props.order.count : '-'} تومان</div>
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
                        <a href={"/bank/" + this.props.match.params.id} className="preview-order__button">انتقال به درگاه بانک</a>
                    </div>
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
  
  export default connect(mapStatToProps, { fetchOrder })(PreviewOrder);