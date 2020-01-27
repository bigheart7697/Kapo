import React from 'react';

import './style.scss';

import PersonDetails from '../../basic/personDetails'

class OrderFactor extends React.Component {
    state = {order: null}

    componentDidMount() {
        this.setState(
            {order: {'product': {'name': 'تست', 'price': 120000, 'owner': {'corporate_name': 'شرکت علی بابا', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران', 'corporate_number': '123456789101', 'corporate_economic_number': '432198765', 'phone_number': '02122222222'}},
                    'customer': {'name': 'محمد', 'address': 'پاسداران', 'country': 'ایران', 'city': 'تهران', 'national_id': '1234567890', 'phone_number': '02121212211'},
                    'count': '3', 
                    'deadline': '18:52',
                    'state': 'completed',
                    'created': '2020/01/01'}}
        )
    }


    render() {
        return (
            <div className='order-factor__container'>
                <div className='order-factor__inner-container'>
                    <div className='order-factor__title'>
                        صورتحساب فروش کالا و خدمات
                    </div>
                    <PersonDetails title='فروشنده' 
                        person={this.state.order ? this.state.order.product ? this.state.order.product.owner ? 
                                    this.state.order.product.owner : {} : {} : {}}/>
                    <PersonDetails title='خریدار' 
                        person={this.state.order ? this.state.order.customer ? this.state.order.customer : {} : {}}/>
                </div>
            </div>
        );
    }
}

export default OrderFactor;