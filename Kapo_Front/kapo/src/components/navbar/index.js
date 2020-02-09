import React from "react";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import "./style-new.scss";

import NavItem from "../basic/navItem";
import NavDropDown from '../basic/navDropDown';
import history from '../../history';
import SearchBar from '../basic/searchBar';
import MegaDropDown from "../basic/megaDropDown";

import image1 from '../../assets/category1.png';
import image2 from '../../assets/category2.png';
import image3 from '../../assets/category3.png';
import image4 from '../../assets/category4.png';
import image5 from '../../assets/category5.png';
import { searchProducts, SignOut, fetchCategoryHierarchy } from "../../actions";

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
  },
  {
    text: "ثبت محصول جدید",
    link: "/AddProduct",
    onHover: false
  }
];

class Navbar extends React.Component {
  state = { active: 0, dropActive: false, categories: []};
  
  navItemOnClick = (index, link) => {
    this.setState({ active : index })
    history.push(link)
  }

  onSearch = (query, category=null) => {
    if(query){
        this.setState({query})
    }
    this.props.searchProducts(query, category);
};

  componentDidMount() {
    this.props.fetchCategoryHierarchy();
    this.setState({categories : [
      {text: 'املاک', value: '1', image: image1, categories: [
        {text: 'رهن', value: '1', categories: [{text: 'نیاوران', value: '1'}, {text: 'پاسداران', value: '2'}]},
        {text: 'اجاره', value: '2', categories: [{text: 'دو خوابه', value: '1'}, {text: 'سه خوابه', value: '2'}, {text: 'بیشتر', value: '3'}]}
      ]},
      {text: 'ماشین', value: '2', image: image2, categories: [
        {text: 'لوکس', value: '1', categories: [{text: 'بنتلی', value: '1'}, {text: 'بنز', value: '2'}]},
        {text: 'اسپورت', value: '2', categories: [{text: 'لامبورگینی', value: '1'}, {text: 'بوگاتی', value: '2'}]},
        {text: 'ایرانی', value: '3', categories: [{text: 'پراید', value: '1'}, {text: 'پیکان', value: '2'}]}
      ]},
      {text: 'کالای برقی', value: '3', image: image3, categories: [
        {text: 'خانگی', value: '1', categories: [{text: 'جاروبرقی', value: '1'}, {text: 'ماکروفر', value: '2'}]},
        {text: 'لوازم جانبی', value: '2', categories: [{text: 'شارژر', value: '1'}]}
      ]},
      {text: 'لباس', value: '4', image: image4, categories: [
        {text: 'زنانه', value: '1', categories: [{text: 'کفش', value: '1'}, {text: 'شلوار', value: '2'}]},
        {text: 'مردانه', value: '2', categories: [{text: 'شلوار', value: '1'}, {text: 'پیراهن', value: '2'}]},
        {text: 'بچگانه', value: '3', categories: [{text: 'پسرانه', value: '1'}, {text: 'دخترانه', value: '2'}]}
      ]},
      {text: 'موسیقی', value: '5', image: image5, categories: []}
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
    console.log(this.props.category_hierarchy);
    
    return (
      <div className="navbar__component--padding-top">
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
              <SearchBar onSearch={this.onSearch}/>
            </div>
            <div className='navbar__auth'>
              {this.props.loggedIn ? 
                (<div>
                    <div className="navbar__circle" onClick={() => this.setState({ dropActive: !this.state.dropActive })}></div>
                    <NavDropDown active={this.state.dropActive}/>
                  </div>)
              :
                (<div className='navbar__new-product'>
                  <Link to='/auth/SignIn' className='nav-bar__button'>
                    ورود/ثبت‌نام
                  </Link>
                </div>)
              }
            </div>
            <div>
                </div>
              <div>
              {this.props.loggedIn ? <div onClick={this.props.SignOut} className='nav-bar__button'>
                    خروج
                  </div> : null}
              </div>
          </div>
          <MegaDropDown ref='megaDropDown' />
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {category_hierarchy: state.products.category_hierarchy }
}

export default connect(mapStateToProps, {fetchCategoryHierarchy, searchProducts, SignOut})(Navbar)
