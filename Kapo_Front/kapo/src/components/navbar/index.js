import React from "react";
import { Link } from "react-router-dom";

import "./style-new.scss";

import NavItem from "../basic/navItem";
import NavDropDown from '../basic/navDropDown';
import history from '../../history';

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
      <div className="navbar__flex">
        <div className="navbar__container">
          <div className="navbar__content">
            {navItems.map((element, index) => {
              if (this.state.active === index) {
                return (
                  <NavItem key={index} active>
                    {element.text}
                  </NavItem>
                );
              } else {
                return <NavItem key={index} onClick={() => this.navItemOnClick(index, element.link)}>{element.text}</NavItem>;
              }
            })}
          </div>
          <div className="navbar__tail" onClick={() => this.setState({ dropActive: !this.state.dropActive })}>
            <div className="navbar__circle"></div>
            <NavDropDown active={this.state.dropActive}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
