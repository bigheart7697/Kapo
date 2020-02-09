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
      this.refs.megaDropDown.changeCategories({categories: this.props.category_hierarchy.categories})
    }
  }

  deActiveMegaDropDown = (e) => {
    if(e.onHover) {
      this.refs.megaDropDown.changeDeActive()
    }
  }

  render() {
    console.log(this.props.category_hierarchy);
    console.log(this.state.categories);
    // this.setState(this.props.category_hierarchy)
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
                (<div>
                  <Link to='/auth/SignIn' className='nav-bar__button'>
                    ورود/ثبت‌نام
                  </Link>
                </div>)
              }
            </div>
            <div>
                </div>
              <div className='navbar__new-product'>
                <Link to='/AddProduct' className='nav-bar__button'>
                  ثبت محصول جدید
                </Link>
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
