import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount } from '../enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import ItemCounterInCreateOrder from '../../components/ItemCounterInCreateOrder';

const middlewares = [thunk];

describe('<ItemCounterInCreateOrder /> component', () => {

    const additem = jest.fn();
    const increment = jest.fn();
    const deleteitem = jest.fn();

    const initialState = {
        uac: {
            isLoggedIn: true,
            passKey: 'abcd'
        },
        ord: {
            currentOrderID: 'abcdefg111',
            itemQuantity: { 'A': 1, 'B': 2, 'C': 3 },
            itemsList: [
                { productID: 'A', price: 1 },
                { productID: 'B', price: 2 },
                { productID: 'C', price: 3 }
            ],
            total: 100,
            currentOrder: {
                _id: 'asdadasdasda',
                cartID: 'abc',
                items: [
                    {}
                ]
            }
        },
        dispatch_AddThisItemToQuantity: additem,
        dispatch_IndecrementItemFromQuantity: increment,
        dispatch_DeleteThisItemFromQuantity: deleteitem
    };
    const mockStore = configureStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('renders with correct value', () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <ItemCounterInCreateOrder
                            name={'A'}
                            min={1}
                            max={10}
                            quantity={3} />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    it('renders with correct value when item count is zero', () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <ItemCounterInCreateOrder
                            name={'A'}
                            min={1}
                            max={10}
                            quantity={0} />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    it('calls delete', () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <ItemCounterInCreateOrder
                            name={'A'}
                            min={1}
                            max={10}
                            quantity={3} />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        wrapper.find('.btn-danger').simulate('click');
        expect(wrapper.contains(<i className="fas fa-trash" />)).toBeTruthy();
    });
    it('calls increment', () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <ItemCounterInCreateOrder
                            name={'A'}
                            min={1}
                            max={10}
                            quantity={3} />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        wrapper.find('.btn-secondary').at(0).simulate('click');
        expect(wrapper.contains('+')).toBeTruthy();
    });
    it('calls increment with addition to item quantity', () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <ItemCounterInCreateOrder
                            name={'A'}
                            min={1}
                            max={10}
                            quantity={0} />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        wrapper.find('.btn-secondary').at(0).simulate('click');
        expect(wrapper.contains('+')).toBeTruthy();
    });
    it('calls increment blocked', () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <ItemCounterInCreateOrder
                            name={'A'}
                            min={1}
                            max={10}
                            quantity={10} />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        wrapper.find('.btn-secondary').at(0).simulate('click');
        expect(wrapper.contains('+')).toBeTruthy();
    });
    it('calls decrement', () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <ItemCounterInCreateOrder
                            name={'A'}
                            min={1}
                            max={10}
                            quantity={3} />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        wrapper.find('.btn-secondary').at(1).simulate('click');
        expect(wrapper.contains('−')).toBeTruthy();
    });
    it('calls decrement ignored if it is below minimum', () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <ItemCounterInCreateOrder
                            name={'A'}
                            min={1}
                            max={10}
                            quantity={0} />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        wrapper.find('.btn-secondary').at(1).simulate('click');
        expect(wrapper.contains('−')).toBeTruthy();
    });
    it('calls decrement blocked', () => {
        const wrapper = mount(
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <ItemCounterInCreateOrder
                            name={'A'}
                            min={1}
                            max={10}
                            quantity={1} />
                    </Router>
                </Provider>
            </CookiesProvider>
        );
        wrapper.find('.btn-secondary').at(1).simulate('click');
        expect(wrapper.contains('−')).toBeTruthy();
    });
});