import React from 'react';
import { connect } from 'react-redux'
import { fetchMyCampaigns, fetchAllCampaigns } from '../../actions'
import _ from "lodash";

import './style.scss'

import AdvertisementList from "../advertisementList"

class MyCampaigns extends React.Component {
    componentDidMount() {
        if (this.props.type == "mine"){
            this.props.fetchMyCampaigns()
        } else {
            this.props.fetchAllCampaigns()
        }
        
    }
    render() {
        
        const newArray = _.map(this.props.campaigns, (item, key) => {
            return item
        })

        return (<>
            <AdvertisementList type="campaign" advertisementList={newArray}/>
        </>)
    }
}



const mapStateToProps = (state) => {
    return { campaigns: state.advertisements.campaigns }
}

export default connect(mapStateToProps, { fetchMyCampaigns, fetchAllCampaigns })(MyCampaigns)