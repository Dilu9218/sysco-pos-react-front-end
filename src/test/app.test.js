import React from 'react';
import { shallowWrap } from './enzyme';

import App from '../App';

describe('Main app', () => {

    it('displays the app', () => {
        const wrapper = shallowWrap(<App />);
        expect(wrapper).toMatchSnapshot();
    });
});