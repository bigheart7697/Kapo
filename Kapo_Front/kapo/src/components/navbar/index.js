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

setPathName = (path) => {
  switch(path){
    case '/':
      return 'صفحه‌اصلی'
    default:
      return path;
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
                      <div className="navbar__circle" onClick={() => {this.setState({ dropActive: !this.state.dropActive }); history.push('/dashboard/')}} style={{ backgroundImage: `url("${this.props.profileImage ? this.props.profileImage : defaultImage}")` }}></div>
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
  return {category_hierarchy: state.products.category_hierarchy, profileImage: state.user.information.photo }
}

export default connect(mapStateToProps, {fetchCategoryHierarchy, searchProducts, sponsoredSearchProducts, SignOut})(Navbar)
