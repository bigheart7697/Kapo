import React from 'react'
import defaultImg from '../../../assets/default.jpg'

import './style.scss'

class productCard extends React.Component {
    state={mouseOver: false, element: this.props.product}
    render() {
        console.log(this.state.element.name);
        console.log(`url(${defaultImg})`);
        console.log(`url(${this.state.element.image})`);
        
        
        return (<div className="product-card__container" onClick={this.props.onClick} onMouseEnter={() => this.setState({ mouseOver: true})} onMouseLeave={() => this.setState({ mouseOver: false })} style={{ backgroundImage: this.props.product.image? `url(${this.props.product.image})` : `url(${defaultImg})` }}>
            <div className="product-card__content">
                <div className={!this.state.mouseOver ? "product-card__name" : "product-card__name product-card__name--hover"}>{this.props.product.name}</div>
                {!this.state.mouseOver 
                ? <div className="product-card__description">{this.props.product.description}</div>
                : (<div className="product-card__details-button-container">
                    <div className="product-card__details-button">مشاهده جزییات</div>
                </div>)}
                <div className="product-card__image-container">
                    <div className="product-card__image-before" />
                    <div className="product-card__image" style={{ backgroundImage: this.props.product.image? `url(${this.props.product.image})` : `url(${defaultImg})` }}></div>
                </div>
            </div>
        </div>)
    }
}


export default productCard