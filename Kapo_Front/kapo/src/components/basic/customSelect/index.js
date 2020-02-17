import React from "react";

import "./style.scss";

import ToPersianNum from '../../basic/toPersianNum'

class CustomSelect extends React.Component {
  state = {content: [], id: '-1'}

  componentDidMount() {
    this.setState({content: this.props.content ? this.props.content : [], id: this.props.id})
  }

  componentDidUpdate() {
    if(this.state.content !== this.props.content) {
      this.setState({content: this.props.content ? this.props.content : []})
      this.refs.select.value = null
    }
  }

  changed = (event) => {
    if (this.props.onChange) {
      this.props.onChange(event)
    }
  }

  setContent = (props) => {
    this.setState({content: props.content})
  }

  render() {
    return (
      <div className={`basic-select__container ${this.props.full ? "basic-select__container--full" : null} ${this.props.normal ? "basic-select__container--normal" : ""} ${this.props.dashboard ? "basic-select__container--dashboard" : ""}`}>
        <div className={`basic-select__inner-container ${this.props.normal ? "basic-select__inner-container--normal" : ""}`}>
          {this.props.label ? <label className={`basic-select__label ${this.props.normal ? "basic-select__label--normal" : ""}`}>{this.props.label}</label> : null}{this.props.meta ? renderError(this.props.meta) : null}
          <select className="basic-select__input" {...this.props.input} onChangeCapture={this.changed} ref='select'>
            {this.props.noEmpty ? null :<option></option>}
            {this.state.content.map((element, index) => {
              return <option key={index} value={element.value ? element.value : ""}>{ToPersianNum(element.text)}</option>;
            })}
          </select>
        </div>
      </div>
    );
  }
}

const renderError = ({ touched, error }) => {
  if (touched && error) {
    return <div className="basic-select__error">{error}</div>;
  }
};

export default CustomSelect;
