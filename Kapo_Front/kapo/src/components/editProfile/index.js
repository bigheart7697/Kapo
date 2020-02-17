import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { editProfile } from '../../actions'

import './style.scss'

import ProfileImage from '../basic/profileImage'
import Form from '../form'
import FormWrapper from '../formWrapper'

const FORM_VALUES = {
    submitText: "ویرایش",
    title: "ویرایش پروفایل",
    form_inputs_corporate: [
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
        title: "address",
        label: "آدرس"
      }, {
        title: "corporate_name",
        label: "اسم شرکت"
      }, {
        title: "corporate_number",
        label: "شماره شرکت"
      },{
        title: "image",
        label: "تصویر کالا",
        type: "file",
        error: "لطفا تصویر کالا را بارگذاری کنید"
      }
    ],
    form_inputs_normal: [
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
          title: "address",
          label: "آدرس"
        }, {
          title: "first_name",
          label: "نام"
        }, {
          title: "last_name",
          label: "نام خانوادگی"
        },{
            title: "photo",
            type: "file",
            error: "لطفا تصویر کالا را بارگذاری کنید"
          }
      ],
  };

class EditProfile extends React.Component{
    onSubmit = (formValues) => {
        this.props.editProfile(formValues, this.props.information.id)
    }
    render(){
        return(
            <div className="edit-profile__container">
                <ProfileImage image = {this.props.information.photo ? this.props.information.photo : null}/>
                <div className="edit-profile__email">
                {this.props.information ? this.props.information.email : null}
                   : ایمیل
                </div>
                <FormWrapper dashboard>
                    <Form
                        formValues={this.props.information.is_corporate ? FORM_VALUES.form_inputs_corporate : FORM_VALUES.form_inputs_normal}
                        onSubmit={this.onSubmit}
                        submitText={FORM_VALUES.submitText}
                        title={FORM_VALUES.title}
                        initialValues={this.props.information.is_corporate ? _.pick(this.props.information, ['country', 'city', 'address', 'phone_number', 'corporate_name', 'corporate_number']) : _.pick(this.props.information, ['country', 'city', 'address', 'phone_number', 'first_name', 'last_name'])}
                        dashboard
                        enableReinitialize
                    ></Form>
                </FormWrapper>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { information : state.user.information }
}

export default connect(mapStateToProps, { editProfile })(EditProfile)