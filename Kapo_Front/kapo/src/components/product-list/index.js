import React from 'react';
import { connect } from 'react-redux'
import {searchProducts, fetchCategories } from '../../actions'
import history from '../../history'

import _ from "lodash";

import './style.scss'

import ProductCard from '../basic/productCard'

class Productlist extends React.Component {
    render() {
        return (<>
            <div className="product-list__container">
                {this.props.newArray.map((element, index) => <ProductCard key={index} onClick={() => history.push(`/product/${element.id}`)} product={element} is_sponsered={element.is_sponsered}></ProductCard>)}
            </div>
        </>)
    }
}



const mapStateToProps = (state) => {
    return {categories: state.products.categories }
}

export default connect(mapStateToProps, {searchProducts, fetchCategories })(Productlist)