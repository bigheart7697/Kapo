import React from "react";

import "./style.scss";

import Form from '../form'
import FormWrapper from '../formWrapper'

const FORM_VALUES = {
  submitText: "ثبت",
  title: "اضافه کردن کالای جدید",
  form_inputs: [
    {
      title: "name",
      label: "نام کالا",
      error: "لطفا نام کالای خود را وارد کنید"
    },
    {
      title: "description",
      label: "توضیحات",
      type: "password",
      error: "لطفا توضیحات مربوط به کالای خود را وارد کنید"
    },
    {
      title: "quantity",
      label: "تعداد کالای موجود",
      inputType: "number",
      error: "لطفا تعداد کالای موجود را وارد کنید"
    },
    {
      title: "production_year",
      label: "سال تولید",
      inputType: "number",
      error: "لطفا سال تولید کالای خود را وارد نمایید"
    },
    {
      title: "second_hand",
      label: "آیا کالا دست دوم است؟",
      error: "لطفا نوع کالای خود را وارد نمایید"
    },
    {
      title: "second_hand",
      label: "دست دوم",
      inputType: "checkbox",
      error: "لطفا نوع کالای خود را وارد نمایید"
    },
    {
      title: "second_hand",
      label: "نو",
      inputType: "checkbox",
      error: "لطفا نوع کالای خود را وارد نمایید"
    },
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
