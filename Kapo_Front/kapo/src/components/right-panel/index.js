import React from 'react';
import './style.scss';

class RightPanel extends React.Component {
	onSearchSubmit(term){
		console.log(term);
	}
	
	render() {
		return (
			<div className="rightPanel__menu">
				<a className="rightPanel__item">
					<div className="rightPanel__counter">1</div>
					<div className="rightPanel__text">Inbox</div>
				 </a>
				 <a className="rightPanel__item">
					<div className="rightPanel__counter">1</div>
					<div className="rightPanel__text">Inbox</div>
				 </a>
				 <a className="rightPanel__item">
					<div className="rightPanel__counter">1</div>
					<div className="rightPanel__text">Inbox</div>
				 </a>
				 <a className="rightPanel__item">
					<div className="rightPanel__counter">1</div>
					<div className="rightPanel__text">Inbox</div>
				 </a>
			</div>
		);
	}
}

export default RightPanel;