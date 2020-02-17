import React from "react";
import { connect } from "react-redux";
import { fetchOrder } from '../../actions';

import "./style.scss";
import defaultImg from '../../assets/default.jpg'
import LinkToBank from '../basic/linkToBank';

class PreviewOrder extends React.Component {
    componentDidMount() {
        this.props.fetchOrder(this.props.match ? this.props.match.params ? this.props.match.params.id : '0' : '0');
    }
    render() {
        return (
            <div className="preview-order__container">
                <div className="preview-order__product-details">
                    <div className="preview-order__image-container">
                        <img src={(this.props.order? (this.props.order.product? (this.props.order.product.image? this.props.order.product.image : defaultImg) : defaultImg) : defaultImg)} className="preview-order__image"
                            alt={this.props.order ? this.props.order.product ? this.props.order.product.name : '' : ''}></img>
                    </div>
                    <div className="preview-order__details">
                        <div className="preview-order__name" id='preview-order__name'>{this.props.order ? this.props.order.product ? this.props.order.product.name : '' : ''}</div>
                        <div className="preview-order__details-line" id='preview-order__address'>آدرس: {this.props.order ? this.props.order.product ? this.props.order.product.owner ? this.props.order.product.owner.country + "، " + this.props.order.product.owner.city + "، " +this.props.order.product.owner.address : '' : '' : ''}</div>
                        <div className="preview-order__details-line" id='preview-order__count'>تعداد: {this.props.order ? this.props.order.count : 0} عدد</div>
                        <div className="preview-order__details-line" id='preview-order__deadline'>مهلت پرداخت: {this.props.order ? this.props.order.deadline : '-'}</div>
                    </div>
                    <div className="preview-order__price">
                        <div className="preview-order__price-section">
                            <div className="preview-order__price-label">قیمت هر واحد:</div>
                            <div className="preview-order__price-value" id='preview-order__unit-price'>{this.props.order ? this.props.order.product ? this.props.order.product.price : '-' : '-'} تومان</div>
                        </div>
                        <div className="preview-order__line"></div>
                        <div className="preview-order__price-section">
                            <div className="preview-order__price-label">قابل پرداخت:</div>
                            <div className="preview-order__price-value" id='preview-order__total-price'>{this.props.order ? this.props.order.product.price * this.props.order.count : '-'} تومان</div>
                        </div>
                    </div>
                </div>
                <LinkToBank id={this.props.order ? this.props.order.transaction ? this.props.order.transaction : -1 : -1} />
            </div>
        );
    }
    
}

const mapStatToProps = (state, ownProps) => {
    let orderItem = null
    if(ownProps.match)
    {
      orderItem = state ? state.orders ? state.orders.orders ? state.orders.orders[ownProps ? ownProps.match ? ownProps.match.params ? ownProps.match.params.id: 0: 0: 0] : null : null : null
    }else{
      orderItem = null
    }
    return { order: orderItem}
  }
  
export default connect(mapStatToProps, { fetchOrder })(PreviewOrder);