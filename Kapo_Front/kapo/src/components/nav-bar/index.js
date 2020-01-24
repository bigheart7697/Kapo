import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";

import NavItem from "../basic/navItem";
import NavDropDown from '../basic/navDropDown';
import history from '../../history';
import SearchBar from '../basic/searchBar';

import logo from '../../assets/Logo1.png';

class Navbar extends React.Component {
  state = { active: 10, dropActive: false, categories: [] };

  componentDidMount() {
    this.setState({categories : [
      {name: 'املاک', categories: []},
      {name: 'ماشین', categories: []},
      {name: 'کالای برقی', categories: []},
      {name: 'لباس', categories: []},
      {name: 'موسیقی', categories: []}
    ]})
  }


  render() {
    return (
      <div className='nav-bar__container'>
        <div className='nav-bar__image'>
          <img src={logo} className='nav-bar__logo'/>
        </div>
        <div className='nav-bar__content'>
          <div className='nav-bar__row nav-bar__row--tall'>
            
            <div className='nav-bar__item nav-bar__item--display-table nav-bar__item--long'>
              <SearchBar />
            </div>
            <div className='nav-bar__item nav-bar__item--items'>
              <div className='nav-bar__button nav-bar__button--red'>
                ثبت محصول جدید
              </div>
              <div className='nav-bar__button'>
                ثبت‌نام / ورود
              </div>
            </div>
          </div>
          <div className='nav-bar__row nav-bar__row--short'>
            {this.state.categories.map((element, index) => {
              if (this.state.active === index) {
                return (
                  <NavItem key={index} active>
                    {element.text}
                  </NavItem>
                );
              } else {
                return <div className='nav-bar__category' key={index}>{element.name}</div>;
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
