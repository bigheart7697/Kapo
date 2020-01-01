import React from 'react';

import './style.scss';

class SearchBar extends React.Component {
	state = { term: '' };
	
	onFormSubmit = (event) => {
		event.preventDefault();
		this.props.onSubmit(this.state.term);
	}
	
	render() {
		return (
			<div>
				<form className="searchBar__form" onSubmit={this.onFormSubmit}>
					<div className="searchBar__item">
						<i className="search icon searchBar__icon"></i>
						<input className="searchBar__input" type="text" placeholder="جستجوی عبارت"
							value={this.state.term} onChange={(e) => this.setState({term: e.target.value})}/>
					</div>
				</form>
			</div>
		);
	}
}

export default SearchBar;