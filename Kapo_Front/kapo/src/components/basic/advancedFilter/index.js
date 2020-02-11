import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchCategoryHierarchy } from '../../../actions'

import './style.scss'

import CustomRangeSlider from '../customRangeSlider'
import CustomReactSwitch from '../customReactSwitch'
import CustomSelect from '../customSelect'

const sth = [{text: 'sth', label: 'sth new'}, {text: 'sth1', label: 'sth1 new'}, {text: 'sth2', label: 'sth2 new'}]

class AdvancedFilter extends React.Component{
    state = {cat1: null, cat2: null, cat3: null}
    componentDidMount(){
        this.props.fetchCategoryHierarchy()
    }
    render(){
        let categories1 = [], categories2 = [], categories3 =[]
        if(this.props.categories){
            this.props.categories.forEach((category) => {
                categories1.push({ text: category.name, label: category.value, categories: category.categories })
            })
        }
        if(this.props.categories1){
            categories1.categories.forEach((category) => {
               categories2.push({ text: category.name, label: category.value, categories: category.categories }) 
            })
        }
        if(this.props.categories2){
            categories2.categories.forEach((category) => {
               categories3.push({ text: category.name, label: category.value, categories: category.categories }) 
            })
        }
        return(<div className="advanced-filter__container">
            <div className="advanced-filter__content">
                <div className="advanced-filter__field">
                    <CustomRangeSlider min={0} max={100} header="بازه قیمت"/>
                </div>
                <div className="advanced-filter__field">
                    <CustomRangeSlider min={0} max={100} header="سال تولید"/>
                </div>
                <div className="advanced-filter__field">
                    <CustomRangeSlider min={0} max={100} header="تعداد موجود"/>
                </div>
                <div className="advanced-filter__field">
                    <CustomReactSwitch label="فقط کالا‌های دسته دوم"/>
                </div>
                {/* TODO inputs should be fixed */}
                <div className="advanced-filter__field">
                    <CustomSelect name='cat1' label='دسته اول' content={categories1} full normal/>
                </div>
                <div>
                    <CustomSelect name='cat2' label='دسته دوم' content={categories2} full normal/>
                </div>
                <div>
                    <CustomSelect name='cat3' label='دسته سوم' content={categories3} full normal/>
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

export default connect(mapStateToProps, { fetchCategoryHierarchy })(AdvancedFilter)