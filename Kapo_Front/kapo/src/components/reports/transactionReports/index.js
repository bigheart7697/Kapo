import React from 'react'

import './style.scss'
import '../accountReports/style.scss'

import CustomPieChart from '../../basic/customPieChart'
import CustomPlot from '../../basic/customPlot'

const JDate = require('jalali-date');

const TRANSACTION_TYPES = [
    'SPONSOR', 'BANNER', 'CAMPAIGN', 'ORDER', 'INCREASE_BALANCE', 'LIQUIDATE'
]

const CATEGORIES = [
    'ELECTRONICS', 'PERSONAL', 'BUSINESSES', 'VEHICLE', 'HOME', 'LEISURE'
]

class TransactionReports extends React.Component {
    
    get_percentages = () => {
        let data = [['نوع معامله', 'مجموع مقدار'], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']]
        for(let i = 0; i < 6; i ++) {
            let filtered = this.props.transactions ? this.props.transactions.filter(element => element.type === TRANSACTION_TYPES[i]) : [];
            let sum = 0;
            for (let j = 0; j < filtered.length; j ++) {
                sum = sum + filtered[j].amount;
            }
            data[i+1] = [TRANSACTION_TYPES[i], sum]
        }
        console.log(data)
        return data
    }

    get_trend = () => {
        let data = [['تاریخ', 'تعداد'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0']];
        let d = Date.now();
        for (let i = 0; i < 14; i ++) {
            let filtered = this.props.transactions ? this.props.transactions.filter(element => Math.ceil(Math.abs(d - new Date(element.created)) / (1000 * 60 * 60 * 24))>=i+1) : [];
            let sum = 0;
            for (let j = 0; j < filtered.length; j ++) {
                sum = sum + filtered[j].amount;
            }
            let date = new JDate(new Date(d - i * (1000 * 60 * 60 * 24)))
            data[14 - i] = [date.format('MM/DD'), sum]
        }
        return data;
    }

    get_trend_categories = () => {
        let data = [['تاریخ', 'SPONSOR', 'BANNER', 'CAMPAIGN', 'ORDER', 'INCREASE_BALANCE', 'LIQUIDATE'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0']];
        let d = Date.now();
        for (let i = 0; i < 14; i ++) {
            let transactions = ['0', '0', '0', '0', '0', '0']
            for (let j = 0; j < 6; j ++) {
                let filtered = this.props.transactions ? this.props.transactions.filter(element => element.type===TRANSACTION_TYPES[j] && Math.ceil(Math.abs(d - new Date(element.created)) / (1000 * 60 * 60 * 24))>=i+1) : [];
                let sum = 0;
                for (let j = 0; j < filtered.length; j ++) {
                    sum = sum + filtered[j].amount;
                }
                transactions[j] = sum
            }
            let date = new JDate(new Date(d - i * (1000 * 60 * 60 * 24)))
            data[14 - i] = [date.format('MM/DD'), transactions[0], transactions[1], transactions[2], transactions[3], transactions[4], transactions[5]]
        }
        return data;
    }

    get_trend_months = () => {
        let data = [['ماه', 'تعداد'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0']];
        let d = Date.now();
        let jd = new JDate(new Date(d));
        for (let i = 0; i < 12; i ++) {
            let filtered = this.props.transactions ? this.props.transactions.filter(element => {
                if (Math.ceil(Math.abs(d - new Date(element.created)) / (1000 * 60 * 60 * 24 * 365))>=2)
                        return false
                let date = new JDate(new Date(element.created)); 
                if (date.getMonth() === (jd.getMonth() - i) % 12)
                    return true
                else
                    return false
            }) : [];
            let sum = 0;
            for (let j = 0; j < filtered.length; j ++) {
                sum = sum + filtered[j].amount;
            }
            let date1 = new JDate(new Date(d - i * (1000 * 60 * 60 * 24 * 31)))
            data[12 - i] = [date1.format('MMMM YY'), sum]
        }
        return data;
    }
    get_trend_months_categories = () => {
        let data = [['تاریخ', 'ELECTRONICS', 'PERSONAL', 'BUSINESSES', 'VEHICLE', 'HOME', 'LEISURE'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0'], 
                    ['0', '0', '0', '0', '0', '0', '0']];
        let d = Date.now();
        let jd = new JDate(new Date(d));
        for (let i = 0; i < 12; i ++) {
            let transactions = ['0', '0', '0', '0', '0', '0']
            for (let j = 0; j < 6; j ++) {
                let filtered = this.props.transactions ? this.props.transactions.filter(element => {
                    if (element.type !== TRANSACTION_TYPES[j])
                        return false
                    if (Math.ceil(Math.abs(d - new Date(element.created)) / (1000 * 60 * 60 * 24 * 365))>=2)
                        return false
                    let date = new JDate(new Date(element.created)); 
                    if (date.getMonth() === (jd.getMonth() - i) % 12)
                        return true
                    else
                        return false
                }) : [];
                let sum = 0;
                for (let j = 0; j < filtered.length; j ++) {
                    sum = sum + filtered[j].amount;
                }
                transactions[j] = sum
            }
            let date1 = new JDate(new Date(d - i * (1000 * 60 * 60 * 24 * 31)))
            data[12 - i] = [date1.format('MMMM YY'), transactions[0], transactions[1], transactions[2], transactions[3], transactions[4], transactions[5]]
        }
        return data;
    }

    render() {
        return (
            <div className='account-reports__container'>
                <div className='account-reports__section'>
                    <div className='account-reports__title'>نسبت مقدار پول جابه‌جا شده در دسته‌های مختلف</div>
                    <CustomPieChart data={this.get_percentages()} />
                </div>
                <div className='account-reports__section account-reports__section--big'>
                    <div className='account-reports__title'>مجموع کل تراکنش‌‌های انجام شده در سامانه در طول روزهای گذشته</div>
                    <CustomPlot data={this.get_trend()} />
                </div>
                <div className='account-reports__section account-reports__section--big'>
                    <div className='account-reports__title'>مجموع کل تراکنش‌‌های انجام شده در سامانه در طول روزهای گذشته به تفکیک دسته</div>
                    <CustomPlot data={this.get_trend_categories()} type='Bar'/>
                </div>
                <div className='account-reports__section account-reports__section--big'>
                    <div className='account-reports__title'>مقدار تراکنش‌های انجام شده در سامانه در ماه‌های گذشته</div>
                    <CustomPlot data={this.get_trend_months()} type='AreaChart'/>
                </div>
                <div className='account-reports__section account-reports__section--big'>
                    <div className='account-reports__title'>مقدار تراکنش‌های انجام شده در سامانه در  ماه‌های گذشته به تفکیک دسته</div>
                    <CustomPlot data={this.get_trend_months_categories()} type='AreaChart'/>
                </div>
            </div>
        )
    }
}

export default TransactionReports;