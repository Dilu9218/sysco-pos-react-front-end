import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { mount } from "../enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import ItemCounterInListItem from "../../components/ItemCounterInListItem";

const middlewares = [thunk];

describe("<ItemCounterInListItem /> component", () => {

    const increment = jest.fn();
    const deleteitem = jest.fn();

    const initialState = {
        uac: {
            isLoggedIn: true,
            passKey: "abcd"
        },
        ord: {
            currentOrderID: "abcdefg111",
            itemQuantity: { "A": 1, "B": 2, "C": 3 },
            itemsList: [
                { _id: "a", productID: "A", price: 1 },
                { _id: "b", productID: "B", price: 2 },
                { _id: "c", productID: "C", price: 3 }
            ],
            total: 100,
            currentOrder: {
                _id: "asdadasdasda",
                cartID: "abc",
                items: [
                    {}
                ]
            }
        },
        dispatch_QuickIndecrementItemFromQuantity: increment,
        dispatch_QuickDeleteThisItemFromQuantity: deleteitem
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it("renders with correct value", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <ItemCounterInListItem
                            name={"A"}
                            min={1}
                            max={10}
                            quantity={3} />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    it("calls delete", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <ItemCounterInListItem
                            name={"A"}
                            min={1}
                            max={10}
                            quantity={3} />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        wrapper.find(".btn-danger").simulate("click");
        expect(wrapper.contains(<i className="fas fa-trash" />)).toBeTruthy();
    });
    it("calls increment", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <ItemCounterInListItem
                            name={"A"}
                            count={5}
                            min={1}
                            max={10}
                            quantity={3} />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        wrapper.find(".btn-secondary").at(0).simulate("click");
        expect(wrapper.contains("+")).toBeTruthy();
    });
    it("calls increment blocked", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <ItemCounterInListItem
                            name={"A"}
                            count={10}
                            min={1}
                            max={10}
                            quantity={3} />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        wrapper.find(".btn-secondary").at(0).simulate("click");
        expect(wrapper.contains("+")).toBeTruthy();
    });
    it("calls decrement", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <ItemCounterInListItem
                            name={"A"}
                            count={5}
                            min={1}
                            max={10}
                            quantity={3} />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        wrapper.find(".btn-secondary").at(1).simulate("click");
        expect(wrapper.contains("−")).toBeTruthy();
    });

    it("calls decrement blocked", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <ItemCounterInListItem
                            name={"A"}
                            count={1}
                            min={1}
                            max={10}
                            quantity={3} />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        wrapper.find(".btn-secondary").at(1).simulate("click");
        expect(wrapper.contains("−")).toBeTruthy();
    });
});