import React from 'react'
import anime from 'animejs'

import './style.scss'

import Item from '../navDropItem'

const navItems = [
    {

    },{

    },{

    }
]

const NavDropDown = (props) => {
        let tl = anime.timeline({
            easing: 'easeOutExpo',
            duration: 1500
        })
        return(<div className="nav-drop-down__container">
            {props.active ? navItems.map((element, index) => <Item key={index} tl={tl} delay={anime.stagger(200)}/>) : null}
        </div>)
}

export default NavDropDown