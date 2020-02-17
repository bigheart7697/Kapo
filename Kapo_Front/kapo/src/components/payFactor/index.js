import React from 'react';

import './style.scss';

import PersonDetails from '../basic/personDetails'
import CustomTable from '../basic/customTable'
import LinkToBank from '../basic/linkToBank'
import {fetch_factor} from "../../actions"
import { connect } from "react-redux";

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
    componentDidMount() {
        this.props.fetch_factor(this.props.match.params.id);
    }

    get_price = (type) => {
        switch(type) {
            case 'کمپین تبلیغاتی':
                return 1000000;
            case 'جست‌وجوی اسپانسر شده':
                return 1000;
            case 'بنر تبلیغاتی':
                return 1000000;
            default:
                return 0;
        }
    }

    get_unit = (type) => {
        switch(type) {
            case 'کمپین تبلیغاتی':
                return 'تعداد روز';
            case 'جست‌وجوی اسپانسر شده':
                return 'تعداد بازدید';
            case '':
                return 'تعداد روز';
            default:
                return 'تعداد';
        }
    }

    render() {
        let factor = {
                type: 'بنر تبلیغاتی',
                product: {name: ''},
                days_number: 0
            }
        if (this.props.factorObject && this.props.factorObject.type === 1){
            factor = {
                type: 'جست‌وجوی اسپانسر شده',
                product: {name: this.props.factorObject.transaction_object.product.name},
                days_number: this.props.factorObject.transaction_object.count
            }}
        if (this.props.factorObject && this.props.factorObject.type === 2){
            factor = {
            type: 'بنر تبلیغاتی',
            product: {name: this.props.factorObject.transaction_object.product.name},
            days_number: this.props.factorObject.transaction_object.days
            }}
        if (this.props.factorObject && this.props.factorObject.type === 3){
            factor = {
                type: 'کمپین تبلیغاتی',
                product: {name: this.props.factorObject.transaction_object.product.name},
                days_number: this.props.factorObject.transaction_object.days
                }}
        if (this.props.factorObject && this.props.factorObject.type === 3){
            factor = {
                type: 'شارژ حساب',
                product: "",
                days_number: ""
                }}


        return (
            <div className='pay-factor__container'>
                <div className='pay-factor__inner-container'>
                    <div className='pay-factor__title'>
                        صورت حساب پرداخت هزینه تبلیغات و خدمات سامانه
                    </div>
                    <PersonDetails title='در وجه' id='1'
                        person={kapo}/>
                    <CustomTable 
                            headers={this.props.factorObject && this.props.factorObject.type === 3 ? 
                                ['ردیف', 'نوع خدمت/تبلیغات', 'مقدار افزایش موجودی حساب']
                                : ['ردیف', 'نوع خدمت/تبلیغات', 'نام کالا', this.get_unit(factor.type), 'قیمت واحد', 'مبلغ کل']}
                            rows={this.props.factorObject && this.props.factorObject.type === 3 ? 
                                [['1', 'افزایش موجودی حساب', this.props.factorObject.transaction_object.amount]]
                                : [['1', factor.type, 
                                factor.product.name, 
                                factor.days_number, 
                                this.get_price(factor.type),
                                this.get_price(factor.type) * factor.days_number]]}
                    />
                </div>
                <LinkToBank id={this.props.factorObject? this.props.factorObject.id : -1} />
            </div>
        );
    }
}


const mapStatToProps = (state, ownProps) => {
    if(ownProps.match)
    {
        return { factorObject: state.advertisements.transactions[ownProps.match.params.id]}
    }else{
        return { factorObject: null }
    }

  }
  
  export default connect(mapStatToProps, { fetch_factor })(PayFactor);
  
