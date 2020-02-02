import React from 'react';
import { shallow } from 'enzyme';
import OrderDetails from './index.js';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

const buildStore = configureStore([thunk]);

describe('OrderDetails component', () => {
    let store;

    beforeEach(() => {
        store = buildStore();
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={store}>
                <OrderDetails 
                order={{'product': {'name': 'تست', 'price': 120000, 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}},
                        'customer': {'name': 'محمد', 'address': 'پاسداران'},
                        'count': '3', 
                        'deadline': '18:52',
                        'state': 'completed',
                        'created': '2020/01/01'}}
                    /></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders without crashing while there are missing data 1 ', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><OrderDetails 
            order={{'product': {'name': 'تست', 'price': 120000}, 'state': 'completed'}}
                /></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders without crashing while there are missing data 2 ', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><OrderDetails 
            order={{'count': '3', 
                    'state': 'completed',
                    'created': '2020/01/01'}}
                /></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('check the data in the component', () => {
        const wrapper = shallow(
            <Provider store={store}><OrderDetails 
                order={{'product': {'name': 'تست', 'price': 120000, 'owner': {'name': 'علی', 'address': 'نیاوران', 'country': 'ایران', 'city': 'تهران'}},
                        'customer': {'name': 'محمد', 'address': 'پاسداران'},
                        'count': '3', 
                        'deadline': '18:52',
                        'state': 'completed',
                        'created': '2020/01/01'}}
                /></Provider>
        ).dive({ context: { store } }).dive();
        expect(wrapper.find('#order-details__address').text()).toEqual('آدرس: ایران، تهران، نیاوران');
        expect(wrapper.find('#order-details__count').text()).toEqual('تعداد: 3 عدد');
        expect(wrapper.find('#order-details__price').text()).toEqual('هزینه: 360000 تومان');
    });
});