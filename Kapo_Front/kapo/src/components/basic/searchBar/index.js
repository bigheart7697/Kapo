import React from "react";

import "./style.scss";

import history from '../../../history'

class SearchBar extends React.Component {
  state = { term: "", timeout: null };

  //TODO doesnt need to be a form
  typeTimeout = () => {
	clearTimeout(this.state.timeout)
	this.setState({ timeout: setTimeout(() => this.props.onSearch(this.state.term), 1000) })	  
  }

  render() {
    return (
      <form className="searchBar__form" onSubmit={(event) => event.preventDefault()}>
        <div className="searchBar__item">
          <i className="search icon searchBar__icon"></i>
          <input
            className="searchBar__input"
            type="text"
            placeholder="جستجوی عبارت"
            value={this.state.term}
            onChange={e => {
              history.push('/ProductList/')
              this.setState({ term: e.target.value });
              this.typeTimeout()
            }}
          />
        </div>
      </form>
    );
  }
}

export default SearchBar;
