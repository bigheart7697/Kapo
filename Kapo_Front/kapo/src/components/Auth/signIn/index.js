import React from "react";
import { connect } from "react-redux"
import { SignIn as signInAction } from '../../../actions'

import "./style.scss";

import Form from '../../form'
import FormWrapper from '../../formWrapper'

const FORM_VALUES = {
  submitText: "ورود",
  title: "وارد شوید",
  form_inputs: [
    {
      title: "email",
      label: "ایمیل",
      error: "لطفا نام کاربری خود را وارد کنید"
    },{
        title: "password",
        inputType: "password",
        label: "رمز عبور",
        error: "لطفا رمز عبور خود را وارد کنید"
    }
  ]
};

class SignIn extends React.Component {
  onSubmit = (formValues) => {
    this.props.signInAction(formValues)
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

export default connect(null, { signInAction })(SignIn);
