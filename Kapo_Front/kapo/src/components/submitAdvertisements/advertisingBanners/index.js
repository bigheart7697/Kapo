import React from 'react'
import  {createAdvertisingBanners, bannerCount} from "../../../actions"
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
componentDidMount() {
  this.props.bannerCount(1);
  this.props.bannerCount(2);
}

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
                  {this.props.first_banners_count}
                </div>
              </div>
              <div className='submit-advertising-banners__row'>
                <div className='submit-advertising-banners__cell'>
                  جزئیات محصول
                </div>
                <div className='submit-advertising-banners__cell'>
                {this.props.second_banners_count}
                </div>
              </div>
            </div>
          </>
        );
      }
}

const mapStatetoProps = (state, ownProps) => {
  return {first_banners_count: state.advertisements.first_banners_count, second_banners_count: state.advertisements.second_banners_count,}
}

export default connect(mapStatetoProps, { createAdvertisingBanners, bannerCount })(SubmitAdvertisingBanners);