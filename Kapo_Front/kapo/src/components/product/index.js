import React from 'react'
import faker from 'faker'

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
        <div className='product__wrapper' style={{ backgroundImage: 'url(' + this.props.product.image + ')' }}>
          <div className='product__date'>
            <span className='product__month'>قیمت</span>
            <span className='product__month'>{this.props.product ? this.props.product.price : "-"}</span>
          </div>
          <div className='product__data'>
            <div className='product__content'>
              <span className='product__author'>{this.props.product ? this.props.product.owner ? this.props.product.owner.address : '-' : '-'}</span>
              <h1 className='product__title'>
                <a href='/'>{this.props.product ? this.props.product.name : null}</a>
              </h1>
              <p className='product__text'>{this.props.product ? this.props.product.description : '-'}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Product
