import React from 'react'

import './style.scss'

import DashboardBar from '../basic/dashboardBar'
import EditProfile from '../editProfile'
import MyOrders from "../MyOrders"
import MYProductList from "../myProductList"
import MyBanners from "../MyBanners"
import MyCampaigns from "../MyCampaigns"
import MySponsors from "../MySponsors"
import ProfilesAccount from '../profilesAccount'
import AdvertisingBanner from '../advertisingBanner'

import editImage from '../../assets/edit.svg'
import orderImage from '../../assets/order.svg'
import addressImage from '../../assets/address.svg'

const DASHBOARD_ITEMS = [
    {
        text: "ویرایش پروفایل",
        image: editImage
    },{
        text: "سفارش‌های من",
        image: orderImage
    },{
        text: "کالاهای من",
        image: addressImage
    },{
        text: "بنرهای تبلیغاتی من",
        image: addressImage
    },{
        text: "کمپین‌های تبلیغاتی من",
        image: addressImage
    },{
        text: "جست‌وجوهای پیشرفته من",
        image: addressImage
    },{
        text: "حساب",
        image: addressImage
    }
]

class Dashboard extends React.Component{
    state={ activeTab: 0 }
    changeActiveTab = (tab) => {
        this.setState({ activeTab: tab })
    }
    renderContent = () => {
        switch(this.state.activeTab){
            case 0:
                return(<EditProfile/>)
            case 1:
                return(<MyOrders/>)
            case 2:
                return(<MYProductList/>)
            case 3:
                return(<MyBanners type="mine"/>)
            case 4:
                return(<MyCampaigns type="mine"/>)
            case 5:
                return(<MySponsors type="mine"/>)
            case 6:
                return(<ProfilesAccount/>)
            default:
                return(<div>Default</div>)
        }
    }
    render(){
        return(
            <>
                <AdvertisingBanner />
                <div className="dashboard__container">
                    <DashboardBar activeTab={this.state.activeTab} changeActiveTab={this.changeActiveTab} content={DASHBOARD_ITEMS}/>
                    <div className="dashboard__content">
                        {this.renderContent()}
                    </div>
                </div>
            </>
        )
    }
}

export default Dashboard