import React from "react";

import "./style.scss";

const CustomButtom = props => {
  return <button className="custom-button__container" type={props.type ? props.type : "button"} onClick={props.onClick}>{props.text}</button>;
};

export default CustomButtom;
