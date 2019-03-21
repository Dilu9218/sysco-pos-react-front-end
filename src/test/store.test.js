import React from "react";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { mount } from "./enzyme";
import store from "../redux.store";

describe("Redux store", () => {
    it("imports redux store", () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store} />
            </CookiesProvider>
        );
        expect(wrapper).toMatchSnapshot();
    });
});