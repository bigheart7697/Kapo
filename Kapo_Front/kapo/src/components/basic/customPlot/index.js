import React from 'react'
import Chart from "react-google-charts";

import './style.scss'

const CustomPlot = (props) => {
    return (
        <Chart
            width={'100%'}
            height={'40rem'}
            chartType={props.type ? props.type : "ScatterChart"}
            loader={<div>در حال محاسبه اطلاعات</div>}
            data={props.data}
        />
    )
}

export default CustomPlot;