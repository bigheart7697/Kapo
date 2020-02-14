import React from 'react'
import Chart from "react-google-charts";

import './style.scss'

const CustomPieChart = (props) => {
    return (
        <div className='custom-pie-chart__container'>
            <Chart
                chartType="PieChart"
                data={props.data}
                loader={<div>در حال محاسبه اطلاعات</div>}
                graph_id="PieChart"
                width={"100%"}
                height={"100%"}
                legend_toggle
                options={{
                    title: 'تعداد فروشندگان و خریداران سامانه'
                }}
            />
        </div>
    )
}

export default CustomPieChart;