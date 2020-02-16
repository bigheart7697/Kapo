import React from 'react'
import  {createAdvertisingBanners} from "../../../actions"
import { connect } from 'react-redux'

import './style.scss'

import Form from '../../form'
import FormWrapper from '../../formWrapper'

const FORM_VALUES = {
    submitText: "ثبت",
    title: "ثبت درخواست بنر تبلیغاتی",
    form_inputs: [
      {
        title: "days",
        label: "تعداد روز",
        inputType: "number",
        error: "لطفا تعداد روز نمایش را وارد کنید"
      },
      {
        title: "place",
        label: "مکان بنر",
        type: "select",
        content:[
          {text: "پنل کاربر", value: "1"},
          {text: "جزئیات محصولات", value: "2"}
        ],
        error: "لطفا مکان بنر خود را مشخص کنید"
      },
      {
        title: "slogan",
        label: "شعار مورد نظر",
        error: "لطفا شعار مدنظرتان برای بنر را انتخاب کنید"
      }
    ]
  };

class SubmitAdvertisingBanners extends React.Component {
    onSubmit = (formValues) => {
        this.props.createAdvertisingBanners(formValues, this.props.product.id)
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
                  تعداد بنرهای در انتظار
                </div>
              </div>
              <div className='submit-advertising-banners__row'>
                <div className='submit-advertising-banners__cell'>
                  پنل کاربر
                </div>
                <div className='submit-advertising-banners__cell'>
                  3
                </div>
              </div>
              <div className='submit-advertising-banners__row'>
                <div className='submit-advertising-banners__cell'>
                  جزئیات محصول
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

export default connect(null, { createAdvertisingBanners })(SubmitAdvertisingBanners);