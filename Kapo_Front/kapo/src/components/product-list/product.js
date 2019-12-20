import React from 'react';
import {Dimmer, Image} from 'semantic-ui-react';
import './product-list.css';

class Product extends React.Component {
	state = {active: false}

	handleShow = () => this.setState({ active: false })
	handleHide = () => this.setState({ active: true })
	
	render() {
		return (
			<div className="ui special cards" style={{display: "inline"}}>
				<div className="card">
					<div onMouseLeave={this.handleShow} onMouseOver={this.handleHide}>
						<Dimmer.Dimmable dimmed={this.state.active}>
							<Dimmer active={this.state.active}>
								<div className="content">
									<div className="center">
										<a className="ui inverted button" href="http://google.com"
											style={{color: "#333", fontSize: "15px"}}>جزئیات</a>
									</div>
								</div>
							</Dimmer>
							<Image src={this.props.image}/>
						</Dimmer.Dimmable>
					</div>
					<div className="content">
						<a className="header" href="http://google.com">{this.props.title}</a>
						<div className="meta">
							<span className="date">{this.props.date}</span>
						</div>
					</div>
					<div className="extra content">
						<div>
							<i className="money icon" style={{marginLeft: "5px"}}></i>
							<p style={{display: "inline"}}>{this.props.price}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Product;