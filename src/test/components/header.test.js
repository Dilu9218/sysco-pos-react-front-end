import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount, render } from '../enzyme';
import toJson from 'enzyme-to-json';

import Header from '../../components/Header';

const middlewares = [thunk]
const mockStore = configureStore(middlewares);

const initialState = {
    isLoggedIn: false
};
const store = mockStore(initialState);


describe('<Header />', () => {
    describe('render()', () => {
        test('renders the component', () => {
            const wrapper = shallow(<Header isLoggedIn={true} />);
        });
    });
});