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
import {fetchFirstBanners} from "../../actions"
import { connect } from "react-redux";
import AdvertisingBanner from '../advertisingBanner'
import _ from "lodash";

import editImage from '../../assets/edit.svg'
import orderImage from '../../assets/order.svg'
import ordersImage from '../../assets/item.svg'
import adImage from '../../assets/ad.svg'
import dmImage from '../../assets/dm.svg'
import searchImage from '../../assets/search.svg'
import walletImage from '../../assets/money.svg'

const DASHBOARD_ITEMS = [
    {
        text: "ویرایش پروفایل",
        image: editImage
    },{
        text: "سفارش‌های من",
        image: orderImage
    },{
        text: "کالاهای من",
        image: ordersImage
    },{
        text: "بنرهای تبلیغاتی من",
        image: adImage
    },{
        text: "کمپین‌های تبلیغاتی من",
        image: dmImage
    },{
        text: "جست‌وجوهای اسپانسر شده‌ی من",
        image: searchImage
    },{
        text: "حساب",
        image: walletImage
    }
]

class Dashboard extends React.Component{
    index = 0
    state={ activeTab: 0, index: 0, banners: [] }
    changeActiveTab = (tab) => {
        this.setState({ activeTab: tab })
    }

    componentDidMount() {
        this.props.fetchFirstBanners();
        this.setState({index: Math.random()})
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
        const bannerIndex = Math.floor(this.state.index * this.props.first_banners.length)
        return(
            <>
                {this.props.first_banners[bannerIndex] ? <AdvertisingBanner product={{link: `/product/${this.props.first_banners[bannerIndex].product.id}` ,image: this.props.first_banners[bannerIndex].product.image, name: this.props.first_banners[bannerIndex].product.name, moto: this.props.first_banners[bannerIndex].slogan, price: this.props.first_banners[bannerIndex].product.price}}/> : 
        null}
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

const mapStatToProps = (state, ownProps) => {
    return { product: ownProps.match? state.products.products[ownProps.match.params.id] : null, 
      first_banners: _.map(state.advertisements.first_banners, (item, key) => {
        return item
    })}
  }
  
  export default connect(mapStatToProps, { fetchFirstBanners })(Dashboard);
  