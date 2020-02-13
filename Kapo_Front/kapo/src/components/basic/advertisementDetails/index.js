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
                <ProductCard product={this.state.advertisement ? this.state.advertisement.product : {}}/>
                <div className='advertisement-list__content'>
                    <div className='advertisement-list__line'>
                        <div className='advertisement-list__key'>{(this.props.type === 'banner' || this.props.type === 'campaign') ? 'مکان قرارگیری' : 'لغات مورد نظر'}</div>
                        <div className='advertisement-list__value'>{this.state.advertisement ? (this.props.type === 'banner' || this.props.type === 'campaign') ? this.state.advertisement.place : this.state.advertisement.search_phrases : '-'}</div>
                    </div>
                    <div className='advertisement-list__line'>
                        <div className='advertisement-list__key'>{(this.props.type === 'banner' || this.props.type === 'campaign') ? 'تعداد روز کل' : 'تعداد مشاهده کل'}</div>
                        <div className='advertisement-list__value'>{this.state.advertisement ? this.state.advertisement.count : '-'}</div>
                    </div>
                    <div className='advertisement-list__line'>
                        <div className='advertisement-list__key'>{(this.props.type === 'banner' || this.props.type === 'campaign') ? 'تعداد روز باقیمانده' : 'تعداد مشاهده باقیمانده'}</div>
                        <div className='advertisement-list__value'>{this.state.advertisement ? this.state.advertisement.remaining_count : '-'}</div>
                    </div>
                    <div className='advertisement-list__line'>
                        <div className='advertisement-list__key'>تاریخ شروع</div>
                        <div className='advertisement-list__value'>{this.state.advertisement ? this.state.advertisement.created : '-'}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdvertisementDetails;