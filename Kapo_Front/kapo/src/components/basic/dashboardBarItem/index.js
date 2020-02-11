import React from 'react'

import './style.scss'

const DashboardBarItem = props => {
    return(
            <div className={`dashboard-bar-item__container ${props.active ? "dashboard-bar-item__container--active" : null}`} onClick={props.onClick}>
                <div className="dashboard-bar-item__image" style={{ backgroundImage : `url('${props.image}')` }}></div>
                <div className="dashboard-bar-item__label">{props.label}</div>
            </div> 
    )
}

export default DashboardBarItem