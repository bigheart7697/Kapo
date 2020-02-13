import React from 'react';
import { connect } from 'react-redux'
import { fetchProducts } from '../../actions'
import _ from "lodash";

import './style.scss'

import Productlist from "../product-list"
import AdvancedFilter from '../basic/advancedFilter'
import AdvertisingCampaign from '../advertisingCampaign'

class AllProducts extends React.Component {
    componentDidMount() {
        this.props.fetchProducts()
    }
    render() {
        
        const newArray = _.map(this.props.products, (item, key) => {
            return item
        })
        const newArray2 = _.map(this.props.sponsored_products, (item, key) => {
            return item.product
        })
        console.log(newArray);
        return (<>
            <AdvertisingCampaign />
            <div className="all-products__container">
                <Productlist newArray={newArray} sponsered_products={newArray2}></Productlist>
                <AdvancedFilter></AdvancedFilter>
            </div>
        </>)
    }
}



const mapStateToProps = (state) => {
    return { products: state.products.products, sponsored_products: state.products.sponsored_products }
}

export default connect(mapStateToProps, { fetchProducts })(AllProducts)