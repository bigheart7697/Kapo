import React from 'react';
import { connect } from 'react-redux'
import { fetchProducts, fetchSecondCampaign, fetchAllCampaigns } from '../../actions'
import _ from "lodash";

import './style.scss'

import Productlist from "../product-list"
import AdvancedFilter from '../basic/advancedFilter'
import AdvertisingCampaign from '../advertisingCampaign'

class AllProducts extends React.Component {
    componentDidMount() {
        this.props.fetchProducts();
        this.props.fetchSecondCampaign();
        this.props.fetchAllCampaigns();
    }
    render() {
        const newArray = _.map(this.props.products, (item, key) => {
            return item
        })
        const newArray2 = _.map(this.props.sponsored_products, (item, key) => {
            return item.product
        })
        return (<>
            {this.props.second_campaigns? <AdvertisingCampaign campaigns={this.props.second_campaigns}/> : 
        null}
            <div className="all-products__container">
                <Productlist newArray={newArray} sponsered_products={newArray2} campaigned_products={this.props.campaigned_products}></Productlist>
                <AdvancedFilter></AdvancedFilter>
            </div>
        </>)
    }
}



const mapStateToProps = (state) => {
    return { products: state.products.products, sponsored_products: state.products.sponsored_products, campaigned_products: _.map(state.advertisements.campaigns, (item, key) => {
        return item.product
    }),  second_campaigns: _.map(state.advertisements.second_campaigns, (item, key) => {
        return item
    }) }
}

export default connect(mapStateToProps, { fetchProducts, fetchSecondCampaign, fetchAllCampaigns })(AllProducts)