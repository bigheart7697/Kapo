import React from 'react'

import './style.scss'

const describe = (code) => {
    switch(code) {
        case '404':
            return 'صفحه مورد نظر یافت نشد';
        case '403':
            return 'شما اجازه ورود به این صفحه را ندارید';
        case '401':
            return 'شما شناسایی نشده اید';
        case '400':
            return 'مشکلی در درخواست شما وجود دارد';
        case '500':
            return 'مشکلی در سرور به وجود آمده است. لطفا مجددا تلاش کنید';
    }
}

const Page404 = (props) => {
    return (
        <div>
            <div className='error-page'>
                <div>
                    <h1 data-h1={props.code ? props.code : 404}>{props.code ? props.code : 404}</h1>
                    <p data-p={props.code ? describe(props.code) : describe('404')}>{props.code ? describe(props.code) : describe('404')}</p>
                </div>
            </div>
        </div>
    );
}

export default Page404;