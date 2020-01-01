import React from "react";
import { connect } from "react-redux";
import Product from "../product";
import RightPanel from "../right-panel";
import SearchBar from "../basic/searchBar";
import { fetchProducts, searchProducts } from "../../actions";
import history from "../../history";
import "./style.scss";

class ProductList extends React.Component {
	componentDidMount = () => {
		this.props.fetchProducts();
	};

<<<<<<< HEAD
  renderList() {
    console.log(this.props.products);
    return (!this.isEmpty(this.props.products)
      ? Object.values(this.props.products).map((product, index) => {
          return (
            <Product
              key={index}
              image={faker.image.image()}
              title={product.name}
              price={faker.commerce.price()}
              month="مهر"
              day="1"
              year="1398"
              description="طبقه دوم همراه با یک عدد پارکینگ و یک واحد ۵۵ متری حیاط دار در همکف و قابل اجاره دادن."
              comments={faker.random.number()}
              likes={faker.random.number()}
              address="نیاوران"
              onClick={() => history.push(`/product/${product.id}`)}
            />
          );
        })
      : <div className="productList__no-obj-found">کالایی با مشخصات وارد شده یافت نشد</div>);
  }

  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  onSearch = query => {
    this.props.searchProducts(query);
  };

  render() {
    return (
      <div>
        <RightPanel />
        <div className="productList__container">
          <SearchBar onSearch={this.onSearch} />
          {this.renderList()}
        </div>
      </div>
    );
=======
	renderList() {
		return (this.props.products ? this.props.products.map((product, index) => {
			return (
				<Product 
					image={product.image}
					title={product.name}
					price={product.price}
					month={product.created.month}
					day={product.created.day}
					year={product.created.year}
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
>>>>>>> 36663e9d5389f48a4283e57a90944b1a7892028d
  }
}

const mapStateToProps = state => {
  return { products: state.products.products };
};

export default connect(mapStateToProps, {
  fetchProducts,
  searchProducts
})(ProductList);
