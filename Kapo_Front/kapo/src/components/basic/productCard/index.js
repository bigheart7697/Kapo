import React from 'react'
import faker from 'faker/locale/en'
import defaultImg from '../../../assets/default.jpg'

import './style.scss'

class productCard extends React.Component {
    state={mouseOver: false, element: this.props.product}
    render() {
        return (<div className="product-card__container" onMouseEnter={() => this.setState({ mouseOver: true})} onMouseLeave={() => this.setState({ mouseOver: false })}>
            <div className="product-card__content">
                <div className="product-card__name">{this.state.element.name}</div>
                {!this.state.mouseOver 
                ? <div className="product-card__description">{this.state.element.description}</div>
                : (<div className="product-card__details-button-container">
                    <div className="product-card__details-button">مشاهده جزییات</div>
                </div>)}
                <div className="product-card__image-container">
                    <div className="product-card__image-before" />
                    <div className="product-card__image" style={{ backgroundImage: `url(${defaultImg})` }}></div>
                </div>
            </div>
        </div>)
    }
}


export default productCard