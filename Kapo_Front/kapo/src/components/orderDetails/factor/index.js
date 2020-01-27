import React from 'react';

import './style.scss';

import PersonDetails from '../../basic/personDetails'
import CustomTable from '../../basic/customTable'

class OrderFactor extends React.Component {
    state = {order: null}

    componentDidMount() {
        this.setState(
            {order: {'product': {'name': 'تست', 'price': 120000, 'owner': {'corporate_name': 'شرکت علی بابا', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران', 'corporate_number': '123456789101', 'corporate_economic_number': '432198765', 'phone_number': '02122222222'}},
                    'customer': {'name': 'محمد', 'address': 'پاسداران', 'country': 'ایران', 'city': 'تهران', 'national_id': '1234567890', 'phone_number': '02121212211'},
                    'count': 3, 
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
                    <CustomTable 
                            headers={['ردیف', 'نام کالا', 'تعداد', 'قیمت واحد', 'مبلغ کل']}
                            rows={[['1', this.state.order ? this.state.order.product ? this.state.order.product.name : '-' : '-', 
                                this.state.order ? this.state.order.count : '-', this.state.order ? this.state.order.product ? this.state.order.product.price : '-' : '-',
                                this.state.order ? this.state.order.product ? this.state.order.product.price ? this.state.order.count ? this.state.order.product.price * this.state.order.count : '-' : '-' : '-' : '-']]}
                    />
                    <div className='order-factor__row'>
                        <div className='order-factor__element'>
                            <div className='order-factor__element-title'>
                                تاریخ:
                            </div>
                            <div className='order-factor__element-value'>
                                {this.state.order ? this.state.order.created : '-'}
                            </div>
                        </div>
                        <div className='order-factor__element'>
                            <div className='order-factor__element-title'>
                                آخرین مهلت پرداخت:
                            </div>
                            <div className='order-factor__element-value'>
                                {this.state.order ? this.state.order.deadline : '-'}
                            </div>
                        </div>
                        <div className='order-factor__element'>
                            <div className='order-factor__element-title'>
                                وضعیت:
                            </div>
                            <div className='order-factor__element-value'>
                                {this.state.order ? this.state.order.state ? this.state.order.state === "Awaiting" ? 'در انتظار' : this.state.order.state === "Completed" ? 'کامل شده' : this.state.order.state === "Failed" ? 'نا موفق' : 'لغو شده' : '-' : '-'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderFactor;