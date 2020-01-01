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
<<<<<<< HEAD
      error: "لطفا نام کالا را وارد کنید"
    },
    {
      title: "quantity",
      label: "تعداد",
      error: "لطفا تعداد وارد کنید"
    },
    {
      title: "price",
      label: "قیمت",
      error: "لطفا قیمت وارد کنید"
    },
    {
      title: "description",
      label: "توضیحات",
      error: "لطفا توضیحات محصول را وارد کنید"
    }
=======
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
>>>>>>> 36663e9d5389f48a4283e57a90944b1a7892028d
  ]
};

class AddProduct extends React.Component {
  onSubmit = (formValues) => {
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
