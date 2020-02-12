import React from 'react';

import './style.scss';

import CampaignCard from '../basic/campaignCard'

import image from '../../assets/campaign.png'

import image1 from '../../assets/1.png'
import image2 from '../../assets/2.png'
import image3 from '../../assets/3.png'
import image5 from '../../assets/6.png'

class AdvertisingCampaign extends React.Component {
    state = {campaigns: 
        [{id: 1, percentage: 50, 
            product: {id: 35, name: 'تست', price: 120000, image: image2, description: 'بهترین کالا', 
                        owner: {name: 'علی', address: 'نیاوران', country: 'ایران', city: 'تهران'}}},
                        {id: 1, percentage: 50, 
                            product: {id: 35, name: 'تست', price: 120000, image: image3, description: 'بهترین کالا', 
                                        owner: {name: 'علی', address: 'نیاوران', country: 'ایران', city: 'تهران'}}}]
    }
    
    render() {
        return (
            <div className='advertising-campaign__container'>
                <div className='advertising-campaign__right-panel'>
                    <div className='advertising-campaign__title'>
                        کمپین‌های تبلیغاتی
                    </div>
                    <img src={image} className='advertising-campaign__image'></img>
                </div>
                <div className='advertising-campaign__left-panel'>
                    {this.state.campaigns ? this.state.campaigns.map((element, index) => 
                        <CampaignCard campaign={element} key={index}/>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default AdvertisingCampaign;