import React from 'react'
import StarRatings from 'react-star-ratings';
 
class StarScore extends React.Component {
  state={ rating: this.props.score }
    // changeRating( newRating, name ) {
    //   this.setState({
    //     rating: newRating
    //   });
    // }
 
    render() {
      return (
        <StarRatings
          rating={this.state.rating}
          starRatedColor="yellow"
          // changeRating={this.changeRating}
          numberOfStars={5}
          starDimension="17px"
          starSpacing="1px"
          name='rating'
        />
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

