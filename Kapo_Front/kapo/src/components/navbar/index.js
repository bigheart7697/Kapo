import React from "react";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import "./style.scss";
import defaultImage from '../../assets/user.png'

import NavItem from "../basic/navItem";
import NavDropDown from '../basic/navDropDown';
import history from '../../history';
import SearchBar from '../basic/searchBar';
import MegaDropDown from "../basic/megaDropDown";
import { sponsoredSearchProducts, searchProducts, SignOut, fetchCategoryHierarchy } from "../../actions";

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

  constructor(props) {
    super(props);

    let path = null

    if(history){
      if(history.location){
        if(history.location.pathname){
          path = history.location.pathname
        }
      }
    }

    this.state = { active: this.setCorrectState(path), dropActive: false, categories: []};
  }

  navItemOnClick = (index, link) => {
    this.setState({ active : index })
    history.push(link)
  }

  onSearch = (query, category=null) => {
    if(query){
        this.setState({query})
    }
    this.props.searchProducts(query, category);
    this.props.sponsoredSearchProducts(query);
  };

  checkStartWith = (path) => {
    if (path.startsWith("/product")) {
      return 'جزئیات کالا'
    }
    if (path.startsWith("/order/preview")) {
      return 'جزئیات سفارش'
    }
    if (path.startsWith("/order/factor")) {
      return 'جزئیات سفارش'
    }
    if (path.startsWith("/ProductOrders")) {
      return 'سفارش‌های کالا'
    }
    if (path.startsWith("/changeProduct")) {
      return 'ویرایش اطلاعات محصول'
    }
    if (path.startsWith("/ProductList")) {
      return 'لیست کالاها'
    }
    if (path.startsWith("/pay/factor")) {
      return 'فاکتور پرداخت صورت حساب'
    }
    if (path.startsWith("/order/preview")) {
      return 'جزئیات سفارش'
    }
    return path
  }

  setPathName = (path) => {
    switch(path){
      case '/':
        return 'صفحه‌اصلی'
      case '/ProductList':
        return 'لیست کالاها'
      case '/AddProduct':
        return 'اضافه کردن کالا'
      case '/Auth/SignIn':
        return 'ورود'
      case '/Auth/SignUp':
        return 'ثبت نام'
      case '/order/list':
        return 'لیست سفارش‌ها'
      case '/dashboard':
        return 'پنل کاربری'
      case '/adminDashboard':
        return 'پنل کاربری'
      case '/payment/result/success':
        return 'پرداخت موفقیت آمیز'
      case '/payment/result/fail':
        return 'پرداخت غیر موفقیت آمیز'
      case '/advertisement/list':
        return 'لیست تبلیغات'
      default:
        return this.checkStartWith(path);
    }
  }

  setCorrectState = (path) => {
    switch(path){
      case '/':
        return 0;
      case '/ProductList':
        return 1;
      case '/AddProduct':
        return 2;
      case '/dashboard':
        return 3;
      default:
        return null;
    }
  }

  componentDidMount() {
    this.props.fetchCategoryHierarchy();
  }

  activeMegaDropDown = (e) => {
    if(e.onHover) {
      this.refs.megaDropDown.changeCategories({categories: (this.props.category_hierarchy ? this.props.category_hierarchy.categories : [])})
    }
  }

  deActiveMegaDropDown = (e) => {
    if(e.onHover) {
      this.refs.megaDropDown.changeDeActive()
    }
  }

  render() {
    return (
      <>
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
                      <div className="navbar__circle" onClick={() => {this.setState({ dropActive: !this.state.dropActive }); history.push(this.props.isStaff ? '/adminDashboard/' : '/dashboard/')}} style={{ backgroundImage: `url("${this.props.profileImage ? this.props.profileImage : defaultImage}")` }}></div>
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
        <div className="navbar__page-title">
          {this.setPathName(history.location.pathname)}
        </div>
      </>
    );
  }
}


const mapStateToProps = (state) => {
  return {category_hierarchy: state.products.category_hierarchy, profileImage: state.user.information.photo, isStaff: state.user.information.is_staff }
}

export default connect(mapStateToProps, {fetchCategoryHierarchy, searchProducts, sponsoredSearchProducts, SignOut})(Navbar)
