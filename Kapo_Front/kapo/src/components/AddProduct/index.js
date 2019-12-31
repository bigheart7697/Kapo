import React from "react";

import "./style.scss";

import Form from '../form'
import FormWrapper from '../formWrapper'

const FORM_VALUES = {
  submitText: "اضافه",
  title: "اضافه کردن کالای جدید",
  form_inputs: [
    {
      title: "username",
      label: "نام کاربری",
      error: "لطفا نام خود را وارد کنید"
    },
    {
      title: "first_name",
      label: "نام",
      error: "لطفا نام خود را وارد کنید"
    },
    {
      title: "last_name",
      label: "نام خانوادگی",
      error: "لطفا نام خانوادگی خود را وارد کنید"
    },
    {
      title: "password",
      label: "پسورد",
      inputType: "password",
      error: "لطفا پسورد خود را وارد نمایید"
    },
    {
      title: "confirmPassword",
      label: "تایید پسورد",
      inputType: "password",
      error: "لطفا پسورد خود را وارد نمایید"
    },
    {
      title: "phone",
      label: "شماره تلفن همراه",
      error: "لطفا شماره همراه خود را وارد کنید"
    },
    {
      title: "email",
      label: "ایمیل",
      error: "لطفا ایمیل خود را وارد کنید"
    },
    {
      title: "city",
      label: "شهر"
    },
    {
      title: "province",
      label: "استان"
    }
  ]
};

class AddProduct extends React.Component {
  onSubmit = () => {
    console.log("do action here");
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

export default AddProduct;
