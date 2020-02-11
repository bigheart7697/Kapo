import React from 'react';
import { connect } from 'react-redux'
import { fetchProducts } from '../../actions'
import Productlist from "../product-list"
import _ from "lodash";
import './style.scss'


class AllProducts extends React.Component {
    componentDidMount() {
        this.props.fetchProducts()
    }
    render() {
        
        const newArray = _.map(this.props.products, (item, key) => {
            return item
        })
        console.log(newArray);
        return (<>
            <Productlist newArray={newArray}></Productlist>
        </>)
    }
}



const mapStateToProps = (state) => {
    return { products: state.products.products}
}

export default connect(mapStateToProps, { fetchProducts })(AllProducts)