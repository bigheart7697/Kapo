import React from 'react'
import defaultImg from '../../../assets/default.jpg'

import './style.scss'

import StarScore from '../../basic/starScore'
import { Link } from 'react-router-dom'

class productCard extends React.Component {
    state={mouseOver: false, element: this.props.product}
    render() {
        return (<div className={`product-card__container` + (this.props.is_sponsered ? ` product-card__container--gold ` : ``) + (this.props.is_campaign ? ` product-card__container--campaign` : ``)} onClick={this.props.onClick} onMouseEnter={() => this.setState({ mouseOver: true})} onMouseLeave={() => this.setState({ mouseOver: false })} style={{ backgroundImage: this.props.product ? this.props.product.image? `url(${this.props.product.image})` : `url(${defaultImg})` : `url(${defaultImg})` }}>
            <div className={`product-card__content` + (this.props.is_sponsered ? ` product-card__content--gold ` : ``) + (this.props.is_campaign ? ` product-card__content--campaign` : ``)}>
                <div className={`product-card__name` + (!this.state.mouseOver ? `` : ` product-card__name--hover`) + (this.props.is_sponsered ? ` product-card__name--gold` : ``) + (this.props.is_campaign ? ` product-card__name--campaign` : ``)}>{this.props.product ? this.props.product.name : '-'}</div>
                {!this.state.mouseOver 
                ? 
                <>
                    <div className="product-card__description">
                        <div className="product-card__description-text">
                            {this.props.product ? this.props.product.description : '-'}
                        </div>
                        <StarScore score={this.props.product ? this.props.product.average_score ? this.props.product.average_score : 0 : 0}/>
                    </div>
                </>
                : (<div className="product-card__details-button-container">
                    <div className={`product-card__details-button` + (this.props.is_sponsered ? ` product-card__details-button--gold ` : ``) + (this.props.is_campaign ? ` product-card__details-button--campaign` : ``)}><Link to={`/product/` + (this.props.product ? this.props.product.id : ``)}>مشاهده جزییات</Link></div>
                </div>)}
                <div className="product-card__image-container">
                    <div className={`product-card__image-before` + (this.props.is_sponsered ? ` product-card__image-before--gold ` : ``) + (this.props.is_campaign ? ` product-card__image-before--campaign` : ``)} />
                    <div className="product-card__image" style={{ backgroundImage: this.props.product ? this.props.product.image ? `url(${this.props.product.image})` : `url(${defaultImg})` : `url(${defaultImg})` }}></div>
                </div>
            </div>
        </div>)
    }
}


export default productCard