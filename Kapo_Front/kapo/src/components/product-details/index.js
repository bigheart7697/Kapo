import React from 'react';
import './style.scss';

class ProductDetails extends React.Component {
    render() {
        return (
            <div className="productDetails__container">
                <div className="productDetails__leftPanel">
                    <div className="productDetails__imageContainer">
                        <div className="productDetails__image" style={{backgroundImage: 'url(' +this.props.image + ')' }}></div>
                    </div>
                </div>
                <div className="productDetails__rightPanel">
                    hello
                </div>
            </div>
        );
    }
}

export default ProductDetails;