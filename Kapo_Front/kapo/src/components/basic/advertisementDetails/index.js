import React from 'react'

import './style.scss'

import ProductCard from '../productCard'

class AdvertisementDetails extends React.Component {
    state = {advertisement: {}}

    componentDidMount() {
        this.props.setMethod(this.change_advertisement);
        this.setState({advertisement: this.props.advertisement});
    }

    change_advertisement = (advertisement, index) => {
        this.setState({advertisement})
        this.props.callMethod(index)
    }

    render() {
        return (
            <div className='advertisement-details__container'>
                <ProductCard product={this.props.advertisement ? this.props.advertisement.product : {}}/>
                <div className='advertisement-details__content'>
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
                        <div className='advertisement-details__value'>{this.props.advertisement ? this.props.advertisement.created : '-'}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdvertisementDetails;