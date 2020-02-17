import React from 'react'
import { connect } from 'react-redux'

import './style.scss'

import DogAnimation from '../basic/dogAnimation'
import Slider from '../basic/slider'
import AdvertisingCampaign from '../advertisingCampaign'
import ProductCard from '../basic/productCard'
import { Link } from 'react-router-dom'
import {fetchProducts, fetchFirsCampaign} from "../../actions"
import _ from "lodash"

import image1 from '../../assets/category1.jpg'
import image2 from '../../assets/category2.jpg'
import image3 from '../../assets/category3.jpg'

const slideData = [
    {
        index: 0,
        headline: 'لباس جدید خودت رو انتخاب کن',
        button: 'کفش و لباس',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg',
        link: '/ProductList/2/6'
    },
    {
        index: 1,
        headline: 'از ابزارهای الکترونیکی جدید لذت ببر',
        button: 'وسایل الکترونیک',
        src: image1,
        link: '/ProductList/1'
    },
    {
        index: 2,
        headline: 'ابزارآلات خانه خود را همین حالا تهیه کن',
        button: 'ابزارآلات خانه',
        src: image2,
        link: '/ProductList/5'
    },
    {
        index: 3,
        headline: 'اوقات فراغتت رو چجوری می‌خوای بگذرونی',
        button: 'تفریح و سرگرمی',
        src: image3,
        link: '/ProductList/6'
    }
]

class mainpage extends React.Component {
    componentDidMount() {
        this.props.fetchProducts();
        this.props.fetchFirsCampaign();
    }
    render() {
        const newArray = _.map(this.props.products, (item, key) => {
            return item
        })
        return(
            <div className="mainpage__container">
                {this.props.first_campaigns? <AdvertisingCampaign campaigns={this.props.first_campaigns}/> : 
        null}
                <div className="main-page__slider"> 
                    <Slider heading="Example Slider" slides={slideData} /> 
                </div>
                <div className='mainpage__products_container'>
                    <Link to='/ProductList'>لیست محصولات</Link>
                    <div className='mainpage__products-wrapper'>
                        <div className='mainpage__products'>
                            {newArray ? newArray.map((element, index) => 
                                <ProductCard product={element} key={index} />
                            ) : null}
                        </div>
                    </div>
                </div>
                <DogAnimation/>
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return { products: state.products.products, first_campaigns: _.map(state.advertisements.first_campaigns, (item, key) => {
        return item
    }) }
}

export default connect(mapStateToProps, { fetchProducts, fetchFirsCampaign })(mainpage)