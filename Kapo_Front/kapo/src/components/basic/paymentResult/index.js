import React from 'react'

import './style.scss'

const describe = (success) => {
    switch(success) {
        case true:
            return 'پرداخت با موفقیت انجام شد!';
        case false:
            return 'عملیات پرداخت ناتمام ماند';
    }
}

const PaymentResult = (props) => {
    return (
        <div>
            <div className='payment-result__container'>
                <div>
                    <h1 className={`payment-result__h1` + (props.success ? ` payment-result__h1--successful` : ` payment-result__h1--unsuccessful`)}>{describe(props.success ? props.success : false)}</h1>
                </div>
            </div>
        </div>
    );
}

export default PaymentResult;