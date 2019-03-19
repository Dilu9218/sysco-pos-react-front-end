import React from 'react';
import { mountWrap } from './enzyme';

import ListItemInSingleOrder from '../components/ListItemInSingleOrder';

describe('ListItemInSingleOrder', () => {

    it('displays item in a single order', () => {
        const wrapper = mountWrap(<ListItemInSingleOrder
            key={1244}
            singleItem={{ price: 34.44 }}
        />);
        expect(wrapper).toMatchSnapshot();
    });
});