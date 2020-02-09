import React from 'react';
import { connect } from 'react-redux'
import {searchProducts, fetchCategories } from '../../actions'
import history from '../../history'

import _ from "lodash";

import './style.scss'

import SearchBar from '../../components/basic/searchBar'
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
        name: 'تست',
        description: 'خیلی خوبه',
        price: '12000',
        owner: {'corporate_name': 'شرکت علی بابا', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران', 'corporate_number': '123456789101', 'corporate_economic_number': '432198765', 'phone_number': '02122222222'}
    }, {
        image: image5,
        name: 'تست',
        description: 'خیلی خوبه',
        price: '12000',
        owner: {'corporate_name': 'شرکت علی بابا', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران', 'corporate_number': '123456789101', 'corporate_economic_number': '432198765', 'phone_number': '02122222222'}
    }, {
        image: image4,
        name: 'تست',
        description: 'خیلی خوبه',
        price: '12000',
        owner: {'corporate_name': 'شرکت علی بابا', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران', 'corporate_number': '123456789101', 'corporate_economic_number': '432198765', 'phone_number': '02122222222'}
    }, {
        image: image3,
        name: 'تست',
        description: 'خیلی خوبه',
        price: '12000',
        owner: {'corporate_name': 'شرکت علی بابا', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران', 'corporate_number': '123456789101', 'corporate_economic_number': '432198765', 'phone_number': '02122222222'}
    }, {
        image: image2,
        name: 'تست',
        description: 'خیلی خوبه',
        price: '12000',
        owner: {'corporate_name': 'شرکت علی بابا', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران', 'corporate_number': '123456789101', 'corporate_economic_number': '432198765', 'phone_number': '02122222222'}
    }, {
        image: image1,
        name: 'تست',
        description: 'خیلی خوبه',
        price: '12000',
        owner: {'corporate_name': 'شرکت علی بابا', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران', 'corporate_number': '123456789101', 'corporate_economic_number': '432198765', 'phone_number': '02122222222'}
    }
]

class Productlist extends React.Component {
    state = {query: "", category: 0}
    componentDidMount() {
        this.props.fetchCategories()
    }
    onSearch = (query, category=null) => {
        if(query){
            this.setState({query})
        }
        this.props.searchProducts(query, category);
    };
    render() {
        let array = []
        for(let i = 0 ; i < this.props.categories.length ; i++)
        {
            array.push({value: this.props.categories[i][0], text: this.props.categories[i][1]})
        }
        console.log(this.props.newArray);
        
        return (<>
            {/* <SearchBar onSearch={this.onSearch} /> */}
            <div className="product-list__search">
                <CustomSelect content={array} label="دسته‌بندی‌ها" input={{onChange: () => this.setState({category:0})}}/>
            </div>
            <div className="product-list__container">
                {this.props.newArray.map((element, index) => <ProductCard key={index} onClick={() => history.push(`/product/${element.id}`)} product={element}></ProductCard>)}
            </div>
        </>)
    }
}



const mapStateToProps = (state) => {
    return {categories: state.products.categories }
}

export default connect(mapStateToProps, {searchProducts, fetchCategories })(Productlist)