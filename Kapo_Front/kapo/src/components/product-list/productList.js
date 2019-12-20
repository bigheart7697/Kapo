import React from 'react';
import { connect } from 'react-redux';
import Product from './product';
import RightPanel from '../right-panel/rightPanel';
import { selectProduct } from '../../actions';

class ProductList extends React.Component {	
	renderList() {
		return this.props.products.map(product => {
			return ( 
				<div className="productRow">
					<div className="col-lg-3 col-sm-3" >
						<Product 
							image={product.image}
							title={product.title}
							price={product.price}
							date={product.date}
						/>
					</div>
				</div>
			);
		});
	}
	
	render() {
		return ( 
			<div>
				<RightPanel />
				<div className="col-sm-8 productList">
					{this.renderList()}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {products: state.products};
}

export default connect(mapStateToProps, {
	selectProduct: selectProduct
})(ProductList);