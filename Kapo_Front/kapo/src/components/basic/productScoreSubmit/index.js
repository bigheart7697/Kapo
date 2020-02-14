import React from 'react'
import StarRatings from 'react-star-ratings';

import './style.scss'

import CustomButton from '../../basic/customButton'

class ProductScoreSubmit extends React.Component {
    state = { rating: 0 }
    changeRating = newRating => {
        this.setState({
            rating: newRating
        });
    }
    render() {
        return (
            <div className="product-score-submit__container">
                <div className="product-score-submit__header">
                    به این محصول امتیاز دهید
                </div>
                <div className="product-score-submit__score">
                    <StarRatings
                        rating={this.state.rating}
                        starRatedColor="#950740"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        starDimension="35px"
                        starSpacing="1px"
                        name='rating'
                    />
                </div>
                <CustomButton text="ثبت امتیاز" noWidth/>
            </div>
        )
    }
}

export default ProductScoreSubmit