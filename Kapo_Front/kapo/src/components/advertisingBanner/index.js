import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

import defaultImg from '../../assets/default.jpg'

class AdvertisingBanner extends React.Component {
    render() {
        return (
            <div className='advertising-banner__container'>
                <div className='advertising-banner__image' style={{
                    backgroundImage: this.props? this.props.product ? this.props.product.image? "url(" + this.props.product.image + ")" : `url(${defaultImg})` : `url(${defaultImg})` : `url(${defaultImg})`
                }}></div>
                <div className='advertising-banner__content'>
                    <div className='advertising-banner__line'><div className='advertising-banner__price'>قیمت: {this.props.product ? this.props.product.price : '-'} تومان</div></div>
                    <div className='advertising-banner__title'>
                        {this.props.product ? this.props.product.name : '-'}
                    </div>
                    <div className='advertising-banner__line'>
                        <div className='advertising-banner__moto'>{this.props.product ? this.props.product.moto : '-'}</div>
                        <div className='advertising-banner__view'><Link to=''>مشاهده</Link></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdvertisingBanner;