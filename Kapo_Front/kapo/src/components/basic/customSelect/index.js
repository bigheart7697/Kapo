import React from "react";

import "./style.scss";

class CustomSelect extends React.Component {
  state = {content: []}

  componentDidMount() {
    this.setState({content: this.props.content ? this.props.content : []})
  }

  changed = (event) => {
    console.log(event.target.value)
    if (this.props.onChange) {
      this.props.onChange(event.target.value, this.props.id)
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
          <select className="basic-select__input" {...this.props.input} onChangeCapture={this.changed}>
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
