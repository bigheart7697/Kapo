import React from 'react';
import { connect } from 'react-redux'
import { fetchProductOrders } from '../../actions'
import OrderList from "../orderList"

import _ from "lodash";

import './style.scss';

class ProductOrders extends React.Component {
    componentDidMount(){
        this.props.fetchProductOrders(this.props.match.params.id)
    }

    render(){
        const newArray = _.map(this.props.orders, (item, key) => {
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

export default connect(mapStateToProps, { fetchProductOrders })(ProductOrders)