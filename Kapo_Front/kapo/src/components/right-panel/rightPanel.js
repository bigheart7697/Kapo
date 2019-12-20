import React from 'react';
import './right-panel.css';
import SearchBar from './searchbar';

class RightPanel extends React.Component {
	onSearchSubmit(term){
		console.log(term);
	}
	
	render() {
		return (
			<div className="ui massive vertical menu">
				<div className="item">
					<SearchBar onSubmit={this.onSearchSubmit} />
				</div>
				<a class="active item">
					<div class="ui small teal label floatLeft">1</div>
					Inbox
				 </a>
				 <a class="item">
					<div class="ui small label floatLeft">1</div>
					Inbox
				 </a>
				 <a class="item">
					<div class="ui small label floatLeft">1</div>
					Inbox
				 </a>
				 <a class="item">
					<div class="ui small label floatLeft">1</div>
					Inbox
				 </a>
			</div>
		);
	}
}

export default RightPanel;