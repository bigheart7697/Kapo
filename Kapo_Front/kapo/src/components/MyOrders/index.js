import React from 'react';
import { connect } from 'react-redux'
import { fetchMyOrders } from '../../actions'
import OrderList from "../orderList"

import _ from "lodash";

import './style.scss';

import OrderCard from '../basic/orderCard';
import OrderDetails from '../orderDetails/dropDown';

class MyOrders extends React.Component {
    componentDidMount(){
        this.props.fetchMyOrders()
    }

    render(){
        const newArray = _.map(this.props.orders, (item, key) => {
            return item
          })
        console.log(this.props.products)
        return (
                    <OrderList newArray={newArray}></OrderList>
                );
    }
}

const mapStateToProps = (state) => {
    return {orders: state.orders.orders}
}

export default connect(mapStateToProps, { fetchMyOrders })(MyOrders)