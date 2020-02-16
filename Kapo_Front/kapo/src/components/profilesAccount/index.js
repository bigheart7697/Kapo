import React from 'react'

import './style.scss'

import ChargeAccount from '../chargeAccount'
import Whitespace from '../basic/whitespace'
import { connect } from 'react-redux'
import {getCurrentUser} from "../../actions"


class ProfilesAccount extends React.Component {
    render() {
        this.props.getCurrentUser()
        return (
            <div className='profiles-account__container'>
                <div className='profiles-account__section'>
                    <div className='form-wrapper__container'>
                        <div className='form-wrapper__form'>
                            <div className='form__title'>
                                مقدار فعلی حساب شما:
                            </div>
                            <Whitespace space="2"/>
                            <div className='form__title'>
                                {this.props.balance}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='profiles-account__section'><ChargeAccount /></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { balance: state.user.information.balance }
}

export default connect(mapStateToProps, { getCurrentUser })(ProfilesAccount)