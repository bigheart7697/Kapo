import React from 'react';
import { connect } from 'react-redux'
import { fetchMySponsors, fetchAllSponsors } from '../../actions'
import _ from "lodash";

import './style.scss'

import AdvertisementList from "../advertisementList"

class MySponsors extends React.Component {
    componentDidMount() {
        if (this.props.type == "mine"){
            this.props.fetchMySponsors()
        } else {
            this.props.fetchAllSponsors()
        }
        
    }
    render() {
        
        const newArray = _.map(this.props.sponsors, (item, key) => {
            return item
        })

        return (<>
            <AdvertisementList type="sponsor" advertisementList={newArray}/>
        </>)
    }
}



const mapStateToProps = (state) => {
    return { sponsors: state.advertisements.sponsors }
}

export default connect(mapStateToProps, { fetchMySponsors, fetchAllSponsors })(MySponsors)