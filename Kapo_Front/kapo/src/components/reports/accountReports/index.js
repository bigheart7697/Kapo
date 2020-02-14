import React from 'react'

import './style.scss'

import CustomPieChart from '../../basic/customPieChart'

const data = 
    [
        {
        label: 'Series 1',
        data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
        },
        {
        label: 'Series 2',
        data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
        }
    ]

const axes = [
        { primary: true, type: 'linear', position: 'bottom' },
        { type: 'log', position: 'left' }
    ]

class AccountReports extends React.Component {
    
    get_percentages = () => {
        let corporates = this.props.accounts ? this.props.accounts.filter(element => element.is_corporate) : [];
        let users = this.props.accounts ? this.props.accounts.filter(element => !element.is_corporate) : [];
        return ([['گروه', 'تعداد'], ['فروشندگان', corporates.length], ['خریداران', users.length]])
    }

    render() {
        return (
            <div className='account-reports__container'>
                <CustomPieChart data={this.get_percentages()} />
            </div>
        )
    }
}

export default AccountReports;