import React from "react";
import { Field, reduxForm } from "redux-form";

import "./style.scss";

import CustomInput from "../basic/customInput";
import CustomButton from "../basic/customButton";
import WhiteSpace from '../basic/whitespace';

class Form extends React.Component {
  setComponent = type => {
    switch (type) {
      default:
        return CustomInput;
    }
  };
  render() {
    return (
      <form
        className="form__container"
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        { this.props.title ? <div className="form__title">{this.props.title}</div> : null}
        <div className={'form__input-container'}>
          {this.props.formValues.map((element, index) => {
            return (
              <Field
                name={element.title}
                component={this.setComponent(element.type)}
                label={element.label}
                key={index}
              />
            );
          })}
        </div>
        <WhiteSpace space="2" />
        {this.props.submitText ? <CustomButton text={this.props.submitText}/> : null}
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  return errors;
};

export default reduxForm({
  form: "form",
  validate: validate
})(Form);
