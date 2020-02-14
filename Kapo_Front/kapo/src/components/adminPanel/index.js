import React from 'react'

import './style.scss'

import DashboardBar from '../basic/dashboardBar'
import AccountReports from '../reports/accountReports'
import { fetchProducts, getAllUsers, getAllTransactions } from '../../actions'
import ProductReports from '../reports/productReports'
import { connect } from 'react-redux'

import editImage from '../../assets/edit.svg'
import orderImage from '../../assets/order.svg'
import addressImage from '../../assets/address.svg'
import _ from "lodash";

const DASHBOARD_ITEMS = [
    {
        text: "گزارش‌های آماری کاربران",
        image: editImage
    },{
        text: "گزارش‌های آماری محصولات",
        image: orderImage
    },{
        text: "آدرس‌های من",
        image: addressImage
    }
]

const ACCOUNTS = [
    {id: 1, is_corporate: true, username: 'ali1', date_joined: '2020-02-13'},
    {id: 1, is_corporate: true, username: 'ali1', date_joined: '2020-02-13'},
    {id: 1, is_corporate: true, username: 'ali1', date_joined: '2020-02-12'},
    {id: 1, is_corporate: true, username: 'ali1', date_joined: '2020-02-12'},
    {id: 1, is_corporate: true, username: 'ali1', date_joined: '2020-02-12'},
    {id: 1, is_corporate: true, username: 'ali1', date_joined: '2020-02-11'},
    {id: 1, is_corporate: true, username: 'ali1', date_joined: '2020-02-10'},
    {id: 1, is_corporate: true, username: 'ali1', date_joined: '2020-02-10'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-02-10'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-02-09'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-02-09'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-02-07'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-02-07'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-02-07'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-02-06'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-02-03'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-02-02'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-02-02'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-02-01'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-01-30'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-01-29'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-01-29'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-01-29'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-01-29'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2019-07-29'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2019-07-29'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2019-05-29'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-02-02'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-02-02'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-02-01'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-01-30'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-01-29'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-01-29'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-01-29'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-01-29'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2019-07-29'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2019-07-29'},
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2019-05-29'},
]

const PRODUCTS = [
    {id: 1, first_category: 'ELECTRONICS', name: 'product1', created: '2020-02-14'},
    {id: 1, first_category: 'ELECTRONICS', name: 'product1', created: '2020-02-12'},
    {id: 1, first_category: 'ELECTRONICS', name: 'product1', created: '2020-02-11'},
    {id: 1, first_category: 'ELECTRONICS', name: 'product1', created: '2020-02-10'},
    {id: 1, first_category: 'ELECTRONICS', name: 'product1', created: '2020-02-09'},
    {id: 1, first_category: 'PERSONAL', name: 'product1', created: '2020-01-12'},
    {id: 1, first_category: 'PERSONAL', name: 'product1', created: '2020-02-07'},
    {id: 1, first_category: 'PERSONAL', name: 'product1', created: '2020-01-12'},
    {id: 1, first_category: 'BUSINESSES', name: 'product1', created: '2019-04-12'},
    {id: 1, first_category: 'BUSINESSES', name: 'product1', created: '2020-02-07'},
    {id: 1, first_category: 'BUSINESSES', name: 'product1', created: '2020-02-07'},
    {id: 1, first_category: 'BUSINESSES', name: 'product1', created: '2020-02-12'},
    {id: 1, first_category: 'BUSINESSES', name: 'product1', created: '2020-02-08'},
    {id: 1, first_category: 'BUSINESSES', name: 'product1', created: '2020-02-09'},
    {id: 1, first_category: 'BUSINESSES', name: 'product1', created: '2020-02-01'},
    {id: 1, first_category: 'BUSINESSES', name: 'product1', created: '2019-04-02'},
    {id: 1, first_category: 'BUSINESSES', name: 'product1', created: '2019-04-03'},
    {id: 1, first_category: 'BUSINESSES', name: 'product1', created: '2019-04-12'},
    {id: 1, first_category: 'BUSINESSES', name: 'product1', created: '2019-04-04'},
    {id: 1, first_category: 'VEHICLE', name: 'product1', created: '2020-05-12'},
    {id: 1, first_category: 'VEHICLE', name: 'product1', created: '2020-02-05'},
    {id: 1, first_category: 'VEHICLE', name: 'product1', created: '2019-04-06'},
    {id: 1, first_category: 'VEHICLE', name: 'product1', created: '2020-05-12'},
    {id: 1, first_category: 'VEHICLE', name: 'product1', created: '2020-02-06'},
    {id: 1, first_category: 'HOME', name: 'product1', created: '2020-02-06'},
    {id: 1, first_category: 'HOME', name: 'product1', created: '2020-02-06'},
    {id: 1, first_category: 'LEISURE', name: 'product1', created: '2010-02-08'},
    {id: 1, first_category: 'LEISURE', name: 'product1', created: '2010-05-12'},
    {id: 1, first_category: 'LEISURE', name: 'product1', created: '2010-02-08'},
    {id: 1, first_category: 'LEISURE', name: 'product1', created: '2019-04-12'},
    {id: 1, first_category: 'LEISURE', name: 'product1', created: '2010-02-14'},
    {id: 1, first_category: 'LEISURE', name: 'product1', created: '2010-05-12'},
    {id: 1, first_category: 'LEISURE', name: 'product1', created: '2010-02-14'},
]

class AdminPanel extends React.Component{
    state={ activeTab: 0 }

    componentDidMount() {
        this.props.fetchProducts();
        this.props.getAllUsers();
        this.props.getAllTransactions();
    }

    changeActiveTab = (tab) => {
        this.setState({ activeTab: tab })
    }
    renderContent = () => {
        switch(this.state.activeTab){
            case 0:
                return(<AccountReports accounts={ACCOUNTS}/>)
            case 1:
                return(<ProductReports products={PRODUCTS}/>)
            case 2:
                return(<div>My Locations</div>)
            default:
                return(<div>Default</div>)
        }
    }
    render(){
        const accountsList = _.map(this.props.accounts, (item, key) => {
            return item
        })
        const productsList = _.map(this.props.products, (item, key) => {
            return item
        })
        const transactionssList = _.map(this.props.transactions, (item, key) => {
            return item
        })
        return(
            <div className="dashboard__container">
                <DashboardBar activeTab={this.state.activeTab} changeActiveTab={this.changeActiveTab} content={DASHBOARD_ITEMS}/>
                <div className="dashboard__content">
                    {this.renderContent()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { accounts: state.user.all_accounts, products: state.products.products, transactions: state.advertisements.transactions }
}

export default connect(mapStateToProps, { fetchProducts, getAllUsers, getAllTransactions })(AdminPanel);