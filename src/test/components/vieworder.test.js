import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { mount } from "../enzyme";
import sinon from "sinon";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import ViewOrder from "../../components/ViewOrder";

const middlewares = [thunk];

describe("<ViewOrder /> component", () => {

    const getCompleteItemList = jest.fn();
    const resetCurrentOrder = jest.fn();
    const deleteThisOrder = jest.fn();

    const initialState = {
        uac: {
            passKey: "abcd",
            isLoggedIn: true
        },
        ord: {
            total: 1100,
            itemQuantity: { "A": 1, "B": 2, "C": 3 },
            clonedItemQuantity: { "A": 1, "B": 2, "C": 3 },
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
            ],
            viewItemList: [
                { _id: "a", productID: "A", productTitle: "AAA", quantity: 10, price: 1, description: "A aa" },
                { _id: "b", productID: "B", productTitle: "BBB", quantity: 20, price: 2, description: "B bb" },
                { _id: "c", productID: "C", productTitle: "CCC", quantity: 30, price: 3, description: "C cc" }
            ]
        },
        dispatchGetTheCompleteItemsList: getCompleteItemList,
        dispatchResetCurrentOrderStates: resetCurrentOrder,
        dispatchCheckOutOrder: deleteThisOrder
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
                        <ViewOrder />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    it("calls checkout order", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <ViewOrder />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        wrapper.find(".btn-warning").simulate("click");
        wrapper.find(".btn-success").simulate("click");
        wrapper.find(".btn-primary").simulate("click");
    });
});

describe("<ViewOrder /> component with logout", () => {

    const getCompleteItemList = sinon.spy();
    const resetCurrentOrder = sinon.spy();
    const deleteThisOrder = sinon.spy();

    const initialState = {
        uac: {
            passKey: "abcd",
            isLoggedIn: false
        },
        ord: {
            total: 1100,
            itemQuantity: { "A": 1, "B": 2, "C": 3 },
            clonedItemQuantity: { "A": 1, "B": 2, "C": 3 },
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
            ],
            viewItemList: [
                { _id: "a", productID: "A", productTitle: "AAA", quantity: 10, price: 1, description: "A aa" },
                { _id: "b", productID: "B", productTitle: "BBB", quantity: 20, price: 2, description: "B bb" },
                { _id: "c", productID: "C", productTitle: "CCC", quantity: 30, price: 3, description: "C cc" }
            ]
        },
        dispatchGetTheCompleteItemsList: getCompleteItemList,
        dispatchResetCurrentOrderStates: resetCurrentOrder,
        dispatchCheckOutOrder: deleteThisOrder
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
                        <ViewOrder />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper.contains(<Redirect to="/login" push={false} />)).toBeTruthy();
    });
    it("unmounts", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <ViewOrder />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        wrapper.unmount();
        expect(wrapper.exists()).toBe(false);
    });
});