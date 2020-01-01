import React from 'react';
import { shallow } from 'enzyme';
import Product from './index.js';
import ReactDOM from 'react-dom';
import 'jest-styled-components'

describe('ProductList component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Product
                    name= 'تست'
                    description= 'تست'
                    price= '120000'
                    year= '1398' 
                    month= '08' 
                    day= '1'
                    address= 'نیاوران'
                />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('check the data in the component', () => {
        const wrapper = shallow(
            <Product 
                title= 'تست'
                description= 'تست'
                price= '120000'
                year= '1398'
                month= '08'
                day= '1'
                address= 'نیاوران'
            />
        );
        expect(wrapper.find('a').text()).toEqual('تست');
        expect(wrapper.find('.product__text').text()).toEqual('تست');
        expect(wrapper.find('.product__author').text()).toEqual('نیاوران');
        expect(wrapper.find('.product__day').text()).toEqual('1');
        expect(wrapper.find('.product__month').text()).toEqual('08');
        expect(wrapper.find('.product__year').text()).toEqual('1398');
    });

    it('check if panel goes up on hover', () => {
        const wrapper = shallow(
            <Product 
                title= 'تست'
                description= 'تست'
                price= '120000'
                year= '1398'
                month= '08'
                day= '1'
                address= 'نیاوران'
            />
        );
        const product_content = wrapper.find('.product__wrapper');
        product_content.simulate('hover');
        expect(wrapper.find('.product__data').get(0)).toHaveStyleRule('transform', 'translateY(0)');
    });
});