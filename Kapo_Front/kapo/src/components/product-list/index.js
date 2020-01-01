import React from 'react';
import faker from 'faker';
import { connect } from 'react-redux';
import Product from '../product';
import RightPanel from '../right-panel';
import SearchBar from '../basic/searchBar'
import { selectProduct } from '../../actions';
import './style.scss'

class ProductList extends React.Component {	
	renderList() {
		return this.props.products.map(product => {
			return (
				<Product 
					image={product.image}
					title={product.name}
					price={product.price}
					month={product.month}
					day={product.day}
					year={product.year}
					description={product.description}
					address={product.user.address}
				/>
			);
		});
	}
	
	render() {
		return ( 
			<div>
				<RightPanel />
				<div className="productList__container">
					<SearchBar />
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