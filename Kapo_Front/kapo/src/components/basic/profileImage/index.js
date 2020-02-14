import React from 'react'

import './style.scss'

import defaultProfileImage from '../../../assets/user.png'

const ProfileImage = props => {
    return(
        <div className="profile-image___container">
            <div className="profile-image__image" style={{ backgroundImage: `url("${props.image ? props.image : defaultProfileImage}")` }} ></div>
        </div>
    )
}

export default ProfileImage