import React from 'react';
import { connect } from 'react-redux'
import {searchProducts, fetchCategories } from '../../actions'
import history from '../../history'

import _ from "lodash";

import './style.scss'

import ProductCard from '../basic/productCard'
import CustomSelect from '../basic/customSelect'

import image1 from '../../assets/1.png'
import image2 from '../../assets/2.png'
import image3 from '../../assets/3.png'
import image4 from '../../assets/4.png'
import image5 from '../../assets/5.png'
import image6 from '../../assets/6.png'

const PRODUCT_LIST = [
    {
        image: image6,
        is_sponsered: true,
        name: 'تست',
        description: 'خیلی خوبه',
        price: '12000',
        owner: {'corporate_name': 'شرکت علی بابا', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران', 'corporate_number': '123456789101', 'corporate_economic_number': '432198765', 'phone_number': '02122222222'}
    }, {
        image: image5,
        is_sponsered: true,
        name: 'تست',
        description: 'خیلی خوبه',
        price: '12000',
        owner: {'corporate_name': 'شرکت علی بابا', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران', 'corporate_number': '123456789101', 'corporate_economic_number': '432198765', 'phone_number': '02122222222'}
    }, {
        image: image4,
        is_sponsered: false,
        name: 'تست',
        description: 'خیلی خوبه',
        price: '12000',
        owner: {'corporate_name': 'شرکت علی بابا', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران', 'corporate_number': '123456789101', 'corporate_economic_number': '432198765', 'phone_number': '02122222222'}
    }, {
        image: image3,
        is_sponsered: false,
        name: 'تست',
        description: 'خیلی خوبه',
        price: '12000',
        owner: {'corporate_name': 'شرکت علی بابا', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران', 'corporate_number': '123456789101', 'corporate_economic_number': '432198765', 'phone_number': '02122222222'}
    }, {
        image: image2,
        is_sponsered: false,
        name: 'تست',
        description: 'خیلی خوبه',
        price: '12000',
        owner: {'corporate_name': 'شرکت علی بابا', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران', 'corporate_number': '123456789101', 'corporate_economic_number': '432198765', 'phone_number': '02122222222'}
    }, {
        image: image1,
        is_sponsered: false,
        name: 'تست',
        description: 'خیلی خوبه',
        price: '12000',
        owner: {'corporate_name': 'شرکت علی بابا', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران', 'corporate_number': '123456789101', 'corporate_economic_number': '432198765', 'phone_number': '02122222222'}
    }
]

class Productlist extends React.Component {
    render() {
        return (<>
            <div className="product-list__container">
                {this.props.newArray.map((element, index) => <ProductCard key={index} onClick={() => history.push(`/product/${element.id}`)} product={element} is_sponsered={element.is_sponsered}></ProductCard>)}
            </div>
        </>)
    }
}



const mapStateToProps = (state) => {
    return {categories: state.products.categories }
}

export default connect(mapStateToProps, {searchProducts, fetchCategories })(Productlist)