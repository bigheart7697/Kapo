import React from "react";
import { connect } from "react-redux";
import { addToCart } from '../../actions'

import "./style.scss";

import Button from "../basic/customButton";

class ProductDetails extends React.Component {
  render() {
    return (
      <>
        <div className="productDetails__container">
          <div className="productDetails__leftPanel">
            <h1>{this.props.product.name ? this.props.product.name : '-'}</h1>

            <div className="ui horizontal divider header">
              <i className="tags icon"></i>
              <h4 className="productDetails__h1--no-margin">توضیحات کالا</h4>
            </div>
            <p>{this.props.product.description ? this.props.product.description : '-'}</p>

            <div className="ui horizontal divider header">
              <i className="bar chart icon"></i>
              <h4 className="productDetails__h1--no-margin"> مشخصات کالا</h4>
            </div>
            <table className="ui definition table productDetails__table">
              <tbody>
                <tr>
                  <td className="productDetails__column">
                    {this.props.product.second_hand ? 'دست دوم' : 'نو'}
                  </td>
                  <td className="productDetails__column">نوع کالا</td>
                </tr>
                <tr>
                  <td>{this.props.product.type ? this.props.product.type : '-'}</td>
                  <td>دسته کالا</td>
                </tr>
                <tr>
                  <td>{this.props.product.availability ? this.props.product.availability : '-'}</td>
                  <td>در دسترس بودن</td>
                </tr>
                <tr>
                  <td>{this.props.product.production_year ? this.props.product.production_year : '-'}</td>
                  <td>سال ساخت</td>
                </tr>
                <tr>
                  <td>{this.props.product.user ? (this.props.product.user.type ? this.props.product.user.type : '-') : '-'}</td>
                  <td>نوع آگهی</td>
                </tr>
                <tr>
                  <td>{this.props.product.price ? this.props.product.price : '-'}</td>
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
                    {this.props.user ? this.props.product.user.name ? this.props.product.user.name : '-' : '-'}
                  </td>
                  <td className="productDetails__column">نام</td>
                </tr>
                <tr>
                  <td>{this.props.user ? this.props.product.user.address ? this.props.product.user.address : '-' : '-'}</td>
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
                  backgroundImage: "url(" + this.props.product.image + ")"
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="productDetails__button-container">
          <Button text="سفارش" onClick={() => this.props.addToCart(this.props.product.name)}/>
        </div>
      </>
    );
  }
}

export default connect(null, { addToCart })(ProductDetails);
