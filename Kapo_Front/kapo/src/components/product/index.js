import React from 'react'
import { Dimmer, Image } from 'semantic-ui-react'
import './style.scss'

class Product extends React.Component {
  state = { active: false, zIndex: -1, top: "0px" }

  changeState = () => {
    if(this.state.active){
      this.setState({top: "0px"})
    } else {
      this.setState({top: "-30px"})
    }
    this.setState({active: !this.state.active})
    this.setState({zIndex: -this.state.zIndex})
    
  }

  render () {
    return (
      <div className='product__example-1 product__card'>
        <div className='product__wrapper' style={{ backgroundImage: 'url(' + this.props.image + ')' }}>
          <div className='product__date'>
            <span className='product__day'>{this.props.day}</span>
            <span className='product__month'>{this.props.month}</span>
            <span className='product__year'>{this.props.year}</span>
          </div>
          <div className='product__data'>
            <div className='product__content'>
              <span className='product__author'>{this.props.address}</span>
              <h1 className='product__title'>
                <a href='#'>{this.props.title}</a>
              </h1>
              <p className='product__text'>{this.props.description}</p>
              <label for='show-menu' className='product__menu-button' onClick={this.changeState}>
                <span></span>
              </label>
            </div>
            <ul className='product__menu-content' style={{zIndex: this.state.zIndex, top: this.state.top}}>
              <li>
                <a href='#' className='fa fa-bookmark-o'></a>
              </li>
              <li>
                <a href='#' className='fa fa-heart-o'>
                  <span>{this.props.likes}</span>
                </a>
              </li>
              <li>
                <a href='#'>
                  <i class="fa fa-comment-o" aria-hidden="true"></i>
                  <span>{this.props.comments}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Product
