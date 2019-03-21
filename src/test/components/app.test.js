import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { mount } from "../enzyme";
import { CookiesProvider } from "react-cookie";
import { Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import sinon from "sinon";

import App from "../../App";

const middlewares = [thunk];

describe("<App /> component", () => {

    const relog_user = jest.fn();

    const initialState = {
        uac: {
            isLoggedIn: false
        },
        ord: {
            currentOrder: {},
            orderList: []
        },
        cookies: instanceOf(Cookies).isRequired,
        reLogUserIn: relog_user
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it("renders correctly", () => {
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

describe("<App /> component with login", () => {

    const relogUser = jest.fn();

    const initialState = {
        uac: {
            isLoggedIn: true
        },
        ord: {
            currentOrder: {},
            orderList: []
        },
        cookies: instanceOf(Cookies).isRequired,
        reLogUserIn: relogUser
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it("renders correctly", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper.contains(<i className="fas fa-sign-out-alt" />)).toBeTruthy();
    });
});

describe("<App /> with cookies unset", () => {

    const reLogUser = sinon.spy();

    const initialState = {
        uac: {
            isLoggedIn: true
        },
        ord: {
            currentOrder: {},
            orderList: []
        },
        cookies: instanceOf(Cookies).isRequired,
        reLogUserIn: reLogUser
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it("renders correctly", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <App cookies={{
                        getAll: jest.fn(),
                        get: () => { return true },
                        addChangeListener: jest.fn(),
                        remove: jest.fn()
                    }} />
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper.find(".App").length).toBe(1);
    });
});