import React from 'react';
import { connect } from 'react-redux'
import { fetchMyBanners, fetchAllBanners } from '../../actions'
import _ from "lodash";

import './style.scss'

import AdvertisementList from "../advertisementList"

class MyBanners extends React.Component {
    componentDidMount() {
        if (this.props.type === "mine"){
            this.props.fetchMyBanners()
        } else {
            this.props.fetchAllBanners()
        }
        
    }
    render() {
        
        const newArray = _.map(this.props.banners, (item, key) => {
            return item
        })

        return (<>
            <AdvertisementList type="banner" advertisementList={newArray}/>
        </>)
    }
}



const mapStateToProps = (state) => {
    return { banners: state.advertisements.banners }
}

export default connect(mapStateToProps, { fetchMyBanners, fetchAllBanners })(MyBanners)