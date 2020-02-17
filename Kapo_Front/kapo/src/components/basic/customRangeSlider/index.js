import React from 'react'
import { Range } from 'rc-slider';

import './style.scss'
import 'rc-slider/assets/index.css';

import ToPersianNum from '../../basic/toPersianNum'
import ToEnglishNum from '../../basic/toEnglishNum'

class CustomRangeSlider extends React.Component {
    state={range: [this.props.min, this.props.max]}
    onChangeHandler = (range) => {
        this.setState({ range: range })
    }
    render(){
        this.props.syncState(this.state.range)
        return(<div className="custom-range-slider__container">
            <div className="custom-range-slider__header">{this.props.header}</div>
            <div className="custom-range-slider__slider">
                <Range min={this.props.min} max={this.props.max} allowCross={false} value={[this.state.range[0], this.state.range[1]]} onChange={this.onChangeHandler}/>
            </div>
            <div className="custom-range-slider__inputs">
                <input className="custom-range-slider__input" onChange={(e) => {this.setState({ range: [ToEnglishNum(e.target.value), this.state.range[1]] })}} value={ToPersianNum(this.state.range[0])}></input>
                <input className="custom-range-slider__input" onChange={(e) => {this.setState({ range: [this.state.range[0], ToEnglishNum(e.target.value)] })}} value={ToPersianNum(this.state.range[1])}></input>
            </div>
        </div>)
    }
}

export default CustomRangeSlider