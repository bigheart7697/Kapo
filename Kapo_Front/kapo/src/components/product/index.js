import React from 'react'
import { Link } from 'react-router-dom'

import './style.scss'

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
            <span className='product__month' id='product__price'>{this.props.product ? this.props.product.price : "-"}</span>
          </div>
          <div className='product__data'>
            <div className='product__content'>
              <span className='product__author' id='product__address'>{this.props.product ? this.props.product.owner ? this.props.product.owner.country + '، ' + this.props.product.owner.city + '، ' + this.props.product.owner.address : '-' : '-'}</span>
              <h1 className='product__title'>
                <Link to='/'>{this.props.product ? this.props.product.name : null}</Link>
              </h1>
              <p className='product__text' id='product__description'>{this.props.product ? this.props.product.description : '-'}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Product
