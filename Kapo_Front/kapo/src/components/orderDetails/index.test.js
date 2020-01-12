import React from 'react';
import { shallow } from 'enzyme';
import OrderDetails from './index.js';
import ReactDOM from 'react-dom';

describe('OrderDetails component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<OrderDetails 
            order={{'product': {'name': 'تست', 'price': 120000, 'owner': {'name': 'علی', 'address': 'نیاوران'}},
                    'customer': {'name': 'محمد', 'address': 'پاسداران'},
                    'count': '3', 
                    'deadline': '18:52',
                    'state': 'completed',
                    'created': '2020/01/01'}}
                />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders without crashing while there are missing data 1 ', () => {
        const div = document.createElement('div');
        ReactDOM.render(<OrderDetails 
            order={{'product': {'name': 'تست', 'price': 120000}, 'state': 'completed'}}
                />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders without crashing while there are missing data 2 ', () => {
        const div = document.createElement('div');
        ReactDOM.render(<OrderDetails 
            order={{'count': '3', 
                    'state': 'completed',
                    'created': '2020/01/01'}}
                />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('check the data in the component', () => {
        const wrapper = shallow(
            <OrderDetails 
                order={{'product': {'name': 'تست', 'price': 120000, 'owner': {'name': 'علی', 'address': 'نیاوران'}},
                        'customer': {'name': 'محمد', 'address': 'پاسداران'},
                        'count': '3', 
                        'deadline': '18:52',
                        'state': 'completed',
                        'created': '2020/01/01'}}
                />
        );
        expect(wrapper.find('#order-details__name').text()).toEqual('تست');
        expect(wrapper.find('#order-details__address').text()).toEqual('آدرس: نیاوران');
        expect(wrapper.find('#order-details__count').text()).toEqual('تعداد: 3 عدد');
        expect(wrapper.find('#order-details__price').text()).toEqual('هزینه: 360000 تومان');
    });
});