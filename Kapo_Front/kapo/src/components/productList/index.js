import React from 'react';

import './style.scss'

import ProductCard from '../basic/productCard'

class ProductList extends React.Component{
    render(){
        return(<div className="product-list__container">
            <ProductCard></ProductCard>
        </div>)
    }
}

export default ProductList