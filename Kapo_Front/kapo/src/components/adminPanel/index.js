import React from 'react'

import './style.scss'

import DashboardBar from '../basic/dashboardBar'
import AccountReports from '../reports/accountReports'

import editImage from '../../assets/edit.svg'
import orderImage from '../../assets/order.svg'
import addressImage from '../../assets/address.svg'

const DASHBOARD_ITEMS = [
    {
        text: "گزارش‌های آماری کاربران",
        image: editImage
    },{
        text: "سفارش‌های من",
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
    {id: 1, is_corporate: false, username: 'ali1', date_joined: '2020-01-29'}
]

class AdminPanel extends React.Component{
    state={ activeTab: 0 }
    changeActiveTab = (tab) => {
        this.setState({ activeTab: tab })
    }
    renderContent = () => {
        switch(this.state.activeTab){
            case 0:
                return(<AccountReports accounts={ACCOUNTS}/>)
            case 1:
                return(<div>My Orders</div>)
            case 2:
                return(<div>My Locations</div>)
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

export default AdminPanel;