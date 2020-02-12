import React from 'react'

import './style.scss'

import AdvertisementDetails from '../basic/advertisementDetails'
import AdvertisementTable from '../basic/advertisementTable'

const ADVERTISEMENT_LIST = [
    {id: 1, product: {name: 'پالتو گرم', price: 120000, owner: {corporate_name: 'مبنا', address: 'نیاوران', country: 'ایران', city: 'تهران', is_corporate: true}},
        count: 10, remaining_count: 3, search_phrases: 'مشکی لباس زمستانی پالتو', created: '2020-02-05 18:52'},
    {id: 2, product: {name: 'پالتو گرم', price: 120000, owner: {corporate_name: 'مبنا', address: 'نیاوران', country: 'ایران', city: 'تهران', is_corporate: true}},
        count: 12, remaining_count: 5, search_phrases: 'لباس زمستانی پالتو', created: '2020-02-05 18:52'},
    {id: 3, product: {name: 'پالتو گرم', price: 120000, owner: {corporate_name: 'مبنا', address: 'نیاوران', country: 'ایران', city: 'تهران', is_corporate: true}},
        count: 11, remaining_count: 2, search_phrases: 'مشکی لباس پالتو', created: '2020-02-05 18:52'},
    {id: 4, product: {name: 'پالتو گرم', price: 120000, owner: {corporate_name: 'مبنا', address: 'نیاوران', country: 'ایران', city: 'تهران', is_corporate: true}},
        count: 5, remaining_count: 1, search_phrases: 'مشکی لباس زمستانی پالتو', created: '2020-02-05 18:52'},
    {id: 5, product: {name: 'پالتو گرم', price: 120000, owner: {corporate_name: 'مبنا', address: 'نیاوران', country: 'ایران', city: 'تهران', is_corporate: true}},
        count: 8, remaining_count: 4, search_phrases: 'مشکی پالتو', created: '2020-02-05 18:52'},
    {id: 6, product: {name: 'پالتو گرم', price: 120000, owner: {corporate_name: 'مبنا', address: 'نیاوران', country: 'ایران', city: 'تهران', is_corporate: true}},
        count: 10, remaining_count: 8, search_phrases: ' زمستانی پالتو', created: '2020-02-05 18:52'}
]

class AdvertisementList extends React.Component {
    get_title = () => {
        switch(this.props.type) {
            case 'banner':
                return 'بنرهای تبلیغاتی'
            case 'campaign':
                return 'کمپین‌های تبلیغاتی'
            case 'sponsered':
                return 'کالاهای اسپانسر شده'
            default:
                return 'کالاهای اسپانسر شده'
        }
    }

    get_header = () => {
        switch(this.props.type) {
            case 'banner':
                return ['ردیف', 'نام کالا', 'مکان', 'تعداد روز باقیمانده']
            case 'campaign':
                return ['ردیف', 'نام کالا', 'مکان', 'تعداد روز باقیمانده']
            case 'sponsered':
                return ['ردیف', 'نام کالا', 'لغات', 'تعداد نمایش باقیمانده']
            default:
                return ['ردیف', 'نام کالا', 'لغات', 'تعداد نمایش باقیمانده']
        }
    }

    render() {
        return (
            <div className='advertisement-list__container'>
                <div className='advertisement-list__section'>
                    <div className='advertisement-list__title'>لیست {this.get_title()}</div>
                    <AdvertisementTable header={this.get_header()} advertisements={ADVERTISEMENT_LIST} type={this.props.type} setMethod={click => this.change_active = click} callMethod={this.change_advertisements}/>
                </div>
                <div className='advertisement-list__section'>
                    <AdvertisementDetails advertisement={ADVERTISEMENT_LIST[0]} type={this.props.type} setMethod={click => this.change_advertisements = click} callMethod={this.change_active}/>
                </div>
            </div>
        );
    }
}

export default AdvertisementList;