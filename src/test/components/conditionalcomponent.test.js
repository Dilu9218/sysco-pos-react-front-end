import React from 'react';
import { mountWrap } from '../enzyme';

import { DecidedLandingPage } from '../../components/ConditionalComponents';

describe('<DecidedLandingPage /> component', () => {

    it('Redirects to orders list when logged in', () => {
        const wrapper = mountWrap(
            <DecidedLandingPage isLoggedIn={true} />
        );
        expect(wrapper).toMatchSnapshot();
    });
    it('Redirects to login page when logged out', () => {
        const wrapper = mountWrap(
            <DecidedLandingPage isLoggedIn={false} />
        );
        expect(wrapper).toMatchSnapshot();
    });
});