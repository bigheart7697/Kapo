import React from 'react'

import './style.scss'

import DogAnimation from '../basic/dogAnimation'
import Slider from '../basic/slider'
import AdvertisingCampaign from '../advertisingCampaign'
import AdvertisingBanner from '../advertisingBanner'
import ProductCard from '../basic/productCard'
import { Link } from 'react-router-dom'

const slideData = [
    {
        index: 0,
        headline: 'لباس جدید خودت رو انتخاب کن',
        button: 'همین الآن بخر',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg'
    },
    {
        index: 1,
        headline: 'در دل طبیعت',
        button: 'کتاب خوانی در میان طبیعت',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/forest.jpg'
    },
    {
        index: 2,
        headline: 'حس چه کاریو داری؟',
        button: 'به آهنگ‌ها گوش کن',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/guitar.jpg'
    },
    {
        index: 3,
        headline: 'بر روی نوشتن تمرکز کن',
        button: 'اینجا رو ببین',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg'
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