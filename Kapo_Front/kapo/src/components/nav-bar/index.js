import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";

import NavItem from "../basic/navItem";
import NavDropDown from '../basic/navDropDown';
import history from '../../history';
import SearchBar from '../basic/searchBar';

import logo from '../../assets/Logo1.png';

const navItems = [
  {
    text: "صفحه اصلی",
    link: "/"
  },
  {
    text: "اضافه کردن محصول",
    link: "/addProduct"
  },
  {
    text: "محصولات",
    link: "/ProductList"
  },
  {
    text: "ورود",
    link: "/Auth/SignIn"
  },
  {
    text: "ثبت نام",
    link: "/Auth/SignUp"
  },
  {
    text: "خروج",
    link: "/"
  }
];

class Navbar extends React.Component {
  state = { active: 0, dropActive: false };
  navItemOnClick = (index, link) => {
    this.setState({ active : index })
    history.push(link)
  }
  render() {
    return (
      <div className='nav-bar__container'>
        <div className='nav-bar__row nav-bar__row--tall'>
          <div className='nav-bar__item nav-bar__item--image'>
            <img src={logo} className='nav-bar__logo'/>
          </div>
          <div className='nav-bar__item nav-bar__item--display-table nav-bar__item--long'>
            <SearchBar />
          </div>
          <div className='nav-bar__item'>
          </div>
        </div>
        <div className='nav-bar__row nav-bar__row--short'>
        </div>
      </div>
    );
  }
}

export default Navbar;
