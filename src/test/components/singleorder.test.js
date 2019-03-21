import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { mount } from "../enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import SingleOrder from "../../components/SingleOrder";

const middlewares = [thunk];

describe("<SingleOrder /> component", () => {

    const setAsCurrentOrder = jest.fn();

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
            }
        },
        dispatchSetThisOrderAsCurrentOrder: setAsCurrentOrder
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it("renders with login and register links", () => {
        let order = {
            _id: "asdadasdasda",
            cartID: "testCart", items: [
                { _id: "a", productID: "A", productTitle: "AAA", quantity: 10, price: 1, description: "A aa" },
                { _id: "b", productID: "B", productTitle: "BBB", quantity: 20, price: 2, description: "B bb" },
                { _id: "c", productID: "C", productTitle: "CCC", quantity: 30, price: 3, description: "C cc" }
            ]
        }
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <SingleOrder order={order} />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    it("calls view this order action", () => {
        let order = {
            _id: "asdadasdasda",
            cartID: "testCart", items: [
                { _id: "a", productID: "A", productTitle: "AAA", quantity: 10, price: 1, description: "A aa" },
                { _id: "b", productID: "B", productTitle: "BBB", quantity: 20, price: 2, description: "B bb" },
                { _id: "c", productID: "C", productTitle: "CCC", quantity: 30, price: 3, description: "C cc" }
            ]
        }
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <SingleOrder order={order} />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        wrapper.find(".view-order").at(1).simulate("click");
        expect(wrapper.contains(<i className="fas fa-list-alt" />)).toBeTruthy();
    });
    it("calls delete this order action", () => {
        let order = {
            cartID: "testCart", items: [
                { _id: "a", productID: "A", productTitle: "AAA", quantity: 10, price: 1, description: "A aa" },
                { _id: "b", productID: "B", productTitle: "BBB", quantity: 20, price: 2, description: "B bb" },
                { _id: "c", productID: "C", productTitle: "CCC", quantity: 30, price: 3, description: "C cc" }
            ]
        }
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <SingleOrder order={order} />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        wrapper.find(".delete-order").at(1).simulate("click");
        expect(wrapper.contains(<i className="fas fa-trash" />)).toBeTruthy();
    });
});