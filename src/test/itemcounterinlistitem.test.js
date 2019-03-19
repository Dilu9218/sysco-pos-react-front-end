import React from 'react';
import { mountWrap } from './enzyme';

import ItemCounterInListItem from '../components/ItemCounterInListItem';

describe('Item Counter In List Item', () => {

    it('displays a list of items to edit order', () => {
        const wrapper = mountWrap(<ItemCounterInListItem
            NAME={`Item`} MIN={0} MAX={34}
            COUNT={34}
            ADD_THIS_ITEM_TO_ITEMQUANTITY={() => { }}
            INDECCREMENT_ITEM_COUNT={() => { }}
            DELETE_THIS_ITEM={() => { }} />);
        expect(wrapper).toMatchSnapshot();
    });
});