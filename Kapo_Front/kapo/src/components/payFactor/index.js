import React from 'react';

import './style.scss';

import PersonDetails from '../basic/personDetails'
import CustomTable from '../basic/customTable'
import LinkToBank from '../basic/linkToBank'

const factor = {
    type: 'کمپین تبلیغاتی',
    product: {name: 'لباس بچه'},
    days_number: 4
}

const kapo = {
    is_corporate: true,
    corporate_name: 'کاپو کالا',
    corporate_number: '123123123123',
    corporate_economic_number: '32225-24155',
    country: 'ایران',
    city: 'تهران',
    address: 'خیابان آزادی، دانشگاه صنعتی شریف',
    phone_number: '02166166616'
}

class PayFactor extends React.Component {
    get_price = (type) => {
        switch(type) {
            case 'کمپین تبلیغاتی':
                return 12000;
            case 'جست‌وجوی اسپانسر شده':
                return 10000;
            case 'بنر تبلیغاتی':
                return 15000;
            default:
                return 0;
        }
    }

    render() {
        return (
            <div className='pay-factor__container'>
                <div className='pay-factor__inner-container'>
                    <div className='pay-factor__title'>
                        صورت حساب پرداخت هزینه تبلیغات و خدمات سامانه
                    </div>
                    <PersonDetails title='در وجه' id='1'
                        person={kapo}/>
                    <CustomTable 
                            headers={['ردیف', 'نوع خدمت/تبلیغات', 'نام کالا', 'تعداد روز', 'قیمت واحد', 'مبلغ کل']}
                            rows={[['1', this.props.factor ? this.props.factor.type : factor.type, 
                                this.props.factor ? this.props.factor.product ? this.props.factor.product.name : '-' : factor.product.name, 
                                this.props.factor ? this.props.factor.days_number : factor.days_number, 
                                this.props.factor ? this.get_price(this.props.factor.type) : this.get_price(factor.type),
                                this.props.factor ? this.props.factor.type ? this.props.factor.days_number ? this.get_price(this.props.factor.type) * this.props.factor.days_number : '-' : '-' : this.get_price(factor.type) * factor.days_number]]}
                    />
                </div>
                <LinkToBank id={0} /> {/* set id */}
            </div>
        );
    }
}

export default PayFactor;