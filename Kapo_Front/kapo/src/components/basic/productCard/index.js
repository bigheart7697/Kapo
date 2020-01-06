import React from 'react'
import faker from 'faker'

import './style.scss'

class productCard extends React.Component {
    state={mouseOver: false, image: faker.image.image()}
    render() {
        return (<div className="product-card__container" onMouseEnter={() => this.setState({ mouseOver: true})} onMouseLeave={() => this.setState({ mouseOver: false })}>
            <div className="product-card__content">
                <div className="product-card__name">قلیون مش حسن</div>
                {!this.state.mouseOver 
                ? <div className="product-card__description">خیلی بچه خوبیه بیاین ببرینش. خودمم مجبورم وگرنه نمی‌دادمش بره. آیم سو سو سد.</div>
                : (<div className="product-card__details-button-container">
                    <div className="product-card__details-button">مشاهده جزییات</div>
                </div>)}
                <div className="product-card__image-container">
                    <div className="product-card__image-before" />
                    <div className="product-card__image" style={{ backgroundImage: `url(${this.state.image})` }}></div>
                </div>
            </div>
        </div>)
    }
}

export default productCard