import React from 'react'

import './style.scss'

const NavItem = (props) => {
    return(<div className={`navitem__container ${props.active ? "navitem__active" : ""}`} onClick={props.onClick} onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut}>{props.children}</div>)
}

export default NavItem