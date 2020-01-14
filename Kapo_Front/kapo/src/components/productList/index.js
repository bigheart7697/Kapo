import React from 'react';
import { connect } from 'react-redux'
import { fetchProducts } from '../../actions'

import _ from "lodash";

import './style.scss'

import ProductCard from '../basic/productCard'

import image1 from '../../assets/1.png'
import image2 from '../../assets/2.png'
import image3 from '../../assets/3.png'
import image4 from '../../assets/4.png'
import image5 from '../../assets/5.png'
import image6 from '../../assets/6.png'

const PRODUCT_LIST = [
    {
        image: image6
    },{
        image: image5
    },{
        image: image4
    },{
        image: image3
    },{
        image: image2
    },{
        image: image1
    }
]

class ProductList extends React.Component{
    componentDidMount(){
        this.props.fetchProducts()
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

export default connect(mapStateToProps, { fetchProducts })(ProductList)