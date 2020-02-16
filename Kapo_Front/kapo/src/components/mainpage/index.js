import React from 'react'

import './style.scss'

import DogAnimation from '../basic/dogAnimation'
import Slider from '../basic/slider'
import AdvertisingCampaign from '../advertisingCampaign'
import ProductCard from '../basic/productCard'
import { Link } from 'react-router-dom'

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

const PRODUCTS = [
    {id: 1, name: 'کالا'},
    {id: 1, name: 'کالا'},
    {id: 1, name: 'کالا'},
    {id: 1, name: 'کالا'}
]

const mainpage = () => {
    return(
        <div className="mainpage__container">
            <AdvertisingCampaign />
            <div className="main-page__slider"> 
                <Slider heading="Example Slider" slides={slideData} /> 
            </div>
            <div className='mainpage__products_container'>
                <Link to='/ProductList'>لیست محصولات</Link>
                <div className='mainpage__products-wrapper'>
                    <div className='mainpage__products'>
                        {PRODUCTS ? PRODUCTS.map((element, index) => 
                            <ProductCard product={element} key={index} />
                        ) : null}
                    </div>
                </div>
            </div>
            <DogAnimation/>
		</div>
    )
}

export default mainpage