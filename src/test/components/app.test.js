import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount } from '../enzyme';
import { MemoryRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

import App from '../../App';

const middlewares = [thunk];

/* beforeAll(() => {
    jest.mock("react-router-dom/BrowserRouter", () => {
        return ({ children }) => <div>{children}</div>
    });
}); */

describe('<App /> component', () => {

    const relog_user = jest.fn();

    const initialState = {
        uac: {
            isLoggedIn: false
        },
        cookies: instanceOf(Cookies).isRequired,
        RE_LOG_USER_IN: relog_user
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('renders correctly', () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper).toMatchSnapshot();
    });
});

describe('<App /> component with login', () => {

    const relog_user = jest.fn();

    const initialState = {
        uac: {
            isLoggedIn: true
        },
        cookies: instanceOf(Cookies).isRequired,
        RE_LOG_USER_IN: relog_user
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('renders correctly', () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper).toMatchSnapshot();
    });
});


describe('<App /> component with memory router', () => {

    const relog_user = jest.fn();

    const initialState = {
        uac: {
            isLoggedIn: true
        },
        cookies: instanceOf(Cookies).isRequired,
        RE_LOG_USER_IN: relog_user
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    /* it('renders correctly', () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <MemoryRouter initialEntries={['/create_order']} >
                        <App />
                    </MemoryRouter>
                </Provider>
            </CookiesProvider>
        );
        console.debug(wrapper.debug());
        //expect(wrapper).toMatchSnapshot();
    }); */
});