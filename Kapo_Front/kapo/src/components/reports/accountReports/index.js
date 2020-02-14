import React from 'react'
import Chart from "react-google-charts";

import './style.scss'

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
    
    render() {
        return (
            <div className='account-reports__container'>
            <Chart
                chartType="PieChart"
                data={[["Age", "Weight"], ["a", 12], ["b", 5.5], ["c", 1], ["d", 8]]}
                graph_id="PieChart"
                width={"100%"}
                height={"400px"}
                legend_toggle
                options={{
                    title: 'My Daily Activities',
                    is3D: true,
                }}
            />
            </div>
        )
    }
}

export default AccountReports;