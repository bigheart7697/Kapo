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
  renderList() {
    console.log(this.props.products);
    return !this.isEmpty(this.props.products) ? (
      Object.values(this.props.products).map((product, index) => {
        return (
          <Product
            key={index}
            image={product.image}
            title={product.name}
            price={product.price}
            month={product.created.month}
            day={product.created.day}
            year={product.created.year}
            description={product.description}
            address={product.user.address}
            onClick={() => history.push(`/product/${product.id}`)}
          />
        );
      })
    ) : (
      <div className="productList__no-obj-found">
        کالایی با مشخصات وارد شده یافت نشد
      </div>
    );
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
  }
}

const mapStateToProps = state => {
  return { products: state.products.products };
};

export default connect(mapStateToProps, {
  fetchProducts,
  searchProducts
})(ProductList);
