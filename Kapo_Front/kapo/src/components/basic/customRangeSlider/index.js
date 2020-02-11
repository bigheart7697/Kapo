import React from 'react'
import Slider, { Range } from 'rc-slider';

import './style.scss'
import 'rc-slider/assets/index.css';

class CustomRangeSlider extends React.Component {
    state={range: [this.props.min + 0.1 * (this.props.max - this.props.min), this.props.max * 0.9 ]}
    onChangeHandler = (range) => {
        this.setState({ range: range })
    }
    render(){
        return(<div className="custom-range-slider__container">
            <div className="custom-range-slider__header">{this.props.header}</div>
            <div className="custom-range-slider__slider">
                <Range min={this.props.min} max={this.props.max} allowCross={false} value={[this.state.range[0], this.state.range[1]]} onChange={this.onChangeHandler}/>
            </div>
            <div className="custom-range-slider__inputs">
                <input className="custom-range-slider__input" type="number" onChange={(e) => {this.setState({ range: [e.target.value, this.state.range[1]] })}} value={this.state.range[0]}></input>
                <input className="custom-range-slider__input" type="number" onChange={(e) => {this.setState({ range: [this.state.range[0], e.target.value] })}} value={this.state.range[1]}></input>
            </div>
        </div>)
    }
}

export default CustomRangeSlider