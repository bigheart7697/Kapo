import React from 'react';

import './style.scss';

import ItemsColumn from '../itemsColumn';

class MegaDropDown extends React.Component {
    state = {name: '', categories: [], active: false, image: null, inside: false}

    changeCategories = (props) => {
        this.setState({categories: props.categories})
        this.setState({active: true})
        this.refs.itemscolumn1.changeCategories(props.categories)
        this.refs.itemscolumn2.changeCategories([])
        this.refs.itemscolumn3.changeCategories([])
    }

    changeDeActive = () => {
        this.setState({active: false})
    }

    inside = () => {
        this.setState({inside: true})
    }

    outside = () => {
        this.setState({inside: false})
    }

    changeSubCategories = (categories) => {
        this.refs.itemscolumn.changeCategories(categories)
    }

    render() {
        return (
            <div
                className={this.state.active || this.state.inside ? 'mega-drop-down__container mega-drop-down__container--active' : 'mega-drop-down__container mega-drop-down__container--hide'}>
                <div className={this.state.active || this.state.inside ? 'mega-drop-down__content mega-drop-down__content--active' : 'mega-drop-down__content mega-drop-down__content--hide'}>
                    <ItemsColumn onMouseOver={this.inside} onMouseLeave={this.outside}
                        ref='itemscolumn1' categories={this.state.categories ? this.state.categories[0] ? this.state.categories[0].categories : [] : []}/>
                    <ItemsColumn onMouseOver={this.inside} onMouseLeave={this.outside}
                        ref='itemscolumn2' categories={this.state.categories ? this.state.categories[0] ? this.state.categories[0].categories : [] : []}/>
                    <ItemsColumn onMouseOver={this.inside} onMouseLeave={this.outside} 
                        ref='itemscolumn3' categories={this.state.categories ? this.state.categories[0] ? this.state.categories[0].categories : [] : []}/>
                    <div className='mega-drop-down__column mega-drop-down__column--padding'>
                        <img src={this.state.image} alt={this.state.name} className='mega-drop-down__image'></img>
                    </div>
                </div>
            </div>
        );
    }
}

export default MegaDropDown;