import React from "react";
import { connect } from 'react-redux'
import { addProduct, fetchCategoryHierarchy } from '../../actions'

import "./style.scss";

import Form from '../form'
import FormWrapper from '../formWrapper'
import SetPrice from '../setPrice'

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
    },
    {
      title: "price",
      label: "قیمت",
      inputType: "number",
      error: "لطفا قیمت کالای موجود را وارد کنید"
    }
  ]
};

class AddProduct extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {categories1: [], categories2: [], categories3: []}
  }

  componentDidMount() {
    this.props.fetchCategoryHierarchy();
  }

  onSubmit = (formValues) => {
    this.props.addProduct(formValues)
  };

  onChangeCategory1 = (event) => {
    this.setState({categories1: this.props.category_hierarchy.categories})
    let obj = this.props.category_hierarchy.categories.find(o => o.value === event.target.value);
    this.setState({categories2: obj.categories, categories3: []})
  }

  onChangeCategory2 = (event) => {
    let obj = this.state.categories2.find(o => o.value === event.target.value);
    this.setState({categories3: obj.categories})
  }

  render() {
    return (
      <>
        <FormWrapper>
          <Form
            formValues={FORM_VALUES.form_inputs}
            onSubmit={this.onSubmit}
            submitText={FORM_VALUES.submitText}
            title={FORM_VALUES.title}
            categories1={this.props.category_hierarchy? this.props.category_hierarchy.categories : this.state.categories1}
            categories2={this.state.categories2}
            categories3={this.state.categories3}
            onChangeCategory1={this.onChangeCategory1}
            onChangeCategory2={this.onChangeCategory2}
          ></Form>
        </FormWrapper>
        <SetPrice />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {category_hierarchy: state.products.category_hierarchy }
}

export default connect(mapStateToProps, {fetchCategoryHierarchy, addProduct })(AddProduct);
