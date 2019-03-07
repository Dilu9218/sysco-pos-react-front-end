import React from 'react';
import { shallow } from '../enzyme';

import MainPage from '../../pages/mainpage';

describe('Main page', () => {

    it('renders the main landing page as expected', () => {
        const wrapper = shallow(<MainPage />);
        expect(wrapper).toMatchSnapshot();
    });
});