import React from "react";

import './style.scss'

import ToPersianNum from '../../basic/toPersianNum'
import ToEnglishNum from '../../basic/toEnglishNum'

class OrderInput extends React.Component {
  changed = (props) => {
    if (this.props.onChange) {
      this.props.onChange(props)
    }
  }

  render() {
    return (
      <div className='custom-input__container'>
        <div className="custom-input__inner-container">
          <label className="custom-input__label">{this.props.label}</label>{this.props.meta ? renderError(this.props.meta) : null}
          <input className="custom-input__input" onChange={(e) => {this.props.input.onChange(ToEnglishNum(e.target.value)); this.changed(e.target.value)}} value={ToPersianNum(this.props.input.value)} type={this.props.type ? this.props.type != "number" ? this.props.type : 'text' : 'text'}/>
        </div>
      </div>
    );
  }
};

const renderError = ({touched, error}) => {
    if(touched && error)
    {
        return(
            <div className="custom-input__error">
                {error}
            </div>
        );
    }
}

export default BasicInput;