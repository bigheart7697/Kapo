import React from "react";
import { Field, reduxForm } from "redux-form";

import "./style.scss";

import CustomInput from "../basic/customInput";
import CustomButton from "../basic/customButton";
import CustomSelect from "../basic/customSelect";
import CustomFileUpload from '../basic/customFileUpload';
import WhiteSpace from "../basic/whitespace";

class Form extends React.Component {
  state = {categories1: [], categories2: [], categories3: []}

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
    console.log('0000')
    console.log(this.props.categories)
    this.setState({categories1: this.props.categories})
    this.props.initialize (this.props.initialValues ? this.props.initialValues : {})
    console.log(this.state)
  }

  onChangeCategory = (value, id) => {
    console.log(this.refs.category2)
    console.log(id)
    if (id==='1') {
      let obj = this.props.categories ? this.props.categories.find(o => o.value === value) : [];
      this.refs.category2.setContent({content: obj.categories})
    }
    if (id==='2') {
      let obj = this.state.category1 ? this.state.category1.categories ? 
        this.state.category1.categories.find(o => o.value === value) : [] : [];
      this.refs.category3.setContent({content: obj.categories})
    }
  }

  changeInitialValues = (props) => {
    this.props.initialize (props.initialValues ? props.initialValues : {})
  }

  render() {
    console.log(this.props.initialValues)
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
        {this.props.categories ? (
          <div className={"form__input-container"}>
            <Field
              name='first'
              component={CustomSelect}
              label='دسته اول'
              content={this.state.categories1}
              full={true}
              ref='category1'
              id='1'
              onChange={this.onChangeCategory}
            />
            <Field
              name='second'
              component={CustomSelect}
              label='دسته دوم'
              content={this.state.categories2}
              full={true}
              ref='category2'
              id='2'
              onChange={this.onChangeCategory}
            />
            <Field
              name='third'
              component={CustomSelect}
              label='دسته سوم'
              content={this.state.categories3}
              full={true}
              ref='category3'
              id='3'
              onChange={this.onChangeCategory}
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
