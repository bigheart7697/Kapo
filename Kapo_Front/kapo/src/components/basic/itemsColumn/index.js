import React from 'react';

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
                        return <div className='items-column__item items-column__item--active' key={index} onMouseOver={() => this.categorySelected(e, index)}>{e.name}</div>
                    } else {
                        return <div className='items-column__item' key={index} onMouseOver={() => this.categorySelected(e, index)}>{e.name}</div>
                    }
                }) : <div></div>}
            </div> 
        );
    }
}

export default ItemsColumn;