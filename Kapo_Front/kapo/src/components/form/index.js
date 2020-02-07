import React from "react";
import { Field, reduxForm } from "redux-form";

import "./style.scss";

import CustomInput from "../basic/customInput";
import CustomButton from "../basic/customButton";
import CustomSelect from "../basic/customSelect";
import CustomFileUpload from '../basic/customFileUpload';
import WhiteSpace from "../basic/whitespace";

class Form extends React.Component {
  setComponent = type => {
    switch (type) {
      case "select":
        return CustomSelect;
      case "file":
        return CustomFileUpload;
      default:
        return CustomInput;
    }
  }

  componentDidMount() {
    this.props.initialize (this.props.initialValues ? this.props.initialValues : {})
  }

  changeInitialValues = (props) => {
    this.props.initialize (props.initialValues ? props.initialValues : {})
  }

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
        {this.props.categories1 ? (
          <div className={"form__input-container"}>
            <Field
              name='first'
              component={CustomSelect}
              label='دسته اول'
              content={this.props.categories1}
              full={true}
              id='1'
              onChange={this.props.onChangeCategory}
            />
            <Field
              name='second'
              component={CustomSelect}
              label='دسته دوم'
              content={this.props.categories2}
              full={true}
              id='2'
              onChange={this.props.onChangeCategory}
            />
            <Field
              name='third'
              component={CustomSelect}
              label='دسته سوم'
              content={this.props.categories3}
              full={true}
              id='3'
              onChange={this.props.onChangeCategory}
            />
          </div>
        ) : null}
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
    errors.name = "لطفا نام را وارد کنید";
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
  if(!formValues.price){
    errors.production_year = "لطفا قیمت کالای موجود را وارد کنید"
  }
  if(!formValues.username){
    errors.username = "لطفا نام کاربری خود را وارد کنید"
  }
  if(!formValues.password){
    errors.password = "لطفا رمز عبور خود را وارد کنید"
  }
  if(!formValues.city){
    errors.city = "لطفا شهر خود را وارد کنید"
  }
  if(!formValues.phone_number){
    errors.phone_number = "لطفا شماره تلفن خود را وارد کنید"
  }
  return errors;
};

export default reduxForm({
  form: "form",
  validate: validate
})(Form);
