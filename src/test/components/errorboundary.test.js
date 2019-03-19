import React from 'react';
import { mountWrap } from '../enzyme';

import ErrorBoundary from '../../components/ErrorBoundary';

describe('<ErrorBoundary /> component', () => {

    it('renders with an error prompt', () => {
        const wrapper = mountWrap(
            <ErrorBoundary>
                <p>Hello</p>
            </ErrorBoundary>
        );
        wrapper.setState({
            hasError: true
        });
        expect(wrapper).toMatchSnapshot();
    });
    it('renders children when there is no error', () => {
        const wrapper = mountWrap(
            <ErrorBoundary>
                <p>Hello</p>
            </ErrorBoundary>
        );
        wrapper.setState({
            hasError: false
        });
        expect(wrapper).toMatchSnapshot();
    });
});