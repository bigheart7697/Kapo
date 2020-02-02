import React from 'react'

import './style.scss'

import Form from '../form'
import PriceCard from '../basic/priceCard'

import image from '../../assets/1.png'

const FORM_VALUES = {
  submitText: "ثبت",
  title: "ثبت قیمت کالا",
  form_inputs: [
    {
      title: "price",
      label: "قیمت",
      inputType: "number",
      error: "لطفا قیمت کالای موجود را وارد کنید"
    }
  ]
};

class SetPrice extends React.Component {
    state = {products: []}

    componentDidMount() {
        this.setState({products: [
            {'name': 'تست', 'price': 120000, 'image': image, 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}},
            {'name': 'تست', 'price': 120000, 'image': image, 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}},
            {'name': 'تست', 'price': 120000, 'image': image, 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}},
            {'name': 'تست', 'price': 120000, 'image': image, 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}},
            {'name': 'تست', 'price': 120000, 'image': image, 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}},
            {'name': 'تست', 'price': 120000, 'image': image, 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}},
            {'name': 'تست', 'price': 120000, 'image': image, 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}}
        ]})
    }

    onSubmit = (formValues) => {
        this.props.addProduct(formValues)
    };

    render() {
        return (
            <div className='set-price__container'>
                <div className='set-price__section'>
                    <div className='set-price__form-wrapper'>
                        <Form
                            formValues={FORM_VALUES.form_inputs}
                            onSubmit={this.onSubmit}
                            submitText={FORM_VALUES.submitText}
                            title={FORM_VALUES.title}
                        ></Form>
                    </div>
                </div>
                <div className='set-price__section set-price__section--wide'>
                    <div className='set-price__title'>لیست کالاهای مشابه</div>
                    <PriceCard product={{name: 'نام', image: 'تصویر', price: 'قیمت'}} key={-1} index={0}></PriceCard>
                    {this.state.products ? this.state.products.map((element, index) => {
                        return <PriceCard product={element} key={-2-index} index={index + 1}></PriceCard>
                    }) : <div></div>}
                </div>
            </div>
        );
    }
}

export default SetPrice;