import React from 'react'

import './style.scss'

import ProfileImage from '../basic/profileImage'
import Form from '../form'
import FormWrapper from '../formWrapper'

const FORM_VALUES = {
    submitText: "ویرایش",
    title: "ویرایش پروفایل",
    form_inputs: [
      //corporate_name, corporate_number
      {
        title: "phone_number",
        label: "شماره تلفن",
        error: "لطفا شماره تلفن خود را وارد کنید"
      }, {
        title: "country",
        label: "کشور"
      }, {
        title: "city",
        label: "شهر",
        error: "لطفا شهر خود را وارد کنید"
      }, {
        title: "Address",
        label: "آدرس"
      }, {
        title: "corporate_name",
        label: "اسم شرکت"
      }, {
        title: "corporate_number",
        label: "شماره شرکت"
      }, {
        title: "first_name",
        label: "نام"
      }, {
        title: "last_name",
        label: "نام خانوادگی"
      }
    ]
  };

class EditProfile extends React.Component{
    onSubmit = (formValues) => {
        console.log('submit')
    }
    render(){
        return(
            <div className="edit-profile__container">
                <ProfileImage />
                <div className="edit-profile__email">
                {}
                   : ایمیل
                </div>
                <FormWrapper dashboard>
                    <Form
                        formValues={FORM_VALUES.form_inputs}
                        onSubmit={this.onSubmit}
                        submitText={FORM_VALUES.submitText}
                        title={FORM_VALUES.title}
                        dashboard
                    ></Form>
                </FormWrapper>
            </div>
        )
    }
}

export default EditProfile