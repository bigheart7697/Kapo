import React from "react";

import "./style-new.scss";

import NavItem from "../basic/navItem";
import NavDropDown from '../basic/navDropDown';
import history from '../../history';
import MageDropDown from '../basic/megaDropDown';
import SearchBar from '../basic/searchBar';
import MegaDropDown from "../basic/megaDropDown";

import image1 from '../../assets/category1.png';
import image2 from '../../assets/category2.png';
import image3 from '../../assets/category3.png';
import image4 from '../../assets/category4.png';
import image5 from '../../assets/category5.png';

const navItems = [
  {
    text: "صفحه اصلی",
    link: "/",
    onHover: false
  },
  {
    text: "لیست محصولات",
    link: "/ProductList",
    onHover: true
  }
];

class Navbar extends React.Component {
  state = { active: 0, dropActive: false, logged_in: true, categories: []};
  
  navItemOnClick = (index, link) => {
    this.setState({ active : index })
    history.push(link)
  }

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

  activeMegaDropDown = (e) => {
    if(e.onHover) {
      this.refs.megaDropDown.changeCategories({categories: this.state.categories})
    }
  }

  deActiveMegaDropDown = (e) => {
    if(e.onHover) {
      this.refs.megaDropDown.changeDeActive()
    }
  }

  render() {
    return (
      <div>
        <div className="navbar__flex">
          <div className="navbar__container">
            <div className="navbar__content">
              {navItems.map((element, index) => {
                if (this.state.active === index) {
                  return (
                    <NavItem key={index} active onMouseOver={() => this.activeMegaDropDown(element)} onMouseOut={() => this.deActiveMegaDropDown(element)}>
                      {element.text}
                    </NavItem>
                  );
                } else {
                  return(
                    <NavItem key={index} onClick={() => this.navItemOnClick(index, element.link)}
                      onMouseOver={() => this.activeMegaDropDown(element)}
                      onMouseOut={() => this.deActiveMegaDropDown(element)}>
                      {element.text}
                    </NavItem>);
                }
              })}
            </div>
            <div className='navbar__searchbar'>
              <SearchBar />
            </div>
            <div className='navbar__auth'>
              {this.state.logged_in ? 
                (<div><div className="navbar__circle" onClick={() => this.setState({ dropActive: !this.state.dropActive })}></div>
                <NavDropDown active={this.state.dropActive}/></div>)
              :
                (<div className='nav-bar__button'>
                  ورود/ثبت‌نام
                </div>)
              }
            </div>
            <div className='navbar__new-product'>
              <div className='nav-bar__button'>
                ثبت محصول جدید
              </div>
            </div>
          </div>
          <MegaDropDown ref='megaDropDown' />
        </div>
      </div>
    );
  }
}

export default Navbar;
