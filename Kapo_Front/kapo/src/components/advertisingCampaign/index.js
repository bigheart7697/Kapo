import React from 'react';

import './style.scss';

import CampaignCard from '../basic/campaignCard'

import image from '../../assets/campaign.png'

import image2 from '../../assets/2.png'
import image3 from '../../assets/3.png'

class AdvertisingCampaign extends React.Component {
    render() {  
        return (
            <div className='advertising-campaign__container'>
                <div className='advertising-campaign__right-panel'>
                    <div className='advertising-campaign__title'>
                        کمپین‌های تبلیغاتی
                    </div>
                    <img src={image} alt='محصولات' className='advertising-campaign__image'></img>
                </div>
                <div className='advertising-campaign__left-panel'>
                    {this.props.campaigns ? this.props.campaigns.map((element, index) => 
                        <CampaignCard campaign={element} key={index}/>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default AdvertisingCampaign;