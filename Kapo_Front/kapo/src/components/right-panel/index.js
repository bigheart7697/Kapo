import React from 'react';
import './style.scss';

class RightPanel extends React.Component {
	onSearchSubmit(term){
		console.log(term);
	}
	
	render() {
		return (
			<div className="rightPanel__menu">
				<a className="rightPanel__item" href="/">
					<div className="rightPanel__counter">10</div>
					<div className="rightPanel__text">محصولات</div>
				 </a>
			</div>
		);
	}
}

export default RightPanel;