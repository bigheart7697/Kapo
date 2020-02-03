import React from 'react';
import { shallow } from 'enzyme';
import Page404 from './index.js';
import ReactDOM from 'react-dom';

describe('ProductList component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Page404 code='401'/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders without crashing missing data', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Page404 />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('check the data in the component', () => {
        const wrapper = shallow(
            <Page404 code='403'/>
        );
        expect(wrapper.find('h1').text()).toEqual('403');
        expect(wrapper.find('p').text()).toEqual('شما اجازه ورود به این صفحه را ندارید');
    });

    it('check the data in the component missing data', () => {
        const wrapper = shallow(
            <Page404 />
        );
        expect(wrapper.find('h1').text()).toEqual('404');
        expect(wrapper.find('p').text()).toEqual('صفحه مورد نظر یافت نشد');
    });
});