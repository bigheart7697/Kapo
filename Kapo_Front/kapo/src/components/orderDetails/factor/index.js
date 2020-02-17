import React from 'react';
import './style.scss';

import PersonDetails from '../../basic/personDetails'
import CustomTable from '../../basic/customTable'

class OrderFactor extends React.Component {
    render() {
        return (
            <div className='order-factor__container'>
                <div className='order-factor__inner-container'>
                    <div className='order-factor__title'>
                        صورتحساب فروش کالا و خدمات
                    </div>
                    <PersonDetails title='فروشنده' id='1'
                        person={this.props.order ? this.props.order.product ? this.props.order.product.owner ? 
                                    this.props.order.product.owner : {} : {} : {}}/>
                    <PersonDetails title='خریدار' id='2'
                        person={this.props.order ? this.props.order.customer ? this.props.order.customer : {} : {}}/>
                    <CustomTable 
                        long={true}
                        headers={['ردیف', 'نام کالا', 'تعداد', 'قیمت واحد', 'مبلغ کل']}
                        rows={[['1', this.props.order ? this.props.order.product ? this.props.order.product.name : '-' : '-', 
                            this.props.order ? this.props.order.count : '-', this.props.order ? this.props.order.product ? this.props.order.product.price : '-' : '-',
                            this.props.order ? this.props.order.product ? this.props.order.product.price ? this.props.order.count ? this.props.order.product.price * this.props.order.count : '0' : '0' : '0' : '-']]}
                    />
                </div>
            </div>
        );
    }
}

export default OrderFactor;