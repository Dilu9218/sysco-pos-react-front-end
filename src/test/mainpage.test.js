import React from 'react';
import { shallow } from './enzyme';

import MainPage from '../pages/mainpage';

describe('Main page', () => {

    it('renders the main landing page as expected', () => {
        const wrapper = shallow(<MainPage />);
        expect(wrapper.contains(<h1 className="display-4">
            Mini-project: a simple Point of Sale (POS) system</h1>)).toBeTruthy();
    });
});