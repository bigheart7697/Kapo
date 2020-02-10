import React from 'react';
import { connect } from 'react-redux'
import { categoryProducts } from '../../actions'
import Productlist from "../product-list"
import _ from "lodash";
import './style.scss'



class CategoryProducts extends React.Component {
    componentDidMount() {
        if (this.props.match.params.cat1) {
            if (this.props.match.params.cat2) {
                if (this.props.match.params.cat3) {
                    this.props.categoryProducts(this.props.match.params.cat1, this.props.match.params.cat2, this.props.match.params.cat3)
                }
                else {
                    this.props.categoryProducts(this.props.match.params.cat1, this.props.match.params.cat2, null)
                }
            }
            else {
                this.props.categoryProducts(this.props.match.params.cat1, null, null)
            }
        }
        else {
            this.props.categoryProducts(null, null, null)
        }
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

export default connect(mapStateToProps, { categoryProducts })(CategoryProducts)