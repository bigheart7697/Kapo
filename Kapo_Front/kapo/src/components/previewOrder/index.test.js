import React from 'react';
import PreviewOrder from './index.js';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import renderer from 'react-test-renderer';

const buildStore = configureStore([thunk]);

describe('PreviewOrder component', () => {
    let store;

    beforeEach(() => {
        const orders = {orders: {orders: [{'product': {'name': 'تست', 'price': 120000, 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}},
                                            'customer': {'name': 'محمد', 'address': 'پاسداران'},
                                            'count': '3', 
                                            'deadline': '18:52',
                                            'state': 'completed',
                                            'created': '2020/01/01'}]}}
        store = buildStore(orders);
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><PreviewOrder 
            match = {{'params': {'id': '0'}}}
                /></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders without crashing while there are missing data 1 ', () => {
        const orders = {orders: {orders: [{'product': {'name': 'تست', 'price': 120000, 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}},
                                            'created': '2020/01/01'}]}}
        const store1 = buildStore(orders);
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store1}><PreviewOrder
            match = {{'params': {'id': '0'}}}
                /></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders without crashing while there are missing data 2 ', () => {
        const orders = {orders: {orders: [{'product': {'name': 'تست'},
                                            'customer': {'name': 'محمد', 'address': 'پاسداران'},
                                            'count': '3', 
                                            'deadline': '18:52'}]}}
        const store1 = buildStore(orders);
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store1}><PreviewOrder
            match = {{'params': {'id': '0'}}}
                /></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('check the data in the component', () => {
        const component = renderer.create(<Provider store={store}>
            <PreviewOrder
                match = {{'params': {'id': '0'}}} />
        </Provider>);
        expect(component.root.find(e => e.props.id == 'preview-order__address').children[1]).toEqual('ایران، تهران، نیاوران');
        expect(component.root.find(e => e.props.id == 'preview-order__name').children[0]).toEqual('تست');
        expect(component.root.find(e => e.props.id == 'preview-order__count').children[1]).toEqual('3');
        expect(component.root.find(e => e.props.id == 'preview-order__unit-price').children[0]).toEqual('120000');
        expect(component.root.find(e => e.props.id == 'preview-order__total-price').children[0]).toEqual('360000');
        expect(component.root.find(e => e.props.id == 'preview-order__deadline').children[1]).toEqual('18:52');
    });
});