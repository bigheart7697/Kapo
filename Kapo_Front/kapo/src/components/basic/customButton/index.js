import React from "react";

import "./style.scss";

const CustomButtom = props => {
  return <div className="custom-button__container" onClick={props.onClick}>{props.text}</div>;
};

export default CustomButtom;
