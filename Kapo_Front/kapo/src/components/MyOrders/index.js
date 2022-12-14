import React from 'react';
import { connect } from 'react-redux'
import { fetchMyOrders } from '../../actions'
import OrderList from "../orderList"

import _ from "lodash";

import './style.scss';

class MyOrders extends React.Component {
    componentDidMount(){
        this.props.fetchMyOrders()
    }

    render(){
        const newArray = _.map(this.props.orders, (item) => {
            return item
          })
        return (
                    <OrderList newArray={newArray}></OrderList>
                );
    }
}

const mapStateToProps = (state) => {
    return {orders: state.orders.orders}
}

export default connect(mapStateToProps, { fetchMyOrders })(MyOrders)