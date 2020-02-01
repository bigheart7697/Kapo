import React from "react";
import { connect } from 'react-redux';
import { SignUp as signUpAction } from '../../../actions'

import "./style.scss";

import Form from '../../form'
import FormWrapper from '../../formWrapper'

const FORM_VALUES = {
  submitText: "ثبت نام",
  title: "ثبت نام کنید",
  form_inputs: [
    //corporate_name, corporate_number
    {
      title: "email",
      label: "ایمیل",
      error: "لطفا نام کاربری خود را وارد کنید"
    }, {
      title: "password",
      inputType: "password",
      label: "رمز عبور",
      error: "لطفا رمز عبور خود را وارد کنید"
    }, {
      title: "phone_number",
      label: "شماره تلفن",
      error: "لطفا شماره تلفن خود را وارد کنید"
    }, {
      title: "country",
      label: "کشور"
    }, {
      title: "city",
      label: "شهر",
      error: "لطفا شهر خود را وارد کنید"
    }, {
      title: "Address",
      label: "آدرس"
    }, {
      title: "is_corporate",
      label: "آیا فروشنده هستید",
      type: "select",
      content: [
        { text: "بله", value: "True" },
        { text: "خیر", value: "False" }
      ]
    }, {
      title: "corporate_name",
      label: "اسم شرکت"
    }, {
      title: "corporate_number",
      label: "شماره شرکت"
    }, {
      title: "first_name",
      label: "نام"
    }, {
      title: "last_name",
      label: "نام خانوادگی"
    }
  ]
};

class SignIn extends React.Component {
  onSubmit = (formValues) => {
    // console.log(formValues)
    this.props.signUpAction(formValues)
  };
  render() {
    return (
      <div className="sign-up__container">
        <FormWrapper>
          <Form
            formValues={FORM_VALUES.form_inputs}
            onSubmit={this.onSubmit}
            submitText={FORM_VALUES.submitText}
            title={FORM_VALUES.title}
          ></Form>
        </FormWrapper>
      </div>
    );
  }
}

export default connect(null, { signUpAction })(SignIn);
