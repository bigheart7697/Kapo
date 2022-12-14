import React from 'react';
import { connect } from 'react-redux'
import { searchProducts, fetchCategories } from '../../actions'
import history from '../../history'

import './style.scss'

import ProductCard from '../basic/productCard'

class Productlist extends React.Component {
    render() {
        console.log(this.props.newArray, this.props.sponsered_products)
        return (<>
            {(this.props.newArray && this.props.newArray.length >= 1) || ( this.props.sponsered_products && this.props.sponsered_products.length >= 1) ? 
                <div className="product-list__container">
                    {this.props.newArray ? this.props.newArray.filter(element => this.props.campaigned_products ? this.props.campaigned_products.find(e => e.id===element.id) ? true : false : false).map((element, index) => <ProductCard key={-1 - index} onClick={() => history.push(`/product/${element.id}`)} product={element} is_campaign={true}></ProductCard>) : null}
                    {this.props.sponsered_products ? this.props.sponsered_products.map((element, index) => <ProductCard key={-1 - index} onClick={() => history.push(`/product/${element.id}`)} product={element} is_sponsered={true}></ProductCard>) : null}
                    {this.props.newArray ? this.props.newArray.filter(element => 
                        this.props.sponsered_products ? 
                            this.props.sponsered_products.find(e => e.id===element.id) ? 
                                false : 
                                this.props.campaigned_products ? 
                                    this.props.campaigned_products.find(e => e.id===element.id) ? 
                                        false : 
                                        true :
                                    true :
                            this.props.campaigned_products ? 
                                this.props.campaigned_products.find(e => e.id===element.id) ? 
                                    false : 
                                    true : 
                                true).map((element, index) => <ProductCard key={index} onClick={() => history.push(`/product/${element.id}`)} product={element} is_sponsered={false}></ProductCard>) : null}
            </div>
            : <div className="product-list__container product-list__no-products">???????????? ???????? ??????</div>}
        </>)
    }
}



const mapStateToProps = (state) => {
    return {categories: state.products.categories }
}

export default connect(mapStateToProps, {searchProducts, fetchCategories })(Productlist)