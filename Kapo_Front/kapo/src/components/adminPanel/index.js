import React from 'react'

import './style.scss'

import DashboardBar from '../basic/dashboardBar'
import AccountReports from '../reports/accountReports'
import ProductReports from '../reports/productReports'
import TransactionReports from '../reports/transactionReports'
import { fetchProducts, getAllUsers } from '../../actions'
import { connect } from 'react-redux'

import editImage from '../../assets/edit.svg'
import orderImage from '../../assets/order.svg'
import addressImage from '../../assets/address.svg'

const DASHBOARD_ITEMS = [
    {
        text: "گزارش‌های آماری کاربران",
        image: editImage
    },{
        text: "گزارش‌های آماری محصولات",
        image: orderImage
    },{
        text: "گزارش‌های آماری معاملات",
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

const TRANSACTION_TYPES = [
    'SPONSOR', 'BANNER', 'CAMPAIGN', 'ORDER', 'INCREASE_BALANCE', 'LIQUIDATE'
]

const TRANSACTIONS = [
    {id: 1, type: 'SPONSOR', amount: 12000, created: '2020-02-14'},
    {id: 1, type: 'SPONSOR', amount: 22000, created: '2020-02-12'},
    {id: 1, type: 'SPONSOR', amount: 32000, created: '2020-02-10'},
    {id: 1, type: 'SPONSOR', amount: 42000, created: '2020-02-06'},
    {id: 1, type: 'SPONSOR', amount: 52000, created: '2020-02-02'},
    {id: 1, type: 'BANNER', amount: 12000, created: '2020-02-14'},
    {id: 1, type: 'BANNER', amount: 10000, created: '2020-02-13'},
    {id: 1, type: 'BANNER', amount: 2000, created: '2020-02-12'},
    {id: 1, type: 'BANNER', amount: 11000, created: '2020-02-03'},
    {id: 1, type: 'BANNER', amount: 1000, created: '2020-01-19'},
    {id: 1, type: 'BANNER', amount: 2000, created: '2020-01-16'},
    {id: 1, type: 'BANNER', amount: 200000, created: '2020-01-14'},
    {id: 1, type: 'BANNER', amount: 2000, created: '2019-09-13'},
    {id: 1, type: 'CAMPAIGN', amount: 120000, created: '2020-02-05'},
    {id: 1, type: 'CAMPAIGN', amount: 120000, created: '2020-01-01'},
    {id: 1, type: 'ORDER', amount: 12000, created: '2020-02-14'},
    {id: 1, type: 'ORDER', amount: 1000, created: '2020-02-05'},
    {id: 1, type: 'ORDER', amount: 100000, created: '2020-02-04'},
    {id: 1, type: 'ORDER', amount: 42000, created: '2020-01-01'},
    {id: 1, type: 'INCREASE_BALANCE', amount: 1000, created: '2020-02-14'},
    {id: 1, type: 'INCREASE_BALANCE', amount: 1000, created: '2020-02-13'},
    {id: 1, type: 'INCREASE_BALANCE', amount: 10000, created: '2020-02-12'},
    {id: 1, type: 'INCREASE_BALANCE', amount: 1000, created: '2020-02-11'},
    {id: 1, type: 'INCREASE_BALANCE', amount: 10000, created: '2020-02-10'},
    {id: 1, type: 'INCREASE_BALANCE', amount: 14000, created: '2020-02-08'},
    {id: 1, type: 'LIQUIDATE', amount: 100, created: '2020-02-14'},
    {id: 1, type: 'LIQUIDATE', amount: 100, created: '2020-02-12'},
    {id: 1, type: 'LIQUIDATE', amount: 100, created: '2020-02-11'},
    {id: 1, type: 'LIQUIDATE', amount: 100, created: '2020-02-05'},
    {id: 1, type: 'LIQUIDATE', amount: 100, created: '2020-02-01'},
]

class AdminPanel extends React.Component{
    state={ activeTab: 0 }

    componentDidMount() {
        this.props.fetchProducts();
        this.props.getAllUsers();
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
                return(<TransactionReports transactions={TRANSACTIONS} />)
            default:
                return(<div>Default</div>)
        }
    }
    render(){
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
    return { accounts: state.user.all_accounts, products: state.products.products }
}

export default connect(mapStateToProps, { fetchProducts, getAllUsers })(AdminPanel);