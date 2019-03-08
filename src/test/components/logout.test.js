import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount } from '../enzyme';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import LogOut from '../../components/LogOut';

const middlewares = [thunk];

describe('<Logout /> component rendering', () => {

    const initialState = {
        LOG_USER_OUT: jest.fn()
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('logout component renders successfully', () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <LogOut />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper.contains(<Redirect to="/login" push={false} />)).toBeTruthy();
    });
});