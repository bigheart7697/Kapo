import React from 'react'

import './style.scss'

import DashboardBar from '../basic/dashboardBar'
import AccountReports from '../reports/accountReports'
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
        text: "سفارش‌های من",
        image: orderImage
    },{
        text: "آدرس‌های من",
        image: addressImage
    }
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
                return(<AccountReports/>)
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

const mapStateToProps = (state) => {
    return { accounts: state.user.all_accounts, products: state.products.products }
}

export default connect(mapStateToProps, { fetchProducts, getAllUsers })(AdminPanel);