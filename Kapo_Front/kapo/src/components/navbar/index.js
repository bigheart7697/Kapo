import React from "react";

import "./style.scss";

import NavItem from "../basic/navItem";

const navItems = [
  {
    text: "صفحه اصلی"
  },
  {
    text: "درباره ما"
  },
  {
    text: "محصولات"
  },
  {
    text: "ورود"
  },
  {
    text: "خروج"
  }
];

class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar__container">
        <div className="navbar__content">
          {navItems.map((element, index) => {
            return <NavItem key={index}>{element.text}</NavItem>;
          })}
        </div>
      </div>
    );
  }
}

export default Navbar;
