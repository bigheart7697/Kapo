import React from "react";
import faker from "faker";
import { connect } from "react-redux";
import Product from "../product";
import RightPanel from "../right-panel";
import SearchBar from "../basic/searchBar";
import { fetchProducts, searchProducts } from "../../actions";
import "./style.scss";

class ProductList extends React.Component {
	componentDidMount = () => {
		this.props.fetchProducts();
	};

	renderList() {
		return (this.props.products ? this.props.products.map((product, index) => {
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
		}) : null)
	} 

	onSubmit = (query) => {
		this.props.searchProducts(query)
	};

	render() {
		return (
		<div>
			<RightPanel />
			<div className="productList__container">
				<SearchBar onSubmit={this.onSubmit} />
				{this.renderList()}
			</div>
		</div>
		);
  }
}

const mapStateToProps = state => {
  return { products: state.products.products };
};

export default connect(mapStateToProps, {
  fetchProducts,
  searchProducts
})(ProductList);
