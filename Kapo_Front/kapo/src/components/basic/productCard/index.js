import React from 'react'
import defaultImg from '../../../assets/default.jpg'

import './style.scss'

class productCard extends React.Component {
    state={mouseOver: false, element: this.props.product}
    render() {
        console.log(this.state.element.image);
        console.log(`url(${defaultImg})`);
        console.log(`url(${this.state.element.image})`);
        
        
        return (<div className={`product-card__container` + (this.props.is_sponsered ? ` product-card__container--gold` : ``)} onClick={this.props.onClick} onMouseEnter={() => this.setState({ mouseOver: true})} onMouseLeave={() => this.setState({ mouseOver: false })} style={{ backgroundImage: this.state.element.image? `url(${this.state.element.image})` : `url(${defaultImg})` }}>
            <div className={`product-card__content` + (this.props.is_sponsered ? ` product-card__content--gold` : ``)}>
                <div className={`product-card__name` + (!this.state.mouseOver ? `` : ` product-card__name--hover`) + (this.props.is_sponsered ? ` product-card__name--gold` : ``)}>{this.state.element.name}</div>
                {!this.state.mouseOver 
                ? <div className="product-card__description">{this.state.element.description}</div>
                : (<div className="product-card__details-button-container">
                    <div className={`product-card__details-button` + (this.props.is_sponsered ? ` product-card__details-button--gold` : ``)}>مشاهده جزییات</div>
                </div>)}
                <div className="product-card__image-container">
                    <div className={`product-card__image-before` + (this.props.is_sponsered ? ` product-card__image-before--gold` : ``)} />
                    <div className="product-card__image" style={{ backgroundImage: this.state.element.image? `url(${this.state.element.image})` : `url(${defaultImg})` }}></div>
                </div>
            </div>
        </div>)
    }
}


export default productCard