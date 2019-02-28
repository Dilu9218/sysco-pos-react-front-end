import React from 'react';
import { shallow, shallowWrap } from './enzyme';
import { Link } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';

describe('Error boundary', () => {

    it('renders the error boundary as expected when there is no error', () => {
        const wrapper = shallow(<ErrorBoundary><p>Hello</p></ErrorBoundary>);
        expect(wrapper.contains(<p>Hello</p>)).toBeTruthy();
    });

    it('renders the error boundary as expected when there is an error', () => {
        const wrapper = shallowWrap(
            <ErrorBoundary >
                <p>Hello</p>
            </ErrorBoundary>
        );
        wrapper.setState({ hasError: true });
        expect(wrapper.contains(<span className="badge badge-dark" style={{ padding: '50px' }}>
            Cannot load the website ... <br /><br />Want to go back to
        <br /><br /><Link to="/home">Home Page</Link>?</span>)).toBeTruthy();
    });
});