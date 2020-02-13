import React from 'react'

import './style.scss'

import SortingSlot from '../sortingSlot'

class AdvancedSorting extends React.Component{
    state={active: 0, direction: 0}
    render(){
        this.props.syncState(this.state.active, this.state.direction)
        return(
        <div className="advanced-sorting__container">
            <SortingSlot label="قیمت" active={this.state.active == 0 ? this.state.direction : null} active0={() => this.setState({active: 0, direction: 0})} active1={() => this.setState({active: 0, direction: 1})}/>
            <SortingSlot label="سال‌ساخت" active={this.state.active == 1 ? this.state.direction : null} active0={() => this.setState({active: 1, direction: 0})} active1={() => this.setState({active: 1, direction: 1})}/>
            <SortingSlot label="امتیاز" active={this.state.active == 2 ? this.state.direction : null} active0={() => this.setState({active: 2, direction: 0})} active1={() => this.setState({active: 2, direction: 1})}/>
        </div>)
    }
}

export default AdvancedSorting