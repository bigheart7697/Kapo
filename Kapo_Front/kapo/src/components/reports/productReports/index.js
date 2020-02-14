import React from 'react'

import './style.scss'
import '../accountReports/style.scss'

import CustomPieChart from '../../basic/customPieChart'
import CustomPlot from '../../basic/customPlot'

const JDate = require('jalali-date');

const CATEGORIES = [
    'ELECTRONICS', 'PERSONAL', 'BUSINESSES', 'VEHICLE', 'HOME', 'LEISURE'
]

class ProductReports extends React.Component {
    
    get_percentages = () => {
        let data = [['دسته کالا', 'تعداد'], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']]
        for(let i = 0; i < 6; i ++) {
            let filtered = this.props.products ? this.props.products.filter(element => element.first_category === CATEGORIES[i]) : [];
            data[i+1] = [CATEGORIES[i], filtered.length]
        }
        return data
    }

    get_trend = () => {
        let data = [['تاریخ', 'تعداد'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0']];
        let d = Date.now();
        for (let i = 0; i < 14; i ++) {
            let users = this.props.products ? this.props.products.filter(element => Math.ceil(Math.abs(d - new Date(element.created)) / (1000 * 60 * 60 * 24))>=i+1) : [];
            let date = new JDate(new Date(d - i * (1000 * 60 * 60 * 24)))
            data[14 - i] = [date.format('MM/DD'), users.length]
        }
        return data;
    }

    get_trend_categories = () => {
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
        for (let i = 0; i < 14; i ++) {
            let products = ['0', '0', '0', '0', '0', '0']
            for (let j = 0; j < 6; j ++) {
                products[j] = this.props.products ? this.props.products.filter(element => element.first_category===CATEGORIES[j] && Math.ceil(Math.abs(d - new Date(element.created)) / (1000 * 60 * 60 * 24))>=i+1) : [];
            }
            let date = new JDate(new Date(d - i * (1000 * 60 * 60 * 24)))
            data[14 - i] = [date.format('MM/DD'), products[0].length, products[1].length, products[2].length, products[3].length, products[4].length, products[5].length]
        }
        return data;
    }

    get_trend_months = () => {
        let data = [['ماه', 'تعداد'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0']];
        let d = Date.now();
        let jd = new JDate(new Date(d));
        for (let i = 0; i < 12; i ++) {
            let users = this.props.products ? this.props.products.filter(element => {
                if (Math.ceil(Math.abs(d - new Date(element.created)) / (1000 * 60 * 60 * 24 * 365))>=2)
                        return false
                let date = new JDate(new Date(element.created)); 
                if (date.getMonth() === (jd.getMonth() - i) % 12)
                    return true
                else
                    return false
            }) : [];
            let date1 = new JDate(new Date(d - i * (1000 * 60 * 60 * 24 * 31)))
            data[12 - i] = [date1.format('MMMM YY'), users.length]
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
            let products = ['0', '0', '0', '0', '0', '0']
            for (let j = 0; j < 6; j ++) {
                let p = this.props.products ? this.props.products.filter(element => {
                    if (element.first_category !== CATEGORIES[j])
                        return false
                    if (Math.ceil(Math.abs(d - new Date(element.created)) / (1000 * 60 * 60 * 24 * 365))>=2)
                        return false
                    let date = new JDate(new Date(element.created)); 
                    if (date.getMonth() === (jd.getMonth() - i) % 12)
                        return true
                    else
                        return false
                }) : [];
                products[j] = p.length
            }
            let date1 = new JDate(new Date(d - i * (1000 * 60 * 60 * 24 * 31)))
            data[12 - i] = [date1.format('MMMM YY'), products[0], products[1], products[2], products[3], products[4], products[5]]
        }
        return data;
    }

    render() {
        return (
            <div className='account-reports__container'>
                <div className='account-reports__section'>
                    <div className='account-reports__title'>نسبت تعداد کالاها در دسته‌های مختلف</div>
                    <CustomPieChart data={this.get_percentages()} />
                </div>
                <div className='account-reports__section account-reports__section--big'>
                    <div className='account-reports__title'>تعداد کالاهای موجود در سامانه در طول روزهای گذشته</div>
                    <CustomPlot data={this.get_trend()} />
                </div>
                <div className='account-reports__section account-reports__section--big'>
                    <div className='account-reports__title'>تعداد کالاهای موجود در سامانه در طول روزهای گذشته به تفکیک دسته</div>
                    <CustomPlot data={this.get_trend_categories()} type='Bar'/>
                </div>
                <div className='account-reports__section account-reports__section--big'>
                    <div className='account-reports__title'>تعداد کالاهای ثبت شده به سامانه در طول ماه‌های گذشته</div>
                    <CustomPlot data={this.get_trend_months()} type='AreaChart'/>
                </div>
                <div className='account-reports__section account-reports__section--big'>
                    <div className='account-reports__title'>تعداد کالاهای ثبت شده به سامانه در طول ماه‌های گذشته به تفکیک دسته</div>
                    <CustomPlot data={this.get_trend_months_categories()} type='AreaChart'/>
                </div>
            </div>
        )
    }
}

export default ProductReports;