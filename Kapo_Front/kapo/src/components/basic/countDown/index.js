import React from 'react';

import './style.scss';

const Completionist = () => <span className='count-down__finished'>به اتمام رسید!</span>;

const CountDown = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        return <Completionist />;
    } else {
        return(
            <div className='count-down__container'>
                <div className='count-down__section'>{days}</div>
                <div className='count-down__dots'>:</div>
                <div className='count-down__section'>{hours}</div>
                <div className='count-down__dots'>:</div>
                <div className='count-down__section'>{minutes}</div>
                <div className='count-down__dots'>:</div>
                <div className='count-down__section'>{seconds}</div>
            </div>
            
        );
    }
}

export default CountDown;