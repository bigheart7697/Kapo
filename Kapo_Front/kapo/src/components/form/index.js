import React from "react";
import { Field, reduxForm } from "redux-form";

import "./style.scss";

import CustomInput from "../basic/customInput";
import CustomButton from "../basic/customButton";
import CustomSelect from "../basic/customSelect"
import WhiteSpace from "../basic/whitespace";

class Form extends React.Component {
  setComponent = type => {
    switch (type) {
      case "select":
        return CustomSelect
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
        {this.props.title ? (
          <div className="form__title">{this.props.title}</div>
        ) : null}
        <div className={"form__input-container"}>
          {this.props.formValues.map((element, index) => {
            return (
              <Field
                name={element.title}
                component={this.setComponent(element.type)}
                label={element.label}
                type={element.inputType}
                content={element.content}
                full={true}
                key={index}
              />
            );
          })}
        </div>
        <WhiteSpace space="2" />
        {this.props.submitText ? (
          <CustomButton text={this.props.submitText} type="submit" />
        ) : null}
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "لطفا نام کالا را وارد کنید";
  }
  if (!formValues.quantity) {
    errors.quantity = "لطفا تعداد وارد کنید";
  }
  if (!formValues.price) {
    errors.price = "لطفا قیمت وارد کنید";
  }
  if (!formValues.description) {
    errors.description = "لطفا توضیحات محصول را وارد کنید";
  }
  if (!formValues.production_year){
    errors.production_year = "لطفا سال تولید کالای خود را وارد نمایید"
  }
  if (!formValues.production_year){
    errors.production_year = "لطفا نوع کالای خود را وارد نمایید"
  }
  return errors;
};

export default reduxForm({
  form: "form",
  validate: validate
})(Form);
