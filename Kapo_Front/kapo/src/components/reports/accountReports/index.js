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
            let users = this.props.accounts ? this.props.accounts.filter(element => Math.ceil(Math.abs(d - new Date(element.date_joined)) / (1000 * 60 * 60 * 24))===i+1) : [];
            let date = new JDate(new Date(d - i * (1000 * 60 * 60 * 24)))
            data[i+1] = [date.format('YYYY/MM/DD'), users.length]
        }
        return data;
    }

    render() {
        return (
            <div className='account-reports__container'>
                <CustomPieChart data={this.get_percentages()} />
                <CustomPlot data={this.get_trend()} />
            </div>
        )
    }
}

export default AccountReports;