import React from 'react'
import  {chargeAccount} from "../../actions"
import { connect } from 'react-redux'

import './style.scss'

import Form from '../../form'
import FormWrapper from '../../formWrapper'

const FORM_VALUES = {
    submitText: "ثبت",
    title: "شارژ حساب",
    form_inputs: [
      {
        title: "amount",
        label: "مبلغ",
        inputType: "number",
        error: "لطفا مبلغ را وارد کنید"
      }
    ]
  };

class ChargeAccount extends React.Component {
    onSubmit = (formValues) => {
        this.props.chargeAccount(formValues, this.props.product.id)
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

export default connect(null, { chargeAccount })(ChargeAccount);