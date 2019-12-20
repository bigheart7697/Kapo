import React from 'react';
import faker from 'faker';
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
							image={faker.image.image()}
							title={faker.commerce.product()}
							price={faker.commerce.price()}
							date={faker.date.month()}
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