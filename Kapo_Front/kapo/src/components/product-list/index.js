import React from 'react';
import { connect } from 'react-redux'
import {searchProducts, fetchCategories } from '../../actions'
import history from '../../history'

import _ from "lodash";

import './style.scss'

import ProductCard from '../basic/productCard'

class Productlist extends React.Component {
    products = []
    
    componentDidMount() {
        this.products = this.props.newArray.filter(element => this.props.sponsered_products.find(e => e.id===element.id) ? false : true);
    }

    render() {
        return (<>
            <div className="product-list__container">
                {this.props.sponsered_products ? this.props.sponsered_products.map((element, index) => <ProductCard key={-1 - index} onClick={() => history.push(`/product/${element.id}`)} product={element} is_sponsered={true}></ProductCard>) : null}
                {this.products ? this.products.map((element, index) => <ProductCard key={index} onClick={() => history.push(`/product/${element.id}`)} product={element} is_sponsered={false}></ProductCard>) : null}
            </div>
        </>)
    }
}



const mapStateToProps = (state) => {
    return {categories: state.products.categories }
}

export default connect(mapStateToProps, {searchProducts, fetchCategories })(Productlist)