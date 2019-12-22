import React from 'react';
import faker from 'faker';
import { connect } from 'react-redux';
import Product from '../product';
import RightPanel from '../right-panel';
import SearchBar from '../base/searchBar'
import { selectProduct } from '../../actions';
import './style.scss'

class ProductList extends React.Component {	
	renderList() {
		return this.props.products.map(product => {
			return (
				<Product 
					image={faker.image.image()}
					title='ملک'
					price={faker.commerce.price()}
					month='مهر'
					day='1'
					year='1398'
					description='طبقه دوم همراه با یک عدد پارکینگ و یک واحد ۵۵ متری حیاط دار در همکف و قابل اجاره دادن.'
					comments={faker.random.number()}
					likes={faker.random.number()}
					address='نیاوران'	
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