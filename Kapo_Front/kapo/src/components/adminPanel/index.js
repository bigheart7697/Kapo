import React from 'react'

import './style.scss'

import DashboardBar from '../basic/dashboardBar'
import AccountReports from '../reports/accountReports'
import { fetchProducts, getAllUsers, getAllTransactions } from '../../actions'
import ProductReports from '../reports/productReports'
import TransactionReports from '../reports/transactionReports'
import { connect } from 'react-redux'
import MyBanners from "../MyBanners"
import MyCampaigns from "../MyCampaigns"
import MySponsors from "../MySponsors"

import userStatisticsImage from '../../assets/report.svg'
import productStatisticsImage from '../../assets/order.svg'
import businessStatisticsImage from '../../assets/graph.svg'
import _ from "lodash";

const DASHBOARD_ITEMS = [
    {
        text: "گزارش‌های آماری کاربران",
        image: userStatisticsImage
    },{
        text: "گزارش‌های آماری محصولات",
        image: productStatisticsImage
    },{
        text: "گزارش‌های آماری معاملات",
        image: businessStatisticsImage
    },{
        text: "لیست تمام بنرهای تبلغیاتی",
        image: userStatisticsImage
    },{
        text: "لیست تمام کمپین‌های تبلیغاتی",
        image: userStatisticsImage
    },{
        text: "لیست تمام جست‌وجوهای پیشرفته",
        image: userStatisticsImage
    }
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
        switch(this.state.activeTab){
            case 0:
                return(<AccountReports accounts={accountsList}/>)
            case 1:
                return(<ProductReports products={productsList}/>)
            case 2:
                return(<TransactionReports transactions={transactionssList} accounts={accountsList} />)
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