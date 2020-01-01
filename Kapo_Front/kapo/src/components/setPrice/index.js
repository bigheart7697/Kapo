import React from "react";

import "./style.scss";

import Form from '../form'
import FormWrapper from '../formWrapper'

const FORM_VALUES = {
  submitText: "ثبت",
  title: "ثبت قیمت کالا",
  form_inputs: [
    {
      title: "price",
      label: "قیمت",
      error: "لطفا قیمت کالای خود را وارد کنید"
    }
  ]
};

class SetPrice extends React.Component {
  render() {
    return (
      <FormWrapper>
        <Form
          formValues={FORM_VALUES.form_inputs}
          onSubmit={this.props.onSubmit}
          submitText={FORM_VALUES.submitText}
          title={FORM_VALUES.title}
        ></Form>
      </FormWrapper>
    );
  }
}

export default SetPrice;
