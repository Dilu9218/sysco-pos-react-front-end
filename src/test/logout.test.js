import React from 'react';
import { mountWrap } from './enzyme';
import LogOut from '../components/LogOut';

describe('Logout', () => {

    it('renders the logout route as expected', () => {
        const wrapper = mountWrap(<LogOut LOG_USER_IN_AND_OUT={() => { }} />);
        expect(wrapper.length !== 0).toBeTruthy();
    });
});