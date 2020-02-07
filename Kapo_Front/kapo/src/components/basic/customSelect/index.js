import React from "react";

import "./style.scss";

class CustomSelect extends React.Component {
  state = {content: [], id: '-1'}

  componentDidMount() {
    this.setState({content: this.props.content ? this.props.content : [], id: this.props.id})
  }

  componentDidUpdate() {
    if(this.state.content != this.props.content) {
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
      <div className={`basic-select__container ${this.props.full ? "basic-select__container--full" : null}`}>
        <div className="basic-select__inner-container">
          {this.props.label ? <label className="basic-select__label">{this.props.label}</label> : null}
          <select className="basic-select__input" {...this.props.input} onChangeCapture={this.changed} ref='select'>
            {this.props.noEmpty ? null :<option></option>}
            {this.state.content.map((element, index) => {
              return <option key={index} value={element.value ? element.value : ""}>{element.text}</option>;
            })}
          </select>
        </div>
        {this.props.meta ? renderError(this.props.meta) : null}
      </div>
    );
  }
}

const renderError = ({ touched, error }) => {
  if (touched && error) {
    return <div className="basic-input__error">{error}</div>;
  }
};

export default CustomSelect;
