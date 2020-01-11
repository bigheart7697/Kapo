import React from 'react';
import { shallow } from 'enzyme';
import PreviewOrder from './index.js';
import ReactDOM from 'react-dom';

describe('PreviewOrder component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PreviewOrder 
            order={{'product': {'name': 'تست', 'price': '120000', 'user': {'name': 'علی', 'address': 'نیاوران'}},
                    'number': '3', 
                    'price': '360000'}}
                />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('check the data in the component', () => {
        const wrapper = shallow(
            <PreviewOrder 
                order={{'product': {'name': 'تست', 'price': '120000', 'user': {'name': 'علی', 'address': 'نیاوران'}},
                        'number': '3', 
                        'price': '360000', 
                        'deadline': '18:52'}}
                />
        );
        expect(wrapper.find('.preview-order__name').at(0).text()).toEqual('تست');
        expect(wrapper.find('.preview-order__details-line').at(0).text()).toEqual('آدرس: نیاوران');
        expect(wrapper.find('.preview-order__details-line').at(1).text()).toEqual('تعداد: 3 عدد');
        expect(wrapper.find('.preview-order__details-line').at(2).text()).toEqual('مهلت پرداخت: 18:52');
        expect(wrapper.find('.preview-order__price-value').at(0).text()).toEqual('120000 تومان');
        expect(wrapper.find('.preview-order__price-value').at(1).text()).toEqual('360000 تومان');
    });
});