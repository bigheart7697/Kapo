import React from 'react'
import defaultImg from '../../../assets/default.jpg'

import './style.scss'

class productCard extends React.Component {
    state={mouseOver: false, element: this.props.product}
    render() {
        console.log(this.state.element.image);
        console.log(`url(${defaultImg})`);
        console.log(`url(${this.state.element.image})`);
        
        
        return (<div className="product-card__container" onClick={this.props.onClick} onMouseEnter={() => this.setState({ mouseOver: true})} onMouseLeave={() => this.setState({ mouseOver: false })} style={{ backgroundImage: this.state.element.image? `url(${this.state.element.image})` : `url(${defaultImg})` }}>
            <div className="product-card__content">
                <div className={!this.state.mouseOver ? "product-card__name" : "product-card__name product-card__name--hover"}>{this.state.element.name}</div>
                {!this.state.mouseOver 
                ? <div className="product-card__description">{this.state.element.description}</div>
                : (<div className="product-card__details-button-container">
                    <div className="product-card__details-button">مشاهده جزییات</div>
                </div>)}
                <div className="product-card__image-container">
                    <div className="product-card__image-before" />
                    <div className="product-card__image" style={{ backgroundImage: this.state.element.image? `url(${this.state.element.image})` : `url(${defaultImg})` }}></div>
                </div>
            </div>
        </div>)
    }
}


export default productCard