import React from 'react';
import { connect } from 'react-redux'
import { fetchMyOrders } from '../../actions'

import _ from "lodash";

import './style.scss';

import OrderCard from '../basic/orderCard';
import OrderDetails from '../orderDetails';

import image5 from '../../assets/5.png'

class OrderList extends React.Component {
    componentDidMount(){
        this.props.fetchMyOrders()
    }
    // state = {orders: []}

    // componentDidMount() {
    //     this.setState({orders: [{'product': {'name': 'تست', 'image': image5, 'price': 120000, 'owner': {'name': 'علی', 'address': 'نیاوران'}}, 'state': 'completed',
    //                             'customer': {'name': 'محمد', 'address': 'پاسداران'}, 'count': '3', 'deadline': '18:52', 'created': '2020/01/01'}, 
    //                             {'product': {'name': 'تست', 'image': image5, 'price': 120000, 'owner': {'name': 'علی', 'address': 'نیاوران'}}, 'state': 'completed',
    //                             'customer': {'name': 'محمد', 'address': 'پاسداران'}, 'count': '3', 'deadline': '18:52', 'created': '2020/01/01'},
    //                             {'product': {'name': 'تست', 'image': image5, 'price': 120000, 'owner': {'name': 'علی', 'address': 'نیاوران'}}, 'state': 'failed',
    //                             'customer': {'name': 'محمد', 'address': 'پاسداران'}, 'count': '3', 'deadline': '18:52', 'created': '2020/01/01'}, 
    //                             {'product': {'name': 'تست', 'image': image5, 'price': 120000, 'owner': {'name': 'علی', 'address': 'نیاوران'}}, 'state': 'awaiting',
    //                             'customer': {'name': 'محمد', 'address': 'پاسداران'}, 'count': '3', 'deadline': '18:52', 'created': '2020/01/01'}]})
    // }

    clickChild = (index) => {
        this.refs[-1-index].onButtonClick();
        this.refs[2*index + 1].onButtonClick();
    }

    render(){
        const newArray = _.map(this.props.orders, (item, key) => {
            return item
          })
        console.log(this.props.products)
        // return(<div className="product-list__container">
        //     {newArray.map((element) => <ProductCard product={element}></ProductCard>)}
        // </div>)
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

    // render() {
    //     return (
    //         <div className="order-list__container">
    //             <OrderCard details="-"></OrderCard>
    //             {this.state.orders.map((element, index) => 
    //                 <div key={index}>
    //                     <OrderCard key={2*index + 1} order={element} ref={2*index + 1} onClick={() => this.clickChild(index)}></OrderCard>
    //                     <OrderDetails key={-1-index} order={element} ref={-1-index}></OrderDetails>
    //                 </div>)}
    //         </div>
    //     );
    // }
}

const mapStateToProps = (state) => {
    return {orders: state.orders.orders}
}

export default connect(mapStateToProps, { fetchMyOrders })(OrderList)