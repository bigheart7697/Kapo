import React from 'react'

import './style.scss'

import DogAnimation from '../basic/dogAnimation'
import Slider from '../basic/slider'
import Modal from '../Modal'
import ProductCard from '../basic/productCard'

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

const mainpage = () => {
    return(
        <div className="mainpage__container">
            <div className="main-page__slider">
                <Modal onSubmit={() => {console.log('yo')}}></Modal>
                <Slider heading="Example Slider" slides={slideData} /> 
            </div>
            <DogAnimation/>
		</div>
    )
}

export default mainpage