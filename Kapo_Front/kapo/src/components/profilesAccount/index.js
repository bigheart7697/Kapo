import React from 'react'

import './style.scss'

import ChargeAccount from '../chargeAccount'
import Whitespace from '../basic/whitespace'


class ProfilesAccount extends React.Component {
    render() {
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
                                120000
                            </div>
                        </div>
                    </div>
                </div>
                <div className='profiles-account__section'><ChargeAccount /></div>
            </div>
        )
    }
}

export default ProfilesAccount;