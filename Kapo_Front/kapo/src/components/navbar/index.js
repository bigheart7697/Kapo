import React from "react";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import "./style-new.scss";

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
  },
  {
    text: "دشبورد",
    link: "/dashboard",
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
    console.log(this.props.category_hier);
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

export default connect(mapStateToProps, {fetchCategoryHierarchy, searchProducts, sponsoredSearchProducts, SignOut})(Navbar)
