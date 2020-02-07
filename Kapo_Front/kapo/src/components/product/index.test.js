import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import Product from './index.js';
import ReactDOM from 'react-dom';
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

const buildStore = configureStore([thunk]);

describe('ProductList component', () => {
    let store;

    beforeEach(() => {
        store = buildStore();
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Router><Provider store={store}><Product
            product= {{'name': 'تست', 'price': 120000, 'description': 'بهترین کالا', 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}}}
                /></Provider></Router>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('check the data in the component', () => {
        const component = renderer.create(
            <Router><Product
                product= {{'name': 'تست', 'price': 120000, 'description': 'بهترین کالا', 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}}}
            /></Router>
        );
        expect(component.root.find(e => e.props.id == 'product__price').children[0]).toEqual('120000');
        expect(component.root.find(e => e.props.id == 'product__address').children[0]).toEqual('ایران، تهران، نیاوران');
        expect(component.root.find(e => e.props.id == 'product__description').children[0]).toEqual('بهترین کالا');
    });
});