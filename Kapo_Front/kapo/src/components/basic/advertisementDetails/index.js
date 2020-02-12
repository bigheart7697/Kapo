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
            </div>
        )
    }
}

export default AdvertisementDetails;