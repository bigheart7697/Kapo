import React from 'react';

import './style.scss'

const PersonDetails = (props) => {
    return (
        <div className='person-details__person-container'>
            <div className='person-details__person-title'>
                {props.title}
            </div>
            <div className='person-details__content'>
                <div className='person-details__row'>
                    <div className='person-details__element'>
                        <div className='person-details__element-title'>
                            نام: 
                        </div>
                        <div className='person-details__element-value' id={'person-details__name' + props.id}>
                            {props.person ? props.person.is_corporate ? props.person.corporate_name? props.person.corporate_name : '-' : props.person.first_name + " " + props.person.last_name  : '-'}
                        </div>
                    </div>
                    <div className='person-details__element'>
                        <div className='person-details__element-title'>
                            شناسه ملی/شماره ملی: 
                        </div>
                        <div className='person-details__element-value'>
                            {props.person ? props.person.corporate_number ? props.person.corporate_number : props.person.national_id : '-'}
                        </div>
                    </div>
                    <div className='person-details__element'>
                        <div className='person-details__element-title'>
                            شماره اقتصادی: 
                        </div>
                        <div className='person-details__element-value'>
                            {props.person ? props.person.corporate_economic_number ? props.person.corporate_economic_number : '-' : '-'}
                        </div>
                    </div>
                </div>
                <div className='person-details__row'>
                    <div className='person-details__element'>
                        <div className='person-details__element-title'>
                            آدرس: 
                        </div>
                        <div className='person-details__element-value'>
                            {props.person ? props.person.country + "، " + props.person.city + "، " + props.person.address : '-'}
                        </div>
                    </div>
                    <div className='person-details__element'>
                        <div className='person-details__element-title'>
                            تلفن: 
                        </div>
                        <div className='person-details__element-value'>
                            {props.person ? props.person.phone_number : '-'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonDetails;