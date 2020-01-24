import React from 'react';

import './style.scss';

class MegaDropDown extends React.Component {
    state = {categories: [], active: false}

    changeCategories = (props) => {
        this.setState({categories: props.categories})
        this.setState({active: true})
    }

    changeDeActive = () => {
        this.setState({active: false})
    }

    render() {
        return (
            <div
                className={this.state.active ? 'mega-drop-down__container mega-drop-down__container--active' : 'mega-drop-down__container mega-drop-down__container--hide'}>
                <div className={this.state.active ? 'mega-drop-down__content mega-drop-down__content--active' : 'mega-drop-down__content mega-drop-down__content--hide'}>
                    {this.state.categories.map((element, index) => {
                        return (
                            <div key={2*index} className="mega-drop-down__column">
                                <div key={1+2*index} className="mega-drop-down__column-header">{element.name}</div>
                                {element.categories.map((e, i) => {
                                    return <div key={-1-i} className="mega-drop-down__column-items">{e.name}</div>
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default MegaDropDown;