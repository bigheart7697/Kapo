import React from 'react'

import './style.scss'
import { NavLink } from 'react-router-dom';

const LinkToBank = props => {
    return (
        <div className="link-to-bank__payment">
            <div className="link-to-bank__one-third-container">
                <div className="link-to-bank__title">انتخاب روش پرداخت</div>
            </div>
            <div className="link-to-bank__one-third-container">
                <div className="link-to-bank__input">
                    <input name="bank" type="radio" checked={true}></input> 
                    <div className="link-to-bank__input-label">بانک صدارات</div>
                </div>
                <div className="link-to-bank__input">
                    <input name="bank" type="radio"></input> 
                    <div className="link-to-bank__input-label">بانک شتاب</div>
                </div>
            </div>
            <div className="link-to-bank__one-third-container">
                <div className="link-to-bank__button"><NavLink to={"/bank/" + props.id}>انتقال به درگاه بانک</NavLink></div>
            </div>
        </div>
    );
}

export default LinkToBank;