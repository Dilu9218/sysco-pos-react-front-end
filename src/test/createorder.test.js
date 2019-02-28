import React from 'react';
import { shallowWrap, mountWrap } from './enzyme';

import CreateOrder from '../components/CreateOrder';

describe('Create Order', () => {

    it('displays a list of items to create order', () => {
        const wrapper = mountWrap(<CreateOrder
            ISLOGGEDIN={true}
            CURRENTORDERID={12441232}
            ITEMSLIST={[]}
            ITEMQUANTITY={{}}
            TOTAL={14234.33}
            DELETE_THIS_ORDER={() => { }}
            DELETE_THIS_ITEM={() => { }}
            INDECCREMENT_ITEM_COUNT={() => { }}
            CREATE_NEW_ORDER_FOR_THIS_USER={() => { }}
            CLEAR_ORDER_ADDING_PROCESS={() => { }}
            ADD_THIS_ITEM_TO_ITEMQUANTITY={() => { }}
            ADD_ITEMS_TO_THIS_ORDER={() => { }} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('redirects to login page if not logged in', () => {
        const wrapper = shallowWrap(<CreateOrder
            ISLOGGEDIN={false}
            CURRENTORDERID={12441232}
            ITEMSLIST={[]}
            ITEMQUANTITY={{}}
            TOTAL={14234.33}
            DELETE_THIS_ORDER={() => { }}
            DELETE_THIS_ITEM={() => { }}
            INDECCREMENT_ITEM_COUNT={() => { }}
            CREATE_NEW_ORDER_FOR_THIS_USER={() => { }}
            CLEAR_ORDER_ADDING_PROCESS={() => { }}
            ADD_THIS_ITEM_TO_ITEMQUANTITY={() => { }}
            ADD_ITEMS_TO_THIS_ORDER={() => { }} />);
        expect(wrapper).toMatchSnapshot();
    });
});