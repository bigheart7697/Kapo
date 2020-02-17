import React from 'react'

import './style.scss'

const PriceCard = (props) => {
    return (
        <div className={props.index===0 ? 'price-card__container price-card__container--header' : 'price-card__container'}>
            <div className={props.index===0 ? 'price-card__section price-card__section--header' : 'price-card__section'}>
                <div className='price-card__section-value'>
                    {props.product ? props.product.name : '-'}
                </div>
            </div>
            <div className={props.index===0 ? 'price-card__section price-card__section--header' : 'price-card__section'}>
                <div className='price-card__section-value'>
                    {props.product ? props.product.price : '-'}
                </div>
            </div>
            <div className={props.index===0 ? 'price-card__section price-card__section--header' : 'price-card__section'}>
                <div className='price-card__section-value'>
                    <img className='price-card__image' src={props.product ? props.product.image : '-'} alt={props.product ? props.product.image : '-'}></img>
                </div>
            </div>
        </div>
    );
}

export default PriceCard;