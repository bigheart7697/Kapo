import React from 'react';

import './style.scss';

import OrderCard from '../basic/orderCard';
import OrderDetails from '../orderDetails/dropDown';

class OrderList extends React.Component {

    clickChild = (index) => {
        this.refs[-1-index].onButtonClick();
        this.refs[2*index + 1].onButtonClick();
    }

    render(){
        return (
                    <div className="order-list__container">
                        <OrderCard details="-"></OrderCard>
                        {this.props.newArray.map((element, index) => 
                            <div key={index}>
                                <OrderCard key={2*index + 1} order={element} ref={2*index + 1} onClick={() => this.clickChild(index)}></OrderCard>
                                <OrderDetails key={-1-index} order={element} ref={-1-index}></OrderDetails>
                            </div>)}
                    </div>
                );
    }
}

export default OrderList