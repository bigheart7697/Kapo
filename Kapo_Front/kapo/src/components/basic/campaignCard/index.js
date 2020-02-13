import React from 'react';
import Countdown from 'react-countdown-now';

import './style.scss';

import CountDown from '../countDown'

import defaultImg from '../../../assets/default.jpg'

const CampaignCard = (props) => {
    return (
        <a href={`/product/` + (props.campaign ? props.campaign.product ? props.campaign.product.id : 0 : 0)} className='campaign-card__container'>
            <div className='campaign-card__image-container'>
                <img src={props.campaign ? props.campaign.product ? props.campaign.product.image : defaultImg : defaultImg} alt={props.campaign ? props.campaign.product ? props.campaign.product.name : '' : ''} className='campaign-card__image'></img>
            </div>
            <div className='campaign-card__content'>
                <div className='campaign-card__title'>{props.campaign ? props.campaign.product ? props.campaign.product.name : '' : ''}</div>
                <div className='campaign-card__line'>
                    <div className='campaign-card__precentage'>{props.campaign ? props.campaign.percentage : '-'}%</div>
                    <div className='campaign-card__old-price'>{props.campaign ? props.campaign.product ? props.campaign.product.price : '-' : '-'}</div>
                </div>
                <div className='campaign-card__new-price'>{props.campaign ? props.campaign.product ? props.campaign.product.price ? props.campaign.percentage ? props.campaign.product.price * props.campaign.percentage / 100 : '-' : '-' : '-' : '-'} تومان</div>
                <Countdown date={props.campaign ? props.campaign.deadline : Date.now() - 1000} renderer={CountDown}/>
            </div>
        </a>
    );
};

export default CampaignCard;