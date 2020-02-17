import React from 'react'

import './style.scss'

import DashboardBaritem from '../dashboardBarItem'

const dashboardBar = props => {
    return(
        <div className="dashboard-bar__container">
            {props.content.map((item, index) => {
                return(
                    <DashboardBaritem key={index} label={item.text} image={item.image} onClick={() => props.changeActiveTab(index)} active={props.activeTab === index ? true : false}/>
                )
            })}
        </div>
    )
}

export default dashboardBar