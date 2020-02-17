import React from "react";

import './style.scss'

import ToPersianNum from '../../basic/toPersianNum'
import ToEnglishNum from '../../basic/toEnglishNum'

const BasicInput = props => {
  return (
    <div className={`custom-input__container ${props.dashboard ? "custom-input__container--dashboard" : ""}`}>
      <div className="custom-input__inner-container">
        <label className="custom-input__label">{props.label}</label>{props.meta ? renderError(props.meta) : null}
        {props.type==='textbox' ? <textarea {...props.input} className="custom-input__input custom-input__textarea"></textarea> :
          <input className="custom-input__input" onChange={(e) => {props.input.onChange(ToEnglishNum(e.target.value))}} value={ToPersianNum(props.input.value)} type={props.type ? props.type != "number" ? props.type : 'text' : 'text'}/>}
      </div>
    </div>
  );
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