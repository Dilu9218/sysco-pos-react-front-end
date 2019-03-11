import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount } from '../enzyme';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import sinon from 'sinon';

import Register from '../../components/Register';

const middlewares = [thunk];

describe('<Register /> component', () => {

    const REGISTER_USER = sinon.spy();

    const initialState = {
        uac: {
            isLoggedIn: false
        },
        reg: {
            registered: false,
            alertMessage: ''
        },
        REGISTER_USER
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('renders with login and register links', () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <Register />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper.find('.btn-register').length).toBe(1);
    });
    it('calls on submit', () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <Register />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper.find('.mx-2').simulate('submit'));
    });
});

describe('<Register /> component with logged in', () => {

    const initialState = {
        uac: {
            isLoggedIn: true
        },
        reg: {
            registered: false,
            alertMessage: ''
        },
        REGISTER_USER: jest.fn()
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('redirects to order list', () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <Register />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper.contains(<Redirect to="/my_orders" push={false} />)).toBeTruthy();
    });
});

describe('<Register /> component with registered', () => {

    const initialState = {
        uac: {
            isLoggedIn: false
        },
        reg: {
            registered: true,
            alertMessage: ''
        },
        REGISTER_USER: jest.fn()
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('renders with login and register links', () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <Register />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper.contains(<Redirect to="/login" push={false} />)).toBeTruthy();
    });
});