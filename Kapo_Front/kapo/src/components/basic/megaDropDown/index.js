import React from 'react';

import './style.scss';

import ItemsColumn from '../itemsColumn';

class MegaDropDown extends React.Component {
    state = {name: '', categories: [], active: false, image: null, inside: false, prefix1: '/ProductList/', prefix2: '', prefix3: ''}

    changeCategories = (props) => {
        this.setState({categories: props.categories, active: true, image: null})
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

    changeSubCategories = (categories, id, index) => {
        if (id==='1') {
            this.refs.itemscolumn1.changeActiveState(index);
            this.refs.itemscolumn2.changeCategories(categories.categories)
            this.refs.itemscolumn3.changeCategories([])
            this.refs.itemscolumn2.changeActiveState(-1);
            this.setState({image: categories.image, prefix2: this.state.prefix1 + categories.value + '/', prefix3: '/' + categories.value + '/'})
        } else if (id==='2') {
            this.refs.itemscolumn2.changeActiveState(index);
            this.refs.itemscolumn3.changeCategories(categories.categories)
            this.setState({prefix3: this.state.prefix2 + categories.value + '/'})
        }
    }

    render() {
        return (
            <div
                className={this.state.active || this.state.inside ? 'mega-drop-down__container mega-drop-down__container--active' : 'mega-drop-down__container mega-drop-down__container--hide'}>
                <div className={this.state.active || this.state.inside ? 'mega-drop-down__content mega-drop-down__content--active' : 'mega-drop-down__content mega-drop-down__content--hide'}>
                    <ItemsColumn onMouseOver={this.inside} onMouseLeave={this.outside} id='1' func={this.changeSubCategories} urlPrefix={this.state.prefix1 ? this.state.prefix1 : '/'}
                        ref='itemscolumn1' categories={this.state.categories ? this.state.categories[0] ? this.state.categories[0].categories : [] : []}/>
                    <ItemsColumn onMouseOver={this.inside} onMouseLeave={this.outside} id='2' func={this.changeSubCategories} urlPrefix={this.state.prefix2 ? this.state.prefix2 : '/'}
                        ref='itemscolumn2' categories={this.state.categories ? this.state.categories[0] ? this.state.categories[0].categories : [] : []}/>
                    <ItemsColumn onMouseOver={this.inside} onMouseLeave={this.outside} id='3' func={this.changeSubCategories} urlPrefix={this.state.prefix3 ? this.state.prefix3 : '/'}
                        ref='itemscolumn3' categories={this.state.categories ? this.state.categories[0] ? this.state.categories[0].categories : [] : []}/>
                </div>
            </div>
        );
    }
}

export default MegaDropDown;