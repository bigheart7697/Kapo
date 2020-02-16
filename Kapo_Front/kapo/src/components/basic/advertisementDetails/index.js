import React from 'react'

import './style.scss'

import ProductCard from '../productCard'

const JDate = require('jalali-date');

class AdvertisementDetails extends React.Component {
    get_date = () => {
        let date = new JDate(new Date(this.props.advertisement ? this.props.advertisement.created ? this.props.advertisement.created : Date.now() : Date.now()))
        return date.format('dddd DD MMMM YYYY')
    }

    render() {
        return (
            <div className='advertisement-details__container'>
                <ProductCard product={this.props.advertisement ? this.props.advertisement.product : {}}/>
                <div className='advertisement-details__content'>
                    {this.props.type === 'banner' ? 
                        <div className='advertisement-details__line'>
                            <div className='advertisement-details__key'>شعار</div>
                            <div className='advertisement-details__value'>{this.props.advertisement ? this.props.advertisement.slogan : '-'}</div>
                        </div>
                    : this.props.type === 'campaign' ? 
                        <div className='advertisement-details__line'>
                            <div className='advertisement-details__key'>درصد تخفیف</div>
                            <div className='advertisement-details__value'>{this.props.advertisement ? this.props.advertisement.discount : '-'}</div>
                        </div>
                    : null}
                    <div className='advertisement-details__line'>
                        <div className='advertisement-details__key'>{(this.props.type === 'banner' || this.props.type === 'campaign') ? 'مکان قرارگیری' : 'لغات مورد نظر'}</div>
                        <div className='advertisement-details__value'>{this.props.advertisement ? (this.props.type === 'banner' || this.props.type === 'campaign') ? this.props.advertisement.place : this.props.advertisement.search_phrases : '-'}</div>
                    </div>
                    <div className='advertisement-details__line'>
                        <div className='advertisement-details__key'>{(this.props.type === 'banner' || this.props.type === 'campaign') ? 'تعداد روز کل' : 'تعداد مشاهده کل'}</div>
                        <div className='advertisement-details__value'>{this.props.advertisement ? this.props.advertisement.count? this.props.advertisement.count : this.props.advertisement.days : '-'}</div>
                    </div>
                    <div className='advertisement-details__line'>
                        <div className='advertisement-details__key'>{(this.props.type === 'banner' || this.props.type === 'campaign') ? 'تعداد روز باقیمانده' : 'تعداد مشاهده باقیمانده'}</div>
                        <div className='advertisement-details__value'>{this.props.advertisement ? this.props.advertisement.remaining_count? this.props.advertisement.remaining_count : this.props.advertisement.remaining_days : '-'}</div>
                    </div>
                    <div className='advertisement-details__line'>
                        <div className='advertisement-details__key'>تاریخ شروع</div>
                        <div className='advertisement-details__value'>{this.get_date()}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdvertisementDetails;