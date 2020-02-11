import React from 'react';
import { connect } from 'react-redux'
import { fetchProducts } from '../../actions'
import _ from "lodash";

import './style.scss'

import Productlist from "../product-list"
import AdvancedFilter from '../basic/advancedFilter'

class AllProducts extends React.Component {
    componentDidMount() {
        this.props.fetchProducts()
    }
    render() {
        
        const newArray = _.map(this.props.products, (item, key) => {
            return item
        })
        console.log(newArray);
        return (<div className="all-products__container">
            <Productlist newArray={newArray}></Productlist>
            <AdvancedFilter></AdvancedFilter>
        </div>)
    }
}



const mapStateToProps = (state) => {
    return { products: state.products.products}
}

export default connect(mapStateToProps, { fetchProducts })(AllProducts)