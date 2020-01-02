import React from 'react'


import './style.scss'

class NavDropItem extends React.Component {
    componentDidMount(){
        this.props.tl.add({
            targets: '.nav-drop-item__container',
            opacity: 1,
            delay: this.props.delay
        })
    }
    render() {
        return(<div className="nav-drop-item__container"></div>)
    }
}

export default NavDropItem