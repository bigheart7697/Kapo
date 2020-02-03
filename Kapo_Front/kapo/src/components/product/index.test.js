import React from 'react';
import { shallow } from 'enzyme';
import Product from './index.js';
import ReactDOM from 'react-dom';

describe('ProductList component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Product
            product= {{'name': 'تست', 'price': 120000, 'description': 'بهترین کالا', 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}}}
                />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('check the data in the component', () => {
        const wrapper = shallow(
            <Product
                product= {{'name': 'تست', 'price': 120000, 'description': 'بهترین کالا', 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}}}
            />
        );
        expect(wrapper.find('a').text()).toEqual('تست');
        expect(wrapper.find('.product__text').text()).toEqual('بهترین کالا');
        expect(wrapper.find('.product__author').text()).toEqual('نیاوران');
        expect(wrapper.find('.product__month').at(0).text()).toEqual('قیمت');
        expect(wrapper.find('.product__month').at(1).text()).toEqual('120000');
    });
});