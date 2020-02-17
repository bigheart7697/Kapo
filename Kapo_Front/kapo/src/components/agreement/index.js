import React from 'react'

import './style.scss'

const Agreement = (props) => {
    if(props.content) {
        return (
            <div className='agreement__wrapper'>
                <div className='agreement__container'>
                    <div className='agreement__title'>قوانین عمومی</div>
                    <div className='agreement__text'>
                    توجه داشته باشید کلیه اصول و رویه‏‌های کاپو‌کالا منطبق با قوانین جمهوری اسلامی ایران، قانون تجارت الکترونیک و قانون حمایت از حقوق مصرف کننده است و متعاقبا کاربر نیز موظف به رعایت قوانین مرتبط با کاربر است. در صورتی که در قوانین مندرج، رویه‏‌ها و سرویس‏‌های کاپو‌کالا تغییراتی در آینده ایجاد شود، در همین صفحه منتشر و به روز رسانی می شود و شما توافق می‏‌کنید که استفاده مستمر شما از سایت به معنی پذیرش هرگونه تغییر است. 
                    </div>
                    <div className='agreement__title'>تعرفه ها</div>
                    <div className='agreement__text'>
                    به ازای هر بار فروش کالا به افراد از طریق سایت، 5 درصد از مبلغ فروش از حساب شما کم شده و به حساب شرکت کاپوکالا واریز می‌گردد.  به این منظور ، حساب کاربری شما باید همواره به میزان کافی شارژ شده باشد. 
                    </div>
                </div>
                <input type='checkbox' className='agreement__checkbox' />
                <div className='agreement__label'>شرایط و قوانین را قبول دارم</div>
            </div>
        );
    } else {
        return (
            <div className='agreement__wrapper'>
                <div className='agreement__container'>
                    <div className='agreement__title'>قوانین عمومی</div>
                    <div className='agreement__text'>
                    توجه داشته باشید کلیه اصول و رویه‏‌های کاپو‌کالا منطبق با قوانین جمهوری اسلامی ایران، قانون تجارت الکترونیک و قانون حمایت از حقوق مصرف کننده است و متعاقبا کاربر نیز موظف به رعایت قوانین مرتبط با کاربر است. در صورتی که در قوانین مندرج، رویه‏‌ها و سرویس‏‌های کاپو‌کالا تغییراتی در آینده ایجاد شود، در همین صفحه منتشر و به روز رسانی می شود و شما توافق می‏‌کنید که استفاده مستمر شما از سایت به معنی پذیرش هرگونه تغییر است. 
                    </div>
                    <div className='agreement__title'>تعرفه ها</div>
                    <div className='agreement__text'>
                    به ازای هر بار فروش کالا به افراد از طریق سایت، 2 درصد از مبلغ فروش از حساب شما کم شده و به حساب شرکت کاپوکالا واریز می‌گردد.  به این منظور ، حساب کاربری شما باید همواره به میزان کافی شارژ شده باشد. 
                    </div>
                </div>
                <input type='checkbox' className='agreement__checkbox' />
                <div className='agreement__label'>شرایط و قوانین را قبول دارم</div>
            </div>
        );
    }
}

export default Agreement