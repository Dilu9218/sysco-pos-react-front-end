import React from 'react';
import { mountWrap } from './enzyme';

import ListItemInOrderDetailView from '../components/ListItemInOrderDetailView';

describe('List Item In Order', () => {

    it('displays a list of items to edit order', () => {
        const wrapper = mountWrap(<ListItemInOrderDetailView
            key={123123}
            singleItem={{ price: 34.33 }}
        />);
        expect(wrapper).toMatchSnapshot();
    });
});