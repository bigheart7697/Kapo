import React from 'react'

import './style.scss'
import { setPrice } from '../../actions'
import Product from '../product'
import { connect } from 'react-redux'
import image1 from '../../assets/1.png'
import image2 from '../../assets/2.png'
import image3 from '../../assets/3.png'
import image4 from '../../assets/4.png'
import image5 from '../../assets/5.png'
import image6 from '../../assets/6.png'

class SetPrice extends React.Component {
    state = {products: []}

    componentDidMount() {
        this.setState({products: [
            {'name': 'تست', 'price': 120000, 'image': image1, 'description': 'بهترین کالا', 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}},
            {'name': 'تست', 'price': 120000, 'image': image2, 'description': 'بهترین کالا', 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}},
            {'name': 'تست', 'price': 120000, 'image': image3, 'description': 'بهترین کالا', 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}},
            {'name': 'تست', 'price': 120000, 'image': image4, 'description': 'بهترین کالا', 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}},
            {'name': 'تست', 'price': 120000, 'image': image5, 'description': 'بهترین کالا', 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}},
            {'name': 'تست', 'price': 120000, 'image': image6, 'description': 'بهترین کالا', 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}},
            {'name': 'تست', 'price': 120000, 'image': image1, 'description': 'بهترین کالا', 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}}
        ]})
    }

    componentDidUpdate() {
        if(Array.isArray(this.props.products)) {
            if(this.state.products !== this.props.products) {
            this.setState({products: this.props.products ? this.props.products : []})
            }
        }
      }

    render() {
        return (
            <div className='set-price__container'>
                <div className='set-price__section set-price__section--products'>
                    <div className='set-price__title'>لیست کالاهای مشابه</div>
                    <div className='set-price__product-list-container'>
                        <div className='set-price__product-list'>
                            {this.props.products ? this.props.products.map((element, index) => {
                                return <Product product={element} key={-2-index}></Product>
                            }) : <div></div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, { setPrice })(SetPrice)