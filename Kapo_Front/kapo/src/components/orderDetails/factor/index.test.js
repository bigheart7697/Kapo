import React from 'react';
import OrderFactor from './index.js';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import renderer from 'react-test-renderer';

const buildStore = configureStore([thunk]);

describe('OrderDetails component', () => {
    let store;

    beforeEach(() => {
        const orders = {orders: {orders: [{'product': {'name': 'تست', 'price': 120000, 'owner': {'corporate_name': 'مبنا', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران', 'is_corporate': true}},
                                            'customer': {'first_name': 'محمد', 'last_name': 'محمدی', 'address': 'پاسداران', 'country': 'ایران', 'city': 'تهران', 'is_corporate': false},
                                            'count': '3', 
                                            'deadline': '18:52',
                                            'state': 'Completed',
                                            'created': '2020/01/01'},
                                        {'product': {'name': 'تست', 'price': 120000}, 
                                            'state': 'Completed'},
                                        {'count': '3', 
                                            'state': 'Awaiting',
                                            'created': '2020/01/01'}]}}
                                
        store = buildStore(orders);
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={store}>
                <OrderFactor 
                    match={{params: {id: '0'}}}
                /></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders without crashing while there are missing data 1 ', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><OrderFactor 
            match={{params: {id: '1'}}}
        /></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders without crashing while there are missing data 2 ', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><OrderFactor 
            match={{params: {id: '2'}}}
        /></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});