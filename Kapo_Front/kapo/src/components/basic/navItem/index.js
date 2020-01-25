import React from 'react'

import './style.scss'

const NavItem = (props) => {
    return(
        <div className='navitem__box' onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut}>
            <div className={`navitem__container ${props.active ? "navitem__active" : ""}`} onClick={props.onClick}>
                {props.children}
            </div>
        </div>)
}

export default NavItem