import React from 'react';

import './style.scss';

import CampaignCard from '../basic/campaignCard'

import image from '../../assets/campaign.png'

import image2 from '../../assets/2.png'
import image3 from '../../assets/3.png'

class AdvertisingCampaign extends React.Component {
    state = {campaigns: 
        [{id: 1, discount: 73, created: "2020-02-15 18:52", days: 6,
            product: {id: 35, name: 'تست', price: 120000, image: image2, description: 'بهترین کالا', 
                        owner: {name: 'علی', address: 'نیاوران', country: 'ایران', city: 'تهران'}}},
        {id: 1, discount: 50, created: "2020-02-15 18:52", days: 4,
            product: {id: 35, name: 'تست', price: 120000, image: image3, description: 'بهترین کالا', 
                        owner: {name: 'علی', address: 'نیاوران', country: 'ایران', city: 'تهران'}}}]
    }
    
    render() {
        console.log(this.props.campaigns);
        
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