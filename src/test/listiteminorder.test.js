import React from 'react';
import { mountWrap } from './enzyme';

import ListItemInOrder from '../components/ListItemInOrder';

describe('ListItemInOrder', () => {

    it('displays item in an order', () => {
        const wrapper = mountWrap(<ListItemInOrder
            key={12123}
            ITEM={{ price: 45 }}
            NAME={`Item`}
            CLONEITEMQUANTITY={{}}
            ITEMQUANTITY={0}
            ADD_THIS_ITEM_TO_ITEMQUANTITY={() => { }}
            DELETE_THIS_ITEM={() => { }}
            INDECCREMENT_ITEM_COUNT={() => { }}
        />);
        expect(wrapper).toMatchSnapshot();
    });
});