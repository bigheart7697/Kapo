import React, { Component } from "react";
import Switch from "react-switch";

import './style.scss'

class SwitchExample extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(checked) {
    this.setState({ checked });
  }
 
  render() {
    return (
      <div className="custom-react-switch__container">
        <span>{this.props.label}</span>
        <div className="custom-react-switch__switch">
            <Switch onChange={this.handleChange} checked={this.state.checked} />
        </div>
      </div>
    );
  }
}

export default SwitchExample