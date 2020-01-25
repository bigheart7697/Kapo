import React from 'react';

import './style.scss';

import ItemsColumn from '../itemsColumn';

class MegaDropDown extends React.Component {
    state = {name: '', categories: [], active: false, image: null}

    changeCategories = (props) => {
        this.setState({categories: props.categories, image: props.image, name: props.name})
        this.setState({active: true})
        this.refs.itemscolumn.changeCategories([])
    }

    changeDeActive = () => {
        this.setState({active: false})
        this.refs.itemscolumn.changeCategories([])
    }

    changeSubCategories = (categories) => {
        this.refs.itemscolumn.changeCategories(categories)
    }

    render() {
        return (
            <div
                className={this.state.active ? 'mega-drop-down__container mega-drop-down__container--active' : 'mega-drop-down__container mega-drop-down__container--hide'}>
                <div className={this.state.active ? 'mega-drop-down__content mega-drop-down__content--active' : 'mega-drop-down__content mega-drop-down__content--hide'}>
                    <div className="mega-drop-down__column mega-drop-down__column--background-hover">
                        {this.state.categories.map((element, index) => {
                            return (
                                <div key={1+2*index} className="mega-drop-down__column-header" 
                                    onMouseOver={() => this.changeSubCategories(element.categories)} 
                                    onMouseLeave={() => this.changeSubCategories(element.categories)}>{element.name}</div>
                            );
                        })}
                    </div>
                    <ItemsColumn ref='itemscolumn' categories={this.state.categories ? this.state.categories[0] ? this.state.categories[0].categories : [] : []}/>
                    <div className='mega-drop-down__column mega-drop-down__column--padding'>
                        <img src={this.state.image} alt={this.state.name} className='mega-drop-down__image'></img>
                    </div>
                </div>
            </div>
        );
    }
}

export default MegaDropDown;