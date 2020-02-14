import React from "react";
import { connect } from "react-redux";
import { deleteProduct, addToCart, fetchProduct, fetchFirstBanners, fetchSecondBanners, fetchThirdBanners } from '../../actions';
import faker from 'faker';

import "./style.scss";

import {translate} from '../basic/categoryDict';
import Input from '../basic/customInput';
import Button from "../basic/customButton";
import Select from '../basic/customSelect';
import Whitespace from '../basic/whitespace';
import SubmitAdvertisements from '../submitAdvertisements';
import CustomChoices from '../basic/customChoices';
import AdvertisingBanner from '../advertisingBanner';
import ProductScoreSubmit from '../basic/productScoreSubmit'

import defaultImg from '../../assets/default.jpg'

import { Link } from "react-router-dom";

class ProductDetails extends React.Component {

  state = {
    delivery_weekday: 1,
    delivery_hours:1,
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

  get_starting_day = () => {
    let d = new Date(Date.now());
    let start_date = d.getDay() + 1;
    return start_date;
  }

  get_day = (day) => {
    switch(day) {
      case '1': 
        return [
          {text: 'دوشنبه', value: '3'},
          {text: 'سه‌شنبه', value: '4'},
          {text: 'چهارشنبه', value: '5'},
          {text: 'پنجشنبه', value: '6'},
          {text: 'جمعه', value: '7'},
          {text: 'شنبه', value: '1'},
          {text: 'یکشنبه', value: '2'}
              ];
      case '2': 
        return [
          {text: 'سه‌شنبه', value: '4'},
          {text: 'چهارشنبه', value: '5'},
          {text: 'پنجشنبه', value: '6'},
          {text: 'جمعه', value: '7'},
          {text: 'شنبه', value: '1'},
          {text: 'یکشنبه', value: '2'},
          {text: 'دوشنبه', value: '3'}
        ];
      case '3': 
        return [
          {text: 'چهارشنبه', value: '5'},
          {text: 'پنجشنبه', value: '6'},
          {text: 'جمعه', value: '7'},
          {text: 'شنبه', value: '1'},
          {text: 'یکشنبه', value: '2'},
          {text: 'دوشنبه', value: '3'},
          {text: 'سه‌شنبه', value: '4'}
        ];
      case '4': 
        return [
          {text: 'پنجشنبه', value: '6'},
          {text: 'جمعه', value: '7'},
          {text: 'شنبه', value: '1'},
          {text: 'یکشنبه', value: '2'},
          {text: 'دوشنبه', value: '3'},
          {text: 'سه‌شنبه', value: '4'},
          {text: 'چهارشنبه', value: '5'}
        ];
      case '5': 
        return [
          {text: 'جمعه', value: '7'},
          {text: 'شنبه', value: '1'},
          {text: 'یکشنبه', value: '2'},
          {text: 'دوشنبه', value: '3'},
          {text: 'سه‌شنبه', value: '4'},
          {text: 'چهارشنبه', value: '5'},
          {text: 'پنجشنبه', value: '6'}
        ];
      case '6': 
        return [
          {text: 'شنبه', value: '1'},
          {text: 'یکشنبه', value: '2'},
          {text: 'دوشنبه', value: '3'},
          {text: 'سه‌شنبه', value: '4'},
          {text: 'چهارشنبه', value: '5'},
          {text: 'پنجشنبه', value: '6'},
          {text: 'جمعه', value: '7'}
        ];
      case '7': 
        return [
          {text: 'یکشنبه', value: '2'},
          {text: 'دوشنبه', value: '3'},
          {text: 'سه‌شنبه', value: '4'},
          {text: 'چهارشنبه', value: '5'},
          {text: 'پنجشنبه', value: '6'},
          {text: 'جمعه', value: '7'},
          {text: 'شنبه', value: '1'}
        ];
      default: 
        return [
          {text: 'شنبه', value: '1'},
          {text: 'یکشنبه', value: '2'},
          {text: 'دوشنبه', value: '3'},
          {text: 'سه‌شنبه', value: '4'},
          {text: 'چهارشنبه', value: '5'},
          {text: 'پنجشنبه', value: '6'},
          {text: 'جمعه', value: '7'}
        ];
    }
  }

  change_active_state = (active) => {
    this.childRef.current.change_active_state(active);
  }

  render() {
    return (
      <>
        {this.props.second_banners[1]? <AdvertisingBanner product={{link: `${this.props.second_banners[1].product.id}` ,image: this.props.second_banners[1].product.image, name: this.props.second_banners[1].product.name, moto: this.props.second_banners[1].slogan, price: this.props.second_banners[1].product.price}}/> : 
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
                  <td>{this.props.product ? translate(this.props.product.first_category) + '>' + translate(this.props.product.second_category) + '>' + translate(this.props.product.third_category) : '-'}</td>
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
            {(this.props? this.props.product? this.props.product.owner? this.props.product.owner.email? (localStorage.user_email !== this.props.product.owner.email) : false : false : false : false) ? null :
              <div className='product-details__buttons-container'>
                <div onClick={()=>this.props.deleteProduct(this.props.product? this.props.product.id? this.props.product.id : null : null)}>حذف</div>
                <Link to={this.props.product? this.props.product.id? `/changeProduct/${this.props.product.id}` : "" : "" }>ویرایش</Link>
                <Link to={this.props.product? this.props.product.id? `/ProductOrders/${this.props.product.id}` : "" : "" }>لیست سفارش ها</Link>
              </div>
            }
          </div>
        </div>
        <ProductScoreSubmit/>
        {(localStorage.user_email != null) ? 
        ((this.props? this.props.product? this.props.product.owner? this.props.product.owner.email? (localStorage.user_email != this.props.product.owner.email) : false : false : false : false) ? 
          <div className="product-details__button-container">
            <div className="product-details__order-title">ثبت سفارش</div>
            <Input label="تعداد" input={{value: this.state.count, onChange: (e) => this.setState({ count: e.target.value })}}></Input>
            <Whitespace space="1"/>
            <Select input={{name: 'receiving_day', onChange: (e) => this.setState({ delivery_weekday: e.target.value })}} label='روز دریافت کالا' content={this.get_day(this.get_starting_day() + 1)} />
            <Whitespace space="1"/>
            <Select input={{name: 'receiving_hour', onChange: (e) => this.setState({ delivery_hours: e.target.value })}} label='ساعت دریافت کالا' content={[{text: '9-12', value: '1'}, {text: '12-15', value: '2'}, {text: '15-18', value: '3'}]} />
            <Whitespace space="1"/>
            <Button text="سفارش" onClick={() => this.props.addToCart(this.props.product.id? this.props.product.id : null, {count: this.state.count, delivery_weekday: this.state.delivery_weekday, delivery_hours: this.state.delivery_hours})}/>
          </div>
        :
          <div className='product-details__advertisements-container'>
            <div className='product-details__advertisements-title'>ثبت تبلیغات و خدمات</div>
            <CustomChoices callChild={this.change_advertisements} setMethod={click => this.change_choices = click}/>
            <SubmitAdvertisements product={this.props.product} callChild={this.change_choices} setMethod={click => this.change_advertisements = click}/>
          </div>)
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
  return { product: productItem, first_banners: state.advertisements.first_banners, 
    second_banners: state.advertisements.second_banners, third_bannesr: state.advertisements.third_banners}
}

export default connect(mapStatToProps, { deleteProduct, addToCart, fetchProduct, fetchFirstBanners, 
  fetchSecondBanners, fetchThirdBanners })(ProductDetails);
