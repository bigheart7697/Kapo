import React from 'react'
import { Dimmer, Image } from 'semantic-ui-react'

import './style.scss'

import history from "../../history"

class Product extends React.Component {
  state = { active: false, zIndex: -1, top: "30px" }

  changeState = () => {
    if(this.state.active){
      this.setState({top: "30px"})
    } else {
      this.setState({top: "-30px"})
    }
    this.setState({active: !this.state.active})
    this.setState({zIndex: -this.state.zIndex})
    
  }

  render () {
    return (
      <div className='product__example-1 product__card' onClick={this.props.onClick ? this.props.onClick : null}>
        <div className='product__wrapper' style={{ backgroundImage: 'url(' + this.props.image + ')' }}>
          <div className='product__date'>
            <span className='product__day'>{this.props.day ? this.props.day : 1}</span>
            <span className='product__month'>{this.props.month ? this.props.month : "مهر"}</span>
            <span className='product__year'>{this.props.year ? this.props.year : "1398" }</span>
          </div>
          <div className='product__data'>
            <div className='product__content'>
              <span className='product__author'>{this.props.address ? this.props.address : "no address"}</span>
              <h1 className='product__title'>
                <a href='/'>{this.props.title ? this.props.title : null}</a>
              </h1>
              <p className='product__text'>{this.props.description ? this.props.description : null}</p>
              {/*
              <label for='show-menu' className='product__menu-button' onClick={this.changeState}>
                <span></span>
              </label>
              */}
            </div>
            {/*
              <ul className='product__menu-content' style={{zIndex: this.state.zIndex, top: this.state.top}}>
              <li>
                <i class="bookmark icon product__i--no-margin"></i>
              </li>
              <li>
                <i class="heart icon"></i>
                <span>{this.props.likes}</span>
              </li>
              <li>
                <i class="comment icon"></i>
                <span>{this.props.comments}</span>
              </li>
            </ul>
            */}
          </div>
        </div>
      </div>
    )
  }
}

export default Product
