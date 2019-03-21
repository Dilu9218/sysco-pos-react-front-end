import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { mount } from "../enzyme";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import sinon from "sinon"

import CreateOrder from "../../components/CreateOrder";

const middlewares = [thunk];

describe("<CreateOrder /> component", () => {

    const dispatch_CreateNewOrderForThisUser = jest.fn();
    const dispatch_ResetCurrentOrderStates = jest.fn();
    const dispatch_DeleteThisOrder = jest.fn();
    const dispatch_AddTheseItemsToThisOrder = jest.fn();
    const dispatch_GetTheCompleteItemsList = jest.fn();

    const initialState = {
        uac: {
            passKey: "abcd",
            isLoggedIn: true
        },
        ord: {
            currentOrderID: "abcd1234",
            total: 1100,
            status: false,
            itemQuantity: { "A": 1, "B": 2, "C": 3 },
            currentOrder: {
                _id: "asdadasdasda",
                cartID: "abc",
                items: [
                    { _id: "a", productID: "A", productTitle: "AAA", quantity: 10, price: 1, description: "A aa" },
                    { _id: "b", productID: "B", productTitle: "BBB", quantity: 20, price: 2, description: "B bb" },
                    { _id: "c", productID: "C", productTitle: "CCC", quantity: 30, price: 3, description: "C cc" }
                ]
            },
            url: "",
            itemsList: [
                { _id: "a", productID: "A", productTitle: "AAA", quantity: 10, price: 1, description: "A aa" },
                { _id: "b", productID: "B", productTitle: "BBB", quantity: 20, price: 2, description: "B bb" },
                { _id: "c", productID: "C", productTitle: "CCC", quantity: 30, price: 3, description: "C cc" }
            ]
        },
        dispatch_CreateNewOrderForThisUser,
        dispatch_ResetCurrentOrderStates,
        dispatch_DeleteThisOrder,
        dispatch_AddTheseItemsToThisOrder,
        dispatch_GetTheCompleteItemsList
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it("renders with an create order layout", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <CreateOrder />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    it("calls add items to order", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <CreateOrder />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        wrapper.find(".btn-success").simulate("click");
        wrapper.find(".btn-danger").at(3).simulate("click");
    });
});

describe("<CreateOrder /> component with logout", () => {

    const dispatch_CreateNewOrderForThisUser = jest.fn();
    const dispatch_ResetCurrentOrderStates = jest.fn();
    const dispatch_DeleteThisOrder = jest.fn();
    const dispatch_AddTheseItemsToThisOrder = jest.fn();
    const dispatch_GetTheCompleteItemsList = jest.fn();

    const initialState = {
        uac: {
            passKey: "abcd",
            isLoggedIn: false
        },
        ord: {
            currentOrderID: "abcd1234",
            total: 1100,
            status: false,
            itemQuantity: { "A": 1, "B": 2, "C": 3 },
            currentOrder: {
                _id: "asdadasdasda",
                cartID: "abc",
                items: [
                    { _id: "a", productID: "A", productTitle: "AAA", quantity: 10, price: 1, description: "A aa" },
                    { _id: "b", productID: "B", productTitle: "BBB", quantity: 20, price: 2, description: "B bb" },
                    { _id: "c", productID: "C", productTitle: "CCC", quantity: 30, price: 3, description: "C cc" }
                ]
            },
            url: "",
            itemsList: [
                { _id: "a", productID: "A", productTitle: "AAA", quantity: 10, price: 1, description: "A aa" },
                { _id: "b", productID: "B", productTitle: "BBB", quantity: 20, price: 2, description: "B bb" },
                { _id: "c", productID: "C", productTitle: "CCC", quantity: 30, price: 3, description: "C cc" }
            ]
        },
        dispatch_CreateNewOrderForThisUser,
        dispatch_ResetCurrentOrderStates,
        dispatch_DeleteThisOrder,
        dispatch_AddTheseItemsToThisOrder,
        dispatch_GetTheCompleteItemsList
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it("renders with an order", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <CreateOrder />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper.contains(<Redirect to="/login" push={false} />)).toBeTruthy();
    });
});

describe("<CreateOrder /> component with logout", () => {

    const dispatch_CreateNewOrderForThisUser = jest.fn();
    const dispatch_ResetCurrentOrderStates = sinon.spy();
    const dispatch_DeleteThisOrder = sinon.spy();
    const dispatch_AddTheseItemsToThisOrder = jest.fn();
    const dispatch_GetTheCompleteItemsList = jest.fn();

    const initialState = {
        uac: {
            passKey: "abcd",
            isLoggedIn: true
        },
        ord: {
            currentOrderID: "abcd1234",
            total: 1100,
            status: true,
            itemQuantity: {},
            currentOrder: {
                _id: "asdadasdasda",
                cartID: "abc",
                items: [
                    { _id: "a", productID: "A", productTitle: "AAA", quantity: 10, price: 1, description: "A aa" },
                    { _id: "b", productID: "B", productTitle: "BBB", quantity: 20, price: 2, description: "B bb" },
                    { _id: "c", productID: "C", productTitle: "CCC", quantity: 30, price: 3, description: "C cc" }
                ]
            },
            url: "",
            itemsList: [
                { _id: "a", productID: "A", productTitle: "AAA", quantity: 10, price: 1, description: "A aa" },
                { _id: "b", productID: "B", productTitle: "BBB", quantity: 20, price: 2, description: "B bb" },
                { _id: "c", productID: "C", productTitle: "CCC", quantity: 30, price: 3, description: "C cc" }
            ]
        },
        dispatch_CreateNewOrderForThisUser,
        dispatch_ResetCurrentOrderStates,
        dispatch_DeleteThisOrder,
        dispatch_AddTheseItemsToThisOrder,
        dispatch_GetTheCompleteItemsList
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it("calls didupdate", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <CreateOrder />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        wrapper.setState({ ord: { status: false } });
    });
    it("calls unmount", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <CreateOrder />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        wrapper.unmount();
        console.log(dispatch_DeleteThisOrder.calledOnce);
    });
});