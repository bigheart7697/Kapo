import React from "react";

import "./style.scss";

export default props => {
  return (
    <div className={`basic-select__container ${props.full ? "basic-select__container--full" : null}`}>
      <div className="basic-select__inner-container">
        <label className="basic-select__label">{props.label}</label>
        <select className="basic-select__input" {...props.input}>
          {props.noEmpty ? null :<option></option>}
          {props.content ? props.content.map((element, index) => {
            return <option key={index} value={element.value ? element.value : ""}>{element.text}</option>;
          }) : null}
        </select>
      </div>
      {props.meta ? renderError(props.meta) : null}
    </div>
  );
};

const renderError = ({ touched, error }) => {
  if (touched && error) {
    return <div className="basic-input__error">{error}</div>;
  }
};
