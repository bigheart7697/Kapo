import React from 'react'
import Chart from "react-google-charts";

import './style.scss'

const CustomPlot = (props) => {
    return (
        <Chart
            width={'500px'}
            height={'300px'}
            chartType="Bar"
            loader={<div>در حال محاسبه اطلاعات</div>}
            data={props.data}
            options={{
                chart: {
                    title: 'تعداد کاربران ثبت نام کرده طی روزهای مختلف'
                },
            }}
        />
    )
}

export default CustomPlot;