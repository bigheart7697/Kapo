import React from 'react'

import './style.scss'

const Page404 = (props) => {
    const description = 'صفحه مورد نظر یافت نشد';

    if (props.code) {
        switch(props.code) {
            case '404':
                description = 'صفحه مورد نظر یافت نشد';
            case '403':
                description = 'شما اجازه ورود به این صفحه را ندارید';
            case '401':
                description = 'شما شناسایی نشده اید';
            case '400':
                description = 'مشکلی در درخواست شما وجود دارد';
            case '500':
                description = 'مشکلی در سرور به وجود آمده است. لطفا مجددا تلاش کنید';
        }
    }

    return (
        <div>
            <div className='error-page'>
                <div>
                    <h1 data-h1={props.code ? props.code : 404}>{props.code ? props.code : 404}</h1>
                    <p data-p={description}>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default Page404;