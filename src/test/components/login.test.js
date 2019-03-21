import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { mount } from "../enzyme";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import LogIn from "../../components/LogIn";

const middlewares = [thunk];

describe("<LogIn /> component with logged out", () => {

    const initialState = {
        uac: {
            isLoggedIn: false,
            alertMessage: ""
        },
        logUserIn: jest.fn();
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it("renders with login and register links", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <LogIn />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper.find(".sign-in-btn").length).toBe(1);
    });
    it("calls on submit", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <LogIn />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper.find(".mx-2").simulate("submit"));
    });
});

describe("<LogIn /> component with logged in", () => {

    const initialState = {
        uac: {
            isLoggedIn: true,
            alertMessage: ""
        },
        logUserIn: jest.fn()
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    })

    it("renders with login and register links", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <LogIn />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper.contains(<Redirect to="/my_orders" push={false} />)).toBeTruthy();
    });
});