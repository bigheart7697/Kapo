import React from 'react';

import './style.scss';

import ToPersianNum from '../../basic/toPersianNum'

const Completionist = () => <span className='count-down__finished'>به اتمام رسید!</span>;

const CountDown = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        return <Completionist />;
    } else {
        return(
            <div className='count-down__container'>
                <div className='count-down__section'>{ToPersianNum(days)}</div>
                <div className='count-down__dots'>:</div>
                <div className='count-down__section'>{ToPersianNum(hours)}</div>
                <div className='count-down__dots'>:</div>
                <div className='count-down__section'>{ToPersianNum(minutes)}</div>
                <div className='count-down__dots'>:</div>
                <div className='count-down__section'>{ToPersianNum(seconds)}</div>
            </div>
            
        );
    }
}

export default CountDown;