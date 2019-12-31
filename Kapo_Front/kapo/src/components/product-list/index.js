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
	  console.log(this.props.products)
    return (this.props.products ? Object.values(this.props.products).map((product, index) => {
      return (
        <Product
          key={index}
          image={faker.image.image()}
          title={product.title}
          price={faker.commerce.price()}
          month="مهر"
          day="1"
          year="1398"
          description="طبقه دوم همراه با یک عدد پارکینگ و یک واحد ۵۵ متری حیاط دار در همکف و قابل اجاره دادن."
          comments={faker.random.number()}
          likes={faker.random.number()}
          address="نیاوران"
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
