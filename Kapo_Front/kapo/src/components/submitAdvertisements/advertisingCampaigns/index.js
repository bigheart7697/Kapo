import React from 'react'
import  {createAdvertisingCampaigns} from "../../../actions"
import { connect } from 'react-redux'

import './style.scss'

import Form from '../../form'
import FormWrapper from '../../formWrapper'

const FORM_VALUES = {
    submitText: "ثبت",
    title: "ثبت درخواست کمپین تبلیغاتی",
    form_inputs: [
      {
        title: "count",
        label: "تعداد روز",
        inputType: "number",
        error: "لطفا تعداد روز نمایش را وارد کنید"
      },
      {
        title: "place",
        label: "مکان نمایش کمپین",
        type: "select",
        content:[
          {text: "مکان 1", value: "1"},
          {text: "مکان 2", value: "2"},
          {text: "مکان 3", value: "3"}
        ],
        error: "لطفا مکان نمایش کمپین خود را مشخص کنید"
      }
    ]
  };

class SubmitAdvertisingCampaigns extends React.Component {
    onSubmit = (formValues) => {
        this.props.createAdvertisingCampaigns(formValues, this.props.product.id)
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

export default connect(null, { createAdvertisingCampaigns })(SubmitAdvertisingCampaigns);