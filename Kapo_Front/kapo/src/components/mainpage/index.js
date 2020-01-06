import React from 'react'

import './style.scss'

import DogAnimation from '../basic/dogAnimation'
import Slider from '../basic/slider'
import ProductCard from '../basic/productCard'

const slideData = [
    {
        index: 0,
        headline: 'New Fashion Apparel',
        button: 'Shop now',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg'
    },
    {
        index: 1,
        headline: 'In The Wilderness',
        button: 'Book travel',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/forest.jpg'
    },
    {
        index: 2,
        headline: 'For Your Current Mood',
        button: 'Listen',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/guitar.jpg'
    },
    {
        index: 3,
        headline: 'Focus On The Writing',
        button: 'Get Focused',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg'
    }
]

const mainpage = () => {
    return(
        <div className="mainpage__container">
            <div className="main-page__slider">
                <Slider heading="Example Slider" slides={slideData} /> 
            </div>
            <ProductCard/>
            <DogAnimation/>
		</div>
    )
}

export default mainpage