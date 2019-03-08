import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { shallow, mountWrap } from '../enzyme';
import { applyMiddleware, createStore } from 'redux';
import rootreducer from '../../reducers/rootreducer';

import { Header, ConditionalHeader } from '../../components/Header';

function setupStore(initialState) {
    return createStore(rootreducer, { ...initialState }, applyMiddleware(thunk));
}

const middlewares = [thunk]
const mockStore = configureStore(middlewares);

const initialState = {
    isLoggedIn: false
};
const store = mockStore(initialState);


describe('<Header /> component', () => {
    it('renders the component', () => {
        const wrapper = shallow(<Header isLoggedIn={true} />);
        expect(wrapper).toMatchSnapshot();
    });
    it('mounts the component with login true', () => {
        const wrapper = mountWrap(<Header isLoggedIn={true} />);
        expect(wrapper).toMatchSnapshot();
    });
    it('mounts the component with login false', () => {
        const wrapper = mountWrap(<Header isLoggedIn={false} />);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('<ConditionalHeader /> component', () => {
    it('renders the component', () => {
        const wrapper = shallow(<ConditionalHeader isLoggedIn={true} />);
        expect(wrapper).toMatchSnapshot();
    });
    it('mounts the component with login true', () => {
        const wrapper = mountWrap(<ConditionalHeader isLoggedIn={true} />);
        expect(wrapper).toMatchSnapshot();
    });
    it('mounts the component with login false', () => {
        const wrapper = mountWrap(<ConditionalHeader isLoggedIn={false} />);
        expect(wrapper).toMatchSnapshot();
    });
});