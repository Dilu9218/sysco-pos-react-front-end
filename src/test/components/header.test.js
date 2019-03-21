import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { shallowWrap, mountWrap, mount } from "../enzyme";
import { BrowserRouter as Router } from "react-router-dom";

import ConnectedHeader, { Header, ConditionalHeader } from "../../components/Header";

const middlewares = [thunk];

describe("<Header /> component", () => {
    it("renders the component", () => {
        const wrapper = shallowWrap(<Header isLoggedIn={true} />);
        expect(wrapper).toMatchSnapshot();
    });
    it("mounts the component with login true", () => {
        const wrapper = mountWrap(<Header isLoggedIn={true} />);
        expect(wrapper).toMatchSnapshot();
    });
    it("mounts the component with login false", () => {
        const wrapper = mountWrap(<Header isLoggedIn={false} />);
        expect(wrapper).toMatchSnapshot();
    });
});

describe("<ConditionalHeader /> component", () => {
    it("renders the component", () => {
        const wrapper = shallowWrap(<ConditionalHeader isLoggedIn={true} />);
        expect(wrapper).toMatchSnapshot();
    });
    it("mounts the component with login true", () => {
        const wrapper = mountWrap(<ConditionalHeader isLoggedIn={true} />);
        expect(wrapper).toMatchSnapshot();
    });
    it("mounts the component with login false", () => {
        const wrapper = mountWrap(<ConditionalHeader isLoggedIn={false} />);
        expect(wrapper).toMatchSnapshot();
    });
});

describe("<Header /> component with logged out", () => {

    const initialState = {
        uac: { isLoggedIn: false }
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it("renders with login and register links", () => {
        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <ConnectedHeader />
                </Router>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
});

describe("<Header /> component with logged in", () => {

    const initialState = {
        uac: { isLoggedIn: true }
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it("renders with order and logout links", () => {
        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <ConnectedHeader />
                </Router>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
});