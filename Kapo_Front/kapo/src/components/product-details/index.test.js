import React from 'react';
import { mount } from 'enzyme';
import ProductDetails from './index.js';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import reduxThunk from 'redux-thunk'
import reducers from '../../reducers'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancer(applyMiddleware(reduxThunk)))

describe('ProductDetails component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={store}>
                <ProductDetails
                    product={{
                        name: 'تست',
                        description: 'تست',
                        price: '120000',
                        year: '1398',
                        month: '08',
                        day: '1',
                        address: 'نیاوران',
                        second_hand: true,
                        type: '-',
                        production_year: '1398'
                    }}
                />
            </Provider>
        , div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('check the data in the component', () => {
        const wrapper = mount(
            <Provider store={store}>
                <ProductDetails
                    product={{
                        name: 'تست',
                        description: 'تست',
                        price: '120000',
                        year: '1398',
                        month: '08',
                        day: '1',
                        address: 'نیاوران',
                        second_hand: true,
                        type: '-',
                        production_year: '1398'
                    }}
                />
            </Provider>
        );
        expect(wrapper.find('h1').text()).toEqual('تست');
        expect(wrapper.find('p').text()).toEqual('تست');
        expect(wrapper.find('.productDetails__column').at(0).text()).toEqual('دست دوم');
        expect(wrapper.find('td').at(2).text()).toEqual('-');
        expect(wrapper.find('td').at(4).text()).toEqual('-');
        expect(wrapper.find('td').at(6).text()).toEqual('1398');
        expect(wrapper.find('td').at(10).text()).toEqual('120000');
    });
});