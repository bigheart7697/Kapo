import React from 'react'

import './style.scss'

import Item from '../navDropItem'

const navItems = [
    {

    },{

    },{

    }
]

class NavDropDown extends React.Component {
    componentDidMount(){
        
    }
    render(){
        return(<div className="nav-drop-down__container">
            {this.props.active ? navItems.map((element, index) => <Item/>) : null}
        </div>)
    }
}

export default NavDropDown