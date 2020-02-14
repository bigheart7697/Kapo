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
                height={"30rem"}
                legend_toggle
            />
        </div>
    )
}

export default CustomPieChart;