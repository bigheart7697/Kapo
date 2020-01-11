import React from "react";
import { connect } from "react-redux";
import { addToCart, fetchProduct } from '../../actions';
import faker from 'faker';

import "./style.scss";

import Input from '../basic/customInput'
import Button from "../basic/customButton";
import Whitespace from '../basic/whitespace';

class ProductDetails extends React.Component {

  state = {
    count: 0,
    image: ""
  }

  componentDidMount() {
    this.setState({ image: faker.image.image() })
    this.props.fetchProduct(this.props.match.params.id);
  }

  render() {
    console.log(this.state.count)
    let productImage = null
    if(this.props.product){
      productImage = this.props.product.image
    }
    console.log(this.props.product)
    return (
      <>
        <div className="productDetails__container">
          <div className="productDetails__leftPanel">

            <h1>{this.props.product ? this.props.product.name : '-'}</h1>

            <div className="ui horizontal divider header">
              <i className="tags icon"></i>
              <h4 className="productDetails__h1--no-margin">توضیحات کالا</h4>
            </div>
            <p>{this.props.product ? this.props.product.description : '-'}</p>

            <div className="ui horizontal divider header">
              <i className="bar chart icon"></i>
              <h4 className="productDetails__h1--no-margin"> مشخصات کالا</h4>
            </div>
            <table className="ui definition table productDetails__table">
              <tbody>
                <tr>
                  <td className="productDetails__column">
                    {this.props.product ? this.props.product.second_hand ? 'دست دوم' : 'نو' : '-'}
                  </td>
                  <td className="productDetails__column">نوع کالا</td>
                </tr>
                <tr>
                  <td>{this.props.product ? this.props.product.type ? this.props.product.type : '-' : '-'}</td>
                  <td>دسته کالا</td>
                </tr>
                <tr>
                  <td>{this.props.product ? this.props.product.availability ? this.props.product.availability : '-' : '-'}</td>
                  <td>در دسترس بودن</td>
                </tr>
                <tr>
                  <td>{this.props.product ? this.props.product.production_year : '-'}</td>
                  <td>سال ساخت</td>
                </tr>
                <tr>
                  <td>{this.props.product ? this.props.product.user ? (this.props.product.user.type ? this.props.product.user.type : '-') : '-' : '-'}</td>
                  <td>نوع آگهی</td>
                </tr>
                <tr>
                  <td>{this.props.product ? this.props.product.price : '-'}</td>
                  <td>قیمت (تومان)</td>
                </tr>
              </tbody>
            </table>

            <div className="ui horizontal divider header">
              <i className="address card outline icon"></i>
              <h4 className="productDetails__h1--no-margin">
                مشخصات تماس فروشنده
              </h4>
            </div>
            <table className="ui definition table productDetails__table">
              <tbody>
                <tr>
                  <td className="productDetails__column">
                    {this.props.product ?  this.props.product.owner :'-'}
                  </td>
                  <td className="productDetails__column">نام</td>
                </tr>
                <tr>
                  <td>{this.props.product ? this.props.product.user ? this.props.product.user.address ? this.props.product.user.address : '-' : '-' : '-'}</td>
                  <td>آدرس</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="productDetails__rightPanel">
            <div className="productDetails__imageContainer">
              <div
                className="productDetails__image"
                style={{
                  backgroundImage: "url(" + this.state.imag + ")"
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="productDetails__button-container">
          <Input label="تعداد" input={{value: this.state.count, onChange: (e) => this.setState({ count: e.target.value })}}></Input>
          <Whitespace space="1"/>
          <Button text="سفارش" onClick={() => this.props.addToCart(this.props.match.params.id, this.state.count)}/>
          <Whitespace space="1"/>
        </div>
      </>
    );
  }
}

const mapStatToProps = (state, ownProps) => {
  // return { product: state.products.products[ownProps.match.params.id] }
  let productItem = null
  if(ownProps.match)
  {
    productItem = state.products.products[ownProps.match.params.id]
  }else{
    productItem = null
  }
  return { product: productItem}
}

export default connect(mapStatToProps, { addToCart, fetchProduct })(ProductDetails);
