import React from 'react'

import './style.scss'

import DogAnimation from '../basic/dogAnimation'
import Slider from '../basic/slider'

const mainpage = () => {
    return(
        <div className="mainpage__container">
            <Slider/>
            <DogAnimation/>
		</div>
    )
}

export default mainpage