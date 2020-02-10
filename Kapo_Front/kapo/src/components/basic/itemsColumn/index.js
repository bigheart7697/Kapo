import React from 'react';
import { NavLink } from 'react-router-dom'

import './style.scss';

class ItemsColumn extends React.Component {
    state = {categories: [], activeState: -1}

    changeCategories = (categories) => {
        this.setState({categories: categories})
    }

    categorySelected = (category, index) => {
        if(this.props.func) {
            this.props.func(category, this.props.id, index)
        }
    }

    changeActiveState(activeState) {
        this.setState({activeState: activeState})
    }

    render() {
        return (
            <div className='mega-drop-down__column' onMouseOver={this.props.onMouseOver} onMouseLeave={this.props.onMouseLeave}>
                {this.state.categories ? this.state.categories.map((e, index) => {
                    if(this.state.activeState === index) {
                        return <div className='items-column__item items-column__item--active' key={index} onMouseOver={() => this.categorySelected(e, index)}><a href={this.props.urlPrefix ? this.props.urlPrefix + e.value : '/' + e.value}>{e.text}</a></div>
                    } else {
                        return <div className='items-column__item' key={index} onMouseOver={() => this.categorySelected(e, index)}><a href={this.props.urlPrefix ? this.props.urlPrefix + e.value : '/' + e.value}>{e.text}</a></div>
                    }
                }) : <div></div>}
            </div> 
        );
    }
}

export default ItemsColumn;