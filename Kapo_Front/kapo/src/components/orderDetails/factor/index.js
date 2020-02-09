import React from 'react';
import { connect } from "react-redux";
import { fetchOrder } from '../../../actions';
import './style.scss';

import PersonDetails from '../../basic/personDetails'
import CustomTable from '../../basic/customTable'

class OrderFactor extends React.Component {
    state = {order: null}

    componentDidMount() {
        // this.setState(
        //     {order: {'product': {'name': 'تست', 'price': 120000, 'owner': {'corporate_name': 'شرکت علی بابا', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران', 'corporate_number': '123456789101', 'corporate_economic_number': '432198765', 'phone_number': '02122222222'}},
        //             'customer': {'name': 'محمد', 'address': 'پاسداران', 'country': 'ایران', 'city': 'تهران', 'national_id': '1234567890', 'phone_number': '02121212211'},
        //             'count': 3, 
        //             'deadline': '18:52',
        //             'state': 'completed',
        //             'created': '2020/01/01'}}
        // )
        // console.log(this.props);
        this.props.fetchOrder(this.props.match ? this.props.match.params ? this.props.match.params.id : '0' : '0');
        // this.setState({order: this.props.order})
        // console.log(this.state.order);
        
    }


    render() {
        console.log(this.props.order);
        
        return (
            <div className='order-factor__container'>
                <div className='order-factor__inner-container'>
                    <div className='order-factor__title'>
                        صورتحساب فروش کالا و خدمات
                    </div>
                    <PersonDetails title='فروشنده' 
                        person={this.props.order ? this.props.order.product ? this.props.order.product.owner ? 
                                    this.props.order.product.owner : {} : {} : {}}/>
                    <PersonDetails title='خریدار' 
                        person={this.props.order ? this.props.order.customer ? this.props.order.customer : {} : {}}/>
                    <CustomTable 
                            headers={['ردیف', 'نام کالا', 'تعداد', 'قیمت واحد', 'مبلغ کل']}
                            rows={[['1', this.props.order ? this.props.order.product ? this.props.order.product.name : '-' : '-', 
                                this.props.order ? this.props.order.count : '-', this.props.order ? this.props.order.product ? this.props.order.product.price : '-' : '-',
                                this.props.order ? this.props.order.product ? this.props.order.product.price ? this.props.order.count ? this.props.order.product.price * this.props.order.count : '-' : '-' : '-' : '-']]}
                    />
                    <div className='order-factor__row'>
                        <div className='order-factor__element'>
                            <div className='order-factor__element-title'>
                                تاریخ:
                            </div>
                            <div className='order-factor__element-value' id='order-factor__created'>
                                {this.props.order ? this.props.order.created : '-'}
                            </div>
                        </div>
                        <div className='order-factor__element'>
                            <div className='order-factor__element-title'>
                                آخرین مهلت پرداخت:
                            </div>
                            <div className='order-factor__element-value' id='order-factor__deadline'>
                                {this.props.order ? this.props.order.deadline : '-'}
                            </div>
                        </div>
                        <div className='order-factor__element'>
                            <div className='order-factor__element-title'>
                                وضعیت:
                            </div>
                            <div className='order-factor__element-value' id='order-factor__state'>
                                {this.props.order ? this.props.order.state ? this.props.order.state === "Awaiting" ? 'در انتظار' : this.props.order.state === "Completed" ? 'کامل شده' : this.props.order.state === "Failed" ? 'نا موفق' : 'لغو شده' : '-' : '-'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStatToProps = (props, ownProps) => {
    let orderItem = null
    if(ownProps.match)
    {
      orderItem = props ? props.orders ? props.orders.orders ? props.orders.orders[ownProps ? ownProps.match ? ownProps.match.params ? ownProps.match.params.id: 0: 0: 0] : null : null : null
    }else{
      orderItem = null
    }
    return { order: orderItem}
  }

export default connect(mapStatToProps, { fetchOrder })(OrderFactor);;