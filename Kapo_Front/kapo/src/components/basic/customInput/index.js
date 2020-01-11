import React from "react";

import './style.scss'

const BasicInput = props => {
  return (
    <div className="custom-input__container">
      <div className="custom-input__inner-container">
        <label className="custom-input__label">{props.label}</label>
        <input className="custom-input__input" {...props.input} type={props.type ? props.type : 'text'}/>
      </div>
      {props.meta ? renderError(props.meta) : null}
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