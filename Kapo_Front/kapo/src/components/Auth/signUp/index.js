import React from "react";

import "./style.scss";

import Form from '../../form'
import FormWrapper from '../../formWrapper'

const FORM_VALUES = {
  submitText: "ثبت نام",
  title: "ثبت نام کنید",
  form_inputs: [
    {
      title: "username",
      label: "نام کاربری",
      error: "لطفا نام کاربری خود را وارد کنید"
    },{
        title: "password",
        inputType: "password",
        label: "رمز عبور",
        error: "لطفا رمز عبور خود را وارد کنید"
    },{
        title: "name",
        label: "نام",
        error: "لطفا نام خود را وارد کنید"
    },{
        title: "phone_number",
        label: "شماره تلفن",
        error: "لطفا شماره تلفن خود را وارد کنید"
    },{
        title: "city",
        label: "شهر",
        error: "لطفا شهر خود را وارد کنید"
    },{
        title: "bio",
        label: "شرح حال",
    }
  ]
};

class SignIn extends React.Component {
  onSubmit = (formValues) => {
    console.log("signIn")
  };
  render() {
    return (
      <FormWrapper>
        <Form
          formValues={FORM_VALUES.form_inputs}
          onSubmit={this.onSubmit}
          submitText={FORM_VALUES.submitText}
          title={FORM_VALUES.title}
        ></Form>
      </FormWrapper>
    );
  }
}

export default SignIn;
