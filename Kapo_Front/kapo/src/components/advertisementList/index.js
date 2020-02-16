import React from 'react'

import './style.scss'

import AdvertisementDetails from '../basic/advertisementDetails'
import AdvertisementTable from '../basic/advertisementTable'

class AdvertisementList extends React.Component {
    state = {advertisement: {}}

    componentDidMount() {
        this.setState({advertisement: this.props.advertisements ? this.props.advertisements[0] : {}})
    }

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

    set_advertisement = (advertisement, index) => {
        this.setState({advertisement})
        this.change_active(index)
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
                    <AdvertisementTable header={this.get_header()} advertisements={this.props.advertisementList? this.props.advertisementList : []} type={this.props.type} setMethod={click => this.change_active = click} callMethod={this.set_advertisement}/>
                </div>
                <div className='advertisement-list__section'>
                    <AdvertisementDetails advertisement={this.state.advertisement} type={this.props.type}/>
                </div>
            </div>
        );
    }
}

export default AdvertisementList;