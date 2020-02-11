import React from 'react'

import './style.scss'

const SortingSlot = props => {
    return(
    <div className="sorting-slot__container">
        <div className="sorting-slot__label">بر اساس {props.label}</div>
        <div className="sorting-slot__buttons">
            <div className={`sorting-slot__button sorting-slot__button-left ${props.active == 0 ? "sorting-slot__active" : ""}`} onClick={props.active0}>نزولی</div>
            <div className={`sorting-slot__button sorting-slot__button-right ${props.active == 1 ? "sorting-slot__active" : ""}`} onClick={props.active1}>صعودی</div>
        </div>
    </div>)
}

export default SortingSlot