import React from "react";
import { Link } from 'react-router-dom'

import "./style.scss";

import NavItem from "../basic/navItem";

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
    link: "/"
  },
  {
    text: "ورود",
    link: "/"
  },
  {
    text: "خروج",
    link: "/"
  }
];

class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar__container">
        <div className="navbar__content">
          {navItems.map((element, index) => {
              //TODO wtf? =)))
            return <Link to={element.link} key={index} className="navbar__link" style={{ color: 'inherit', textDecoration: 'inherit'}}><NavItem>{element.text}</NavItem></Link>;
          })}
        </div>
      </div>
    );
  }
}

export default Navbar;
