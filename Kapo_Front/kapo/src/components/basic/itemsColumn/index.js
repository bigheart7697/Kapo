import React from 'react';

import './style.scss';

class ItemsColumn extends React.Component {
    state = {categories: []}

    changeCategories = (categories) => {
        this.setState({categories: categories})
    }

    render() {
        return (
            <div className='mega-drop-down__column'>
                {this.state.categories.map((e, index) => {
                    return <div className='items-column__item' key={index}>{e.name}</div>
                })}
            </div> 
        );
    }
}

export default ItemsColumn;