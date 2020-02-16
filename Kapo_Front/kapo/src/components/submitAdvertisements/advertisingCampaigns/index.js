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
        title: "days",
        label: "تعداد روز",
        inputType: "number",
        error: "لطفا تعداد روز نمایش را وارد کنید"
      },
      {
        title: "place",
        label: "مکان نمایش کمپین",
        type: "select",
        content:[
          {text: "صفحه اصلی", value: "1"},
          {text: "لیست محصولات", value: "2"}
        ],
        error: "لطفا مکان نمایش کمپین خود را مشخص کنید"
      },
      {
        title: "discount",
        label: "درصد تخفیف",
        inputType: "number",
        error: "لطفا درصد تخفیف را وارد کنید"
      }
    ]
  };

class SubmitAdvertisingCampaigns extends React.Component {
    onSubmit = (formValues) => {
        this.props.createAdvertisingCampaigns(formValues, this.props.product.id)
    };

    render() {
        return (
          <>
            <FormWrapper>
              <Form
                formValues={FORM_VALUES.form_inputs}
                onSubmit={this.onSubmit}
                submitText={FORM_VALUES.submitText}
                title={FORM_VALUES.title}
              ></Form>
            </FormWrapper>
            <div className='submit-advertising-banners__table'>
              <div className='submit-advertising-banners__headers'>
                <div className='submit-advertising-banners__cell'>
                  مکان
                </div>
                <div className='submit-advertising-banners__cell'>
                  تعداد کمپین‌های در انتظار
                </div>
              </div>
              <div className='submit-advertising-banners__row'>
                <div className='submit-advertising-banners__cell'>
                  صفحه اصلی
                </div>
                <div className='submit-advertising-banners__cell'>
                  3
                </div>
              </div>
              <div className='submit-advertising-banners__row'>
                <div className='submit-advertising-banners__cell'>
                  لیست کالاها
                </div>
                <div className='submit-advertising-banners__cell'>
                  7
                </div>
              </div>
            </div>
          </>
        );
      }
}

export default connect(null, { createAdvertisingCampaigns })(SubmitAdvertisingCampaigns);