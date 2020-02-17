import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
import { SignUp as signUpAction } from '../../../actions'

import "./style.scss";

import Form from '../../form'
import FormWrapper from '../../formWrapper'

const FORM_VALUES = {
  submitText: "ثبت نام",
  title: "ثبت نام کنید",
  form_inputs: [
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
      title: "address",
      label: "آدرس"
    }, {
      title: "is_corporate",
      label: "آیا فروشنده هستید",
      type: "select",
      content: [
        { text: "بله", value: "True" },
        { text: "خیر", value: "False" }
      ]
    },{
      title: "image",
      label: "تصویر", 
      type: "file",
      error: "لطفا تصویر کالا را بارگذاری کنید"
    }
  ]
};

class SignUp extends React.Component {
  onSubmit = (formValues) => {
    this.props.signUpAction(formValues, this.props.showModal)
  };
  render() {
    let formVals = [...FORM_VALUES.form_inputs]
    if(this.props.is_corporate === 'True'){
      formVals.push({
        title: "corporate_name",
        label: "اسم شرکت"
      })
      formVals.push({
        title: "corporate_number",
        label: "شماره شرکت"
      })
      formVals.push({
        title: "agreement",
        type: "agreement",
        content: true
      })
    }else if((this.props.is_corporate === 'False')){
      formVals.push({
        title: "first_name",
        label: "نام"
      })
      formVals.push({
        title: "last_name",
        label: "نام خانوادگی"
      })
      formVals.push({
        title: "agreement",
        type: "agreement",
        content: false
      })
    }
    return (
      <div className="sign-up__container">
        <FormWrapper>
          <Form
            rerender={this.props.is_corporate}
            formValues={formVals}
            onSubmit={this.onSubmit}
            submitText={FORM_VALUES.submitText}
            title={FORM_VALUES.title}
          ></Form>
          <Link to="/auth/SignIn">وارد شوید</Link>
        </FormWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return({ is_corporate : state.form ? state.form.form ? state.form.form.values ? state.form.form.values.is_corporate : null : null : null })
}

export default connect(mapStateToProps, { signUpAction })(SignUp);
