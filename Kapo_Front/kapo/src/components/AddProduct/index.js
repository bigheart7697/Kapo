import React from "react";
import { connect } from 'react-redux'
import { addProduct } from '../../actions'

import "./style.scss";

import Form from '../form'
import FormWrapper from '../formWrapper'

const FORM_VALUES = {
  submitText: "ثبت",
  title: "اضافه کردن کالای جدید",
  form_inputs: [
    {
      title: "name",
      label: "نام کالا",
      error: "لطفا نام کالای خود را وارد کنید"
    },
    {
      title: "description",
      label: "توضیحات",
      inputType: "textbox",
      error: "لطفا توضیحات مربوط به کالای خود را وارد کنید"
    },
    {
      title: "quantity",
      label: "تعداد کالای موجود",
      inputType: "number",
      error: "لطفا تعداد کالای موجود را وارد کنید"
    },
    {
      title: "production_year",
      label: "سال تولید",
      inputType: "number",
      error: "لطفا سال تولید کالای خود را وارد نمایید"
    },
    {
      title: "price",
      label: "قیمت",
      inputType: "number",
      error: "لطفا قیمت کالای موجود را وارد کنید"
    },
    {
      title: "second_hand",
      label: "آیا کالا دست دوم است؟",
      type: "select",
      content:[
        {text: "بله", value: "True"},
        {text: "خیر", value: "False"}
      ],
      error: "لطفا نوع کالای خود را وارد نمایید"
    },
    {
      title: "image",
      label: "تصویر کالا",
      type: "file",
      error: "لطفا تصویر کالا را بارگذاری کنید"
    }
  ]
};

const categories = [
  {text: 'املاک', value: '1', categories: [
    {text: 'رهن', value: '1', categories: [{text: 'نیاوران', value: '1'}, {text: 'پاسداران', value: '2'}]},
    {text: 'اجاره', value: '2', categories: [{text: 'دو خوابه', value: '1'}, {text: 'سه خوابه', value: '2'}, {text: 'بیشتر', value: '3'}]}
  ]},
  {text: 'ماشین', value: '2', categories: [
    {text: 'لوکس', value: '1', categories: [{text: 'بنتلی', value: '1'}, {text: 'بنز', value: '2'}]},
    {text: 'اسپورت', value: '2', categories: [{text: 'لامبورگینی', value: '1'}, {text: 'بوگاتی', value: '2'}]},
    {text: 'ایرانی', value: '3', categories: [{text: 'پراید', value: '1'}, {text: 'پیکان', value: '2'}]}
  ]},
  {text: 'کالای برقی', value: '3', categories: [
    {text: 'خانگی', value: '1', categories: [{text: 'جاروبرقی', value: '1'}, {text: 'ماکروفر', value: '2'}]},
    {text: 'لوازم جانبی', value: '2', categories: [{text: 'شارژر', value: '1'}]}
  ]},
  {text: 'لباس', value: '4', categories: [
    {text: 'زنانه', value: '1', categories: [{text: 'کفش', value: '1'}, {text: 'شلوار', value: '2'}]},
    {text: 'مردانه', value: '2', categories: [{text: 'شلوار', value: '1'}, {text: 'پیراهن', value: '2'}]},
    {text: 'بچگانه', value: '3', categories: [{text: 'پسرانه', value: '1'}, {text: 'دخترانه', value: '2'}]}
  ]},
  {text: 'موسیقی', value: '5', categories: []}
];

class AddProduct extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {categories1: categories, categories2: [], categories3: []}
  }

  onSubmit = (formValues) => {
    this.props.addProduct(formValues)
  };

  onChangeCategory1 = (event) => {
    let obj = this.state.categories1.find(o => o.value === event.target.value);
    this.setState({categories2: obj.categories, categories3: []})
  }

  onChangeCategory2 = (event) => {
    let obj = this.state.categories2.find(o => o.value === event.target.value);
    this.setState({categories3: obj.categories})
  }

  render() {
    return (
      <FormWrapper>
        <Form
          formValues={FORM_VALUES.form_inputs}
          onSubmit={this.onSubmit}
          submitText={FORM_VALUES.submitText}
          title={FORM_VALUES.title}
          categories1={this.state.categories1}
          categories2={this.state.categories2}
          categories3={this.state.categories3}
          onChangeCategory1={this.onChangeCategory1}
          onChangeCategory2={this.onChangeCategory2}
        ></Form>
      </FormWrapper>
    );
  }
}

export default connect(null, { addProduct })(AddProduct);
