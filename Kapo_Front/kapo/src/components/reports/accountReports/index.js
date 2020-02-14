import React from 'react'

import './style.scss'

import CustomPieChart from '../../basic/customPieChart'
import CustomPlot from '../../basic/customPlot'

const JDate = require('jalali-date');

class AccountReports extends React.Component {
    
    get_percentages = () => {
        let corporates = this.props.accounts ? this.props.accounts.filter(element => element.is_corporate) : [];
        let users = this.props.accounts ? this.props.accounts.filter(element => !element.is_corporate) : [];
        return ([['گروه', 'تعداد'], ['فروشندگان', corporates.length], ['خریداران', users.length]])
    }

    get_trend = () => {
        let data = [['تاریخ', 'تعداد'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0']];
        let d = Date.now();
        for (let i = 0; i < 14; i ++) {
            let users = this.props.accounts ? this.props.accounts.filter(element => Math.ceil(Math.abs(d - new Date(element.date_joined)) / (1000 * 60 * 60 * 24))>=i+1) : [];
            let date = new JDate(new Date(d - i * (1000 * 60 * 60 * 24)))
            data[14 - i] = [date.format('MM/DD'), users.length]
        }
        return data;
    }

    get_trend_months = () => {
        let data = [['ماه', 'تعداد'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0'], ['0', '0']];
        let d = Date.now();
        let jd = new JDate(new Date(d));
        for (let i = 0; i < 12; i ++) {
            let users = this.props.accounts ? this.props.accounts.filter(element => {
                let date = new JDate(new Date(element.date_joined)); 
                if (date.getMonth() === (jd.getMonth() - i) % 12)
                    return true
                else
                    return false
            }) : [];
            let date1 = new JDate(new Date(d - i * (1000 * 60 * 60 * 24 * 31)))
            console.log(i, date1.format('dd DD MMMM YYYY'), jd.getMonth())
            data[12 - i] = [date1.format('MMMM YY'), users.length]
        }
        return data;
    }

    render() {
        return (
            <div className='account-reports__container'>
                <div className='account-reports__section'>
                    <div className='account-reports__title'>نسبت تعداد فروشگاه‌ها و خریداران</div>
                    <CustomPieChart data={this.get_percentages()} />
                </div>
                <div className='account-reports__section account-reports__section--big'>
                    <div className='account-reports__title'>تعداد کاربران در طول روزهای گذشته</div>
                    <CustomPlot data={this.get_trend()} />
                </div>
                <div className='account-reports__section account-reports__section--big'>
                    <div className='account-reports__title'>تعداد کاربران اضافه شده به سامانه در طول ماه‌های گذشته</div>
                    <CustomPlot data={this.get_trend_months()} type='AreaChart'/>
                </div>
            </div>
        )
    }
}

export default AccountReports;