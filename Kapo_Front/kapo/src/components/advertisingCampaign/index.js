import React from 'react';

import './style.scss';

import CampaignCard from '../basic/campaignCard'

import image from '../../assets/campaign.png'

import image1 from '../../assets/1.png'
import image2 from '../../assets/2.png'
import image3 from '../../assets/3.png'
import image4 from '../../assets/4.png'

class AdvertisingCampaign extends React.Component {
    state = {products: 
        [{'name': 'تست', 'price': 120000, 'image': image1, 'description': 'بهترین کالا', 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}},
        {'name': 'تست', 'price': 120000, 'image': image4, 'description': 'بهترین کالا', 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}}]
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
                    {this.state.products ? this.state.products.map((element, index) => 
                        <CampaignCard product={element} key={index}/>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default AdvertisingCampaign;