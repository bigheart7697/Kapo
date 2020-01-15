import React from 'react';
import { connect } from 'react-redux'
import { fetchMyOrders } from '../../actions'

import _ from "lodash";

import './style.scss';

import OrderCard from '../basic/orderCard';
import OrderDetails from '../orderDetails';

class OrderList extends React.Component {
    componentDidMount(){
        this.props.fetchMyOrders()
    }

    clickChild = (index) => {
        this.refs[-1-index].onButtonClick();
        this.refs[2*index + 1].onButtonClick();
    }

    render(){
        const newArray = _.map(this.props.orders, (item, key) => {
            return item
          })
        console.log(this.props.products)
        return (
                    <div className="order-list__container">
                        <OrderCard details="-"></OrderCard>
                        {newArray.map((element, index) => 
                            <div key={index}>
                                <OrderCard key={2*index + 1} order={element} ref={2*index + 1} onClick={() => this.clickChild(index)}></OrderCard>
                                <OrderDetails key={-1-index} order={element} ref={-1-index}></OrderDetails>
                            </div>)}
                    </div>
                );
    }
}

const mapStateToProps = (state) => {
    return {orders: state.orders.orders}
}

export default connect(mapStateToProps, { fetchMyOrders })(OrderList)