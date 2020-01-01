import React from "react";
import { connect } from 'react-redux'
import { addProduct } from '../../actions'

import "./style.scss";

import Form from '../form'
import FormWrapper from '../formWrapper'

const FORM_VALUES = {
  submitText: "اضافه",
  title: "اضافه کردن کالای جدید",
  form_inputs: [
    {
      title: "name",
      label: "نام کالا",
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
