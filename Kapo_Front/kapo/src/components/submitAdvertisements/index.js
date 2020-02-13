import React from 'react';

import './style.scss';

import SubmitSponseredSearch from "./sponseredSearch";
import SubmitAdvertisingBanners from "./advertisingBanners";
import SubmitAdvertisingCampaign from "./advertisingCampaigns";

class SubmitAdvertisements extends React.Component {
    state = {active: '1'}

    componentDidMount() {
        this.props.setMethod(this.change_active_state);
    }

    change_active_state = (active) => {
        this.setState({active})
        this.props.callChild(active)
    }

    render() {
        return (
            <div>
                <div className={`submit-advertisements__form-wrapper` + (this.state.active==='1' ? `` : ` submit-advertisements__form-wrapper--hidden`)}>
                    <SubmitSponseredSearch product={this.props.product}/>
                </div>
                <div className={`submit-advertisements__form-wrapper` + (this.state.active==='2' ? `` : ` submit-advertisements__form-wrapper--hidden`)}>
                    <SubmitAdvertisingBanners product={this.props.product}/>
                </div>
                <div className={`submit-advertisements__form-wrapper` + (this.state.active==='3' ? `` : ` submit-advertisements__form-wrapper--hidden`)}>
                    <SubmitAdvertisingCampaign product={this.props.product}/>
                </div>
            </div>
        );
    }
}

export default SubmitAdvertisements;