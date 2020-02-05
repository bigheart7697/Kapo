import React from 'react';
import { connect } from 'react-redux'
import { fetchMyProducts } from '../../actions'
import Productlist from "../product-list"

import _ from "lodash";

import './style.scss'


class MyProductList extends React.Component{
    componentDidMount() {
        this.props.fetchMyProducts()
    }
    render() {
        const newArray = _.map(this.props.products, (item, key) => {
            return item
        })
        return (<>
            <Productlist newArray={newArray}></Productlist>
        </>)
    }
    
}



const mapStateToProps = (state) => {
    return {products: state.products.products}
}

export default connect(mapStateToProps, { fetchMyProducts })(MyProductList)