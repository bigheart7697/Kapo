import React from 'react'
import  {createSponsoredSearch} from "../../../actions"
import { connect } from 'react-redux'

import './style.scss'

import Form from '../../form'
import FormWrapper from '../../formWrapper'

const FORM_VALUES = {
    submitText: "ثبت",
    title: "ثبت درخواست جست‌وجوی اسپانسر شده",
    form_inputs: [
      {
        title: "count",
        label: "تعداد نمایش",
        inputType: "number",
        error: "لطفا تعداد بار نمایش را وارد کنید"
      },
      {
        title: "search_phrases",
        label: "کلمات مورد نظر",
        error: "لطفا کلمات مد نظر خود را وارد کنید"
      }
    ]
  };

class SubmitSponseredSearch extends React.Component {
    onSubmit = (formValues) => {
        this.props.createSponsoredSearch(formValues, this.props.product.id)
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

export default connect(null, { createSponsoredSearch })(SubmitSponseredSearch);