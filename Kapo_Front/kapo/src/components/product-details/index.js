import React from "react";
import { connect } from "react-redux";
import { addToCart, fetchProduct, fetchFirstBanners, fetchSecondBanners, fetchThirdBanners } from '../../actions';
import faker from 'faker';

import "./style.scss";

import Input from '../basic/customInput'
import Button from "../basic/customButton";
import Whitespace from '../basic/whitespace';
import SubmitAdvertisements from '../submitAdvertisements';
import CustomChoices from '../basic/customChoices';
import AdvertisingBanner from '../advertisingBanner';

import defaultImg from '../../assets/default.jpg'

import image from '../../assets/category4.png'

class ProductDetails extends React.Component {

  state = {
    count: 0,
    image: "",
    owns: false
  }

  constructor(props) {
    super(props);
    this.childRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ image: faker.image.image() })
    this.props.fetchProduct(this.props.match.params.id);
    this.props.fetchFirstBanners();
    this.props.fetchSecondBanners();
    this.props.fetchThirdBanners();
  }

  change_active_state = (active) => {
    this.childRef.current.change_active_state(active);
  }

  render() {
    return (
      <>
        {this.props.second_banners? <AdvertisingBanner product={{link: `https://kapokala.herokuapp.com/product/${this.props.second_banners[1].product.id}` ,image: this.props.second_banners[1].product.image, name: this.props.second_banners[1].product.name, moto: this.props.second_banners[1].slogan, price: this.props.second_banners[1].product.price}}/> : 
        null}
        <div className="product-details__container">
          <div className="product-details__leftPanel">

            <h1>{this.props.product ? this.props.product.name : '-'}</h1>

            <div className="ui horizontal divider header">
              <i className="tags icon"></i>
              <h4 className="product-details__h1--no-margin">توضیحات کالا</h4>
            </div>
            <p>{this.props.product ? this.props.product.description : '-'}</p>

            <div className="ui horizontal divider header">
              <i className="bar chart icon"></i>
              <h4 className="product-details__h1--no-margin"> مشخصات کالا</h4>
            </div>
            <table className="ui definition table product-details__table">
              <tbody>
                <tr>
                  <td className="product-details__column">
                    {this.props.product ? this.props.product.second_hand ? 'دست دوم' : 'نو' : '-'}
                  </td>
                  <td className="product-details__column">نوع کالا</td>
                </tr>
                <tr>
                  <td>{this.props.product ? this.props.product.first_category + '>' + this.props.product.second_category + '>' + this.props.product.third_category : '-'}</td>
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
              <h4 className="product-details__h1--no-margin">
                مشخصات تماس فروشنده
              </h4>
            </div>
            <table className="ui definition table product-details__table">
              <tbody>
                <tr>
                  <td className="productDetails__column">
                    {this.props.product? this.props.product.owner ? this.props.product.owner.is_corporate ? this.props.product.owner.corporate_name? this.props.product.owner.corporate_name : '-' : this.props.product.owner.first_name + " " + this.props.product.owner.last_name  : '-' : '-'}
                  </td>
                  <td className="product-details__column">نام</td>
                </tr>
                <tr>
                  <td>{this.props.product ?  this.props.product.owner ? this.props.product.owner.address : '-' :'-'}</td>
                  <td>آدرس</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="product-details__rightPanel">
            <div className="product-details__imageContainer">
              <div
                className="product-details__image"
                style={{
                  backgroundImage: this.props? this.props.product ? this.props.product.image? "url(" + this.props.product.image + ")" : `url(${defaultImg})` : `url(${defaultImg})` : `url(${defaultImg})`
                }}
              ></div>
            </div>
          </div>
        </div>
        {localStorage.user_email ? 
        (this.props? this.props.product? this.props.product.owner? this.props.product.owner.email? (localStorage.user_email != this.props.product.owner.email) : false : false : false : false) ? 
          <div className="product-details__button-container">
            <div className="product-details__order-title">ثبت سفارش</div>
            <Input label="تعداد" input={{value: this.state.count, onChange: (e) => this.setState({ count: e.target.value })}}></Input>
            <Whitespace space="1"/>
            <Button text="سفارش" onClick={() => this.props.addToCart(this.props.product.id? this.props.product.id : null, this.state.count)}/>
          </div>
        :
          <div className='product-details__advertisements-container'>
            <div className='product-details__advertisements-title'>ثبت تبلیغات و خدمات</div>
            <CustomChoices callChild={this.change_advertisements} setMethod={click => this.change_choices = click}/>
            <SubmitAdvertisements product={this.props.product} callChild={this.change_choices} setMethod={click => this.change_advertisements = click}/>
          </div>
         : <></>}
        <Whitespace space="10"/>
      </>
    );
  }
}

const mapStatToProps = (state, ownProps) => {
  let productItem = null
  if(ownProps.match)
  {
    productItem = state.products.products[ownProps.match.params.id]
  }else{
    productItem = null
  }
  return { product: productItem, first_banners: state.products.first_banners, 
    second_banners: state.products.second_banners, third_bannesr: state.products.third_banners}
}

export default connect(mapStatToProps, { addToCart, fetchProduct, fetchFirstBanners, 
  fetchSecondBanners, fetchThirdBanners })(ProductDetails);
