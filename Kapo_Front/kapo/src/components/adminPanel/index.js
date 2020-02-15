import React from 'react'

import './style.scss'

import DashboardBar from '../basic/dashboardBar'
import AccountReports from '../reports/accountReports'
import { fetchProducts, getAllUsers, getAllTransactions } from '../../actions'
import ProductReports from '../reports/productReports'
import TransactionReports from '../reports/transactionReports'
import { connect } from 'react-redux'
import AdvertisementList from '../advertisementList'
import MyBanners from "../MyBanners"
import MyCampaigns from "../MyCampaigns"
import MySponsors from "../MySponsors"

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
        text: "گزارش‌های آماری معاملات",
        image: addressImage
    },{
        text: "لیست تمام بنرهای تبلغیاتی",
        image: addressImage
    },{
        text: "لیست تمام کمپین‌های تبلیغاتی",
        image: addressImage
    },{
        text: "لیست تمام جست‌وجوهای پیشرفته",
        image: addressImage
    }
]

const ACCOUNTS = [
    {id: 1, is_corporate: true, username: 'ali1', corporate_name: 'ali1', date_joined: '2020-02-13'},
    {id: 2, is_corporate: true, username: 'ali2', corporate_name: 'ali2', date_joined: '2020-02-13'},
    {id: 3, is_corporate: true, username: 'ali3', corporate_name: 'ali3', date_joined: '2020-02-12'}
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
    1, 2, 3, 4, 5, 6
]

const TRANSACTIONS = [
    {id: 1, type: 1, amount: 12000, created: '2020-02-14', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 1, amount: 22000, created: '2020-02-12', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 1, amount: 32000, created: '2020-02-10', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 1, amount: 42000, created: '2020-02-06', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 1, amount: 52000, created: '2020-02-02', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 2, amount: 12000, created: '2020-02-14', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 2, amount: 10000, created: '2020-02-13', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 2, amount: 2000, created: '2020-02-12', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 2, amount: 11000, created: '2020-02-03', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 2, amount: 1000, created: '2020-01-19', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 2, amount: 2000, created: '2020-01-16', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 2, amount: 200000, created: '2020-01-14', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 2, amount: 2000, created: '2019-09-13', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 3, amount: 120000, created: '2020-02-05', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 3, amount: 120000, created: '2020-01-01', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 4, amount: 12000, created: '2020-02-14', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 4, amount: 1000, created: '2020-02-05', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 4, amount: 100000, created: '2020-02-04', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 4, amount: 42000, created: '2020-01-01', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 5, amount: 1000, created: '2020-02-14', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 5, amount: 1000, created: '2020-02-13', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 5, amount: 10000, created: '2020-02-12', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 5, amount: 1000, created: '2020-02-11', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 5, amount: 10000, created: '2020-02-10', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 5, amount: 14000, created: '2020-02-08', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 6, amount: 100, created: '2020-02-14', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 6, amount: 100, created: '2020-02-12', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 6, amount: 100, created: '2020-02-11', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 6, amount: 100, created: '2020-02-05', sender: {id: 1}, receiver: {id: 2}},
    {id: 1, type: 6, amount: 100, created: '2020-02-01', sender: {id: 1}, receiver: {id: 2}},
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
        const accountsList = _.map(this.props.accounts, (item) => {
            return item
        })
        const productsList = _.map(this.props.products, (item) => {
            return item
        })
        const transactionssList = _.map(this.props.transactions, (item) => {
            return item
        })
        console.log('here', transactionssList)
        switch(this.state.activeTab){
            case 0:
                return(<AccountReports accounts={accountsList}/>)
            case 1:
                return(<ProductReports products={productsList}/>)
            case 2:
                return(<TransactionReports transactions={TRANSACTIONS} accounts={ACCOUNTS} />)
            case 3:
                return(<MyBanners type="all"/>)
            case 4:
                return(<MyCampaigns type="all"/>)
            case 5:
                return(<MySponsors type="all"/>)
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
    return { accounts: state.user.all_accounts, products: state.products.products, transactions: state.advertisements.transactions }
}

export default connect(mapStateToProps, { fetchProducts, getAllUsers, getAllTransactions })(AdminPanel);