import React from 'react';
import { connect } from 'react-redux'
import { fetchMyProducts } from '../../actions'

import _ from "lodash";

import './style.scss'

import ProductCard from '../basic/productCard'


class MyProductList extends React.Component{
    componentDidMount(){
        this.props.fetchMyProducts()
    }
    render(){
        const newArray = _.map(this.props.products, (item, key) => {
            return item
          })
        console.log(this.props.products)
        return(<div className="product-list__container">
            {newArray.map((element) => <ProductCard product={element}></ProductCard>)}
        </div>)
    }
    
}



const mapStateToProps = (state) => {
    return {products: state.products.products}
}

export default connect(mapStateToProps, { fetchMyProducts })(MyProductList)