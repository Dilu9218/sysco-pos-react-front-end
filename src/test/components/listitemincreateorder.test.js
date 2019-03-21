import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { mount } from "../enzyme";
import { BrowserRouter as Router } from "react-router-dom";

import ListItemInCreateOrder from "../../components/ListItemInCreateOrder";

const middlewares = [thunk];

describe("<ListItemInCreateOrder /> component renders", () => {

    const singleItem = {
        productID: "A",
        productTitle: "AAA",
        description: "A aasasas",
        quantity: 100,
        price: 25
    }

    const initialState = {
        uac: { passKey: "" },
        ord: {
            itemQuantity: {},
            itemsList: [{
                productID: "A",
                quantity: 1
            }],
            currentOrder: {}
        },
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    })

    it("renders", () => {
        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <ListItemInCreateOrder item={singleItem} />
                </Router>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
});