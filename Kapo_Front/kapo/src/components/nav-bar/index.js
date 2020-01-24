import React from "react";

import "./style.scss";

import SearchBar from '../basic/searchBar';
import MegaDropDown from '../basic/megaDropDown';

import logo from '../../assets/Logo1.png';
import image1 from '../../assets/1.png';
import image2 from '../../assets/2.png';
import image3 from '../../assets/3.png';
import image4 from '../../assets/4.png';
import image5 from '../../assets/5.png';

class Navbar extends React.Component {
  state = { active: [], dropActive: false, categories: [] };

  componentDidMount() {
    this.setState({categories : [
      {name: 'املاک', image: image1, categories: [
        {name: 'رهن', categories: [{name: 'نیاوران'}, {name: 'پاسداران'}]},
        {name: 'اجاره', categories: [{name: 'دو خوابه'}, {name: 'سه خوابه'}, {name: 'بیشتر'}]}
      ]},
      {name: 'ماشین', image: image2, categories: [
        {name: 'لوکس', categories: [{name: 'بنتلی'}, {name: 'بنز'}]},
        {name: 'اسپورت', categories: [{name: 'لامبورگینی'}, {name: 'بوگاتی'}]},
        {name: 'ایرانی', categories: [{name: 'پراید'}, {name: 'پیکان'}]}
      ]},
      {name: 'کالای برقی', image: image3, categories: [
        {name: 'خانگی', categories: [{name: 'جاروبرقی'}, {name: 'ماکروفر'}]},
        {name: 'لوازم جانبی', categories: [{name: 'شارژر'}]}
      ]},
      {name: 'لباس', image: image4, categories: [
        {name: 'زنانه', categories: [{name: 'کفش'}, {name: 'شلوار'}]},
        {name: 'مردانه', categories: [{name: 'شلوار'}, {name: 'پیراهن'}]},
        {name: 'بچگانه', categories: [{name: 'پسرانه'}, {name: 'دخترانه'}]}
      ]},
      {name: 'موسیقی', image: image5, categories: []}
    ]})
  }

  render() {
    return (
      <div>
        <div className='nav-bar__container'>
          <div className='nav-bar__image'>
            <img src={logo} className='nav-bar__logo' alt='لوگو'/>
          </div>
          <div className='nav-bar__content'>
            <div className='nav-bar__row nav-bar__row--tall'>
              
              <div className='nav-bar__item nav-bar__item--display-table nav-bar__item--long'>
                <SearchBar />
              </div>
              <div className='nav-bar__item nav-bar__item--items'>
                <div className='nav-bar__button nav-bar__button--red'>
                  ثبت محصول جدید
                </div>
                <div className='nav-bar__button'>
                  ثبت‌نام / ورود
                </div>
              </div>
            </div>
            <div className='nav-bar__row nav-bar__row--short'>
              {this.state.categories.map((element, index) => {
                return <div className='nav-bar__category' key={index} onMouseOver={() => this.refs.mega.changeCategories({categories: element.categories, image: element.image, name: element.name})} onMouseLeave={() => this.refs.mega.changeDeActive()}>{element.name}</div>;
              })}
            </div>
          </div>
        </div>
        <MegaDropDown ref='mega'/>
      </div>
    );
  }
}

export default Navbar;
