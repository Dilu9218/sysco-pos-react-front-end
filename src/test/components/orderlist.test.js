import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { mount } from "../enzyme";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import OrderList from "../../components/OrderList";

const middlewares = [thunk];

describe("<OrderList /> component", () => {

    const getCompleteItemList = jest.fn();
    const fetchEveryOrder = jest.fn();
    const resetCurrentOrder = jest.fn();
    const deleteThisOrder = jest.fn();

    const initialState = {
        uac: {
            passKey: "abcd"
        },
        ord: {
            currentOrder: {
                _id: "asdadasdasda",
                cartID: "abc",
                items: [
                    {}
                ]
            },
            orderList: [
                {
                    _id: "asdadasdasda",
                    cartID: "testCart", items: [
                        { _id: "a", productID: "A", productTitle: "AAA", quantity: 10, price: 1, description: "A aa" },
                        { _id: "b", productID: "B", productTitle: "BBB", quantity: 20, price: 2, description: "B bb" },
                        { _id: "c", productID: "C", productTitle: "CCC", quantity: 30, price: 3, description: "C cc" }
                    ]
                },
                {
                    _id: "asdadafdasda",
                    cartID: "tesdCart", items: [
                        { _id: "a", productID: "A", productTitle: "AAA", quantity: 10, price: 1, description: "A aa" },
                        { _id: "b", productID: "B", productTitle: "BBB", quantity: 20, price: 2, description: "B bb" },
                        { _id: "c", productID: "C", productTitle: "CCC", quantity: 30, price: 3, description: "C cc" }
                    ]
                }
            ],
            url: "",
            itemsList: [{}]
        },
        dispatch_GetTheCompleteItemsList: getCompleteItemList,
        dispatch_FetchEveryOrderForThisUser: fetchEveryOrder,
        dispatch_ResetCurrentOrderStates: resetCurrentOrder,
        dispatch_DeleteThisOrder: deleteThisOrder
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it("renders orderlist with orders", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <OrderList />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper).toMatchSnapshot();
    });
});

describe("<OrderList /> component with no orders", () => {

    const getCompleteItemList = jest.fn();
    const fetchEveryOrder = jest.fn();
    const resetCurrentOrder = jest.fn();
    const deleteThisOrder = jest.fn();

    const initialState = {
        uac: {
            passKey: "abcd"
        },
        ord: {
            currentOrder: {},
            orderList: [],
            url: "",
            itemsList: [{}]
        },
        dispatch_GetTheCompleteItemsList: getCompleteItemList,
        dispatch_FetchEveryOrderForThisUser: fetchEveryOrder,
        dispatch_ResetCurrentOrderStates: resetCurrentOrder,
        dispatch_DeleteThisOrder: deleteThisOrder
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it("renders orderlist with orders", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <OrderList />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper).toMatchSnapshot();
    });
});

describe("<OrderList /> component with no passkey", () => {

    const getCompleteItemList = jest.fn();
    const fetchEveryOrder = jest.fn();
    const resetCurrentOrder = jest.fn();
    const deleteThisOrder = jest.fn();

    const initialState = {
        uac: {
            passKey: ""
        },
        ord: {
            currentOrder: {},
            orderList: [],
            url: "",
            itemsList: [{}]
        },
        dispatch_GetTheCompleteItemsList: getCompleteItemList,
        dispatch_FetchEveryOrderForThisUser: fetchEveryOrder,
        dispatch_ResetCurrentOrderStates: resetCurrentOrder,
        dispatch_DeleteThisOrder: deleteThisOrder
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it("renders orderlist with orders", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <OrderList />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper.contains(<Redirect to="/login" push={false} />)).toBeTruthy();
    });
});

describe("<OrderList /> component with delete order", () => {

    const getCompleteItemList = jest.fn();
    const fetchEveryOrder = jest.fn();
    const resetCurrentOrder = jest.fn();
    const deleteThisOrder = jest.fn();

    const initialState = {
        uac: {
            passKey: "asd"
        },
        ord: {
            currentOrder: {},
            orderList: [],
            url: "/delete_order",
            itemsList: [{}]
        },
        dispatch_GetTheCompleteItemsList: getCompleteItemList,
        dispatch_FetchEveryOrderForThisUser: fetchEveryOrder,
        dispatch_ResetCurrentOrderStates: resetCurrentOrder,
        dispatch_DeleteThisOrder: deleteThisOrder
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it("renders orderlist with orders", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <OrderList />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        expect(!wrapper.isEmpty()).toBeTruthy();
    });
});