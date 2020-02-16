import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchCategoryHierarchy, searchProducts } from '../../../actions'

import './style.scss'

import CustomRangeSlider from '../customRangeSlider'
import CustomReactSwitch from '../customReactSwitch'
import CustomSelect from '../customSelect'
import CustomButton from '../customButton'
import AdvancedSorting from '../advancedSorting'

class AdvancedFilter extends React.Component{
    state = {priceRange: null, productionYearRange: null, quantityRange: null, secondHandOnly: false, cat1: null, cat2: null, cat3: null, activeSort: 0, direction: 0}
    componentDidMount(){
        this.props.fetchCategoryHierarchy()
    }
    filterRequest = () => {
       let order = null
       let direction = ''
        if(this.state.activeSort == 0){
            order = 'price'
        }else if(this.state.activeSort == 1){
            order = 'production_year'
        }else{
            order = 'create'
        }
       if(this.state.direction == 0){
           direction = '-'
       }
       this.props.searchProducts(null, null, {'cat1' : this.state.cat1,'cat2': this.state.cat2, 'cat3': this.state.cat3, 'production_year': this.state.productionYearRange[0], 'second_hand': this.state.secondHandOnly, 'price_range_min': this.state.priceRange[0], 'price_range_max': this.state.priceRange[1], 'quantity_range_min': this.state.quantityRange[0], 'quantity_range_max': this.state.quantityRange[1], 'ordering': direction + order})
    }
    render(){
        let categories1 = [], categories2 = [], categories3 =[]
        if(this.props.categories){
            this.props.categories.forEach((category) => {
                categories1.push({ text: category.name, label: category.text ,value: category.value, categories: category.categories })
            })
            let searchedValue = searchValue(this.state.cat1, categories1)
            if(searchedValue){
                searchedValue.categories.forEach((category) => {
                    categories2.push({ text: category.name, label: category.text, value: category.value, categories: category.categories }) 
                })
            }
            searchedValue = searchValue(this.state.cat2, categories2)
            if(searchedValue){
                searchedValue.categories.forEach((category) => {
                    categories3.push({ text: category.name, label: category.text, value: category.value, categories: category.categories }) 
                })
            }
        }
        return(<div className="advanced-filter__container">
            <div className="advanced-filter__content">
                <div className="advanced-filter__header">فیلتر</div>
                <div className="advanced-filter__field">
                    <CustomRangeSlider min={0} max={100} header="بازه قیمت" syncState={(range) => { if(this.state.priceRange != range){this.setState({ priceRange: range })} }}/>
                </div>
                <div className="advanced-filter__field">
                    <CustomRangeSlider min={1900} max={2020} header="سال تولید" syncState={(range) => { if(this.state.productionYearRange != range){this.setState({ productionYearRange: range })} }}/>
                </div>
                <div className="advanced-filter__field">
                    <CustomRangeSlider min={0} max={100} header="تعداد موجود" syncState={(range) => { if(this.state.quantityRange != range){this.setState({ quantityRange: range })} }}/>
                </div>
                <div className="advanced-filter__field">
                    <CustomReactSwitch label="فقط کالا‌های دسته دوم" handleChange={(checked) => {this.setState({secondHandOnly: checked})}} checked={this.state.secondHandOnly}/>
                </div>
                {/* TODO inputs should be fixed */}
                <div className="advanced-filter__field">
                    <CustomSelect name='cat1' label='دسته اول' content={categories1} onChange={(e) => {e.persist(); this.setState({ cat1: e.target.value, cat2: null, cat3: null })}} full normal/>
                </div>
                <div>
                    <CustomSelect name='cat2' label='دسته دوم' content={categories2} onChange={(e) => {e.persist(); this.setState({ cat2: e.target.value, cat3: null })}} full normal/>
                </div>
                <div>
                    <CustomSelect name='cat3' label='دسته سوم' content={categories3} onChange={(e) => {e.persist(); this.setState({ cat3: e.target.value })}} full normal/>
                </div>
                <div className="advanced-filter__header">مرتب‌سازی</div>
                <AdvancedSorting syncState={(sort, direction) => {if(this.state.activeSort != sort || this.state.direction != direction){ this.setState({ activeSort: sort, direction: direction }) }}}/>
                <div className="advanced-filter__button">
                    <CustomButton text="اعمال فیلتر" onClick={this.filterRequest}></CustomButton>
                </div>    
            </div>
        </div>)
    }
}

const mapStateToProps = state => {
    return(
        { categories: state.products.category_hierarchy ? state.products.category_hierarchy.categories : null }
    )
}

const searchValue = (value, myArray) => {
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].value === value) {
            return myArray[i];
        }
    }
    return null
}

export default connect(mapStateToProps, { fetchCategoryHierarchy, searchProducts })(AdvancedFilter)