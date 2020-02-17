import React from "react";
import Switch from "react-switch";

import './style.scss'

const SwitchExample = props => {
  return (
    <div className="custom-react-switch__container">
      <span>{props.label}</span>
      <div className="custom-react-switch__switch">
          <Switch onChange={props.handleChange} checked={props.checked} />
      </div>
    </div>
  );
}

export default SwitchExample