import React from "react";
import { connect } from 'react-redux'
import { addProduct } from '../../actions'

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
      inputType: "textbox",
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
      title: "price",
      label: "قیمت",
      inputType: "number",
      error: "لطفا قیمت کالای موجود را وارد کنید"
    },
    {
      title: "second_hand",
      label: "آیا کالا دست دوم است؟",
      type: "select",
      content:[
        {text: "بله", value: "True"},
        {text: "خیر", value: "False"}
      ],
      error: "لطفا نوع کالای خود را وارد نمایید"
    },
    {
      title: "image",
      label: "تصویر کالا",
      type: "file",
      error: "لطفا تصویر کالا را بارگذاری کنید"
    }
  ]
};

class AddProduct extends React.Component {
  onSubmit = (formValues) => {
    // console.log(formValues)
    this.props.addProduct(formValues)
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

export default connect(null, { addProduct })(AddProduct);
