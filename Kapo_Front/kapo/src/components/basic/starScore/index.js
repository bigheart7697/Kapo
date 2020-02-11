import React from 'react'
import StarRatings from 'react-star-ratings';
 
import './style.scss'

class StarScore extends React.Component {
  state={ rating: 2.4 }
    // changeRating( newRating, name ) {
    //   this.setState({
    //     rating: newRating
    //   });
    // }
 
    render() {
      return (
        <div className="star-rating__container">
          <StarRatings
            rating={this.state.rating}
            starRatedColor="yellow"
            // changeRating={this.changeRating}
            numberOfStars={5}
            starDimension="17px"
            starSpacing="1px"
            name='rating'
          />
        </div>
      );
    }
}

export default StarScore
 
 
// class Bar extends Component {
//   render() {
//     // aggregateRating = 2.35;
//     return (
//       <StarRatings
//         rating={2.403}
//         starDimension="40px"
//         starSpacing="15px"
//       />
//     );
//   }
// }

