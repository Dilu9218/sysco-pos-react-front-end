import React from 'react';
import { shallowWrap, mountWrap } from './enzyme';

import EditOrder from '../components/EditOrder';

describe('Create Order', () => {

    it('displays a list of items to edit order', () => {
        const wrapper = mountWrap(<EditOrder
            ISLOGGEDIN={true}
            CURRENTORDERID={124134234}
            CURRENTORDER={{ _id: 23346, items: [] }}
            ITEMQUANTITY={{}}
            CLONEITEMQUANTITY={{}}
            TOTAL={123123.22}
            ITEMSLIST={[]}
            SET_THIS_ORDER_AS_CURRENT={() => { }}
            UPDATE_ITEMS_IN_THIS_ORDER={() => { }}
            DELETE_THIS_ITEM={() => { }}
            CLEAR_ORDER_UPDATE_PROCESS={() => { }}
            ADD_THIS_ITEM_TO_ITEMQUANTITY={() => { }}
            INDECCREMENT_ITEM_COUNT={() => { }} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('redirects to login page if not logged in', () => {
        const wrapper = shallowWrap(<EditOrder
            ISLOGGEDIN={false}
            CURRENTORDERID={124134234}
            CURRENTORDER={{ _id: 23346, items: [] }}
            ITEMQUANTITY={{}}
            CLONEITEMQUANTITY={{}}
            TOTAL={123123.22}
            ITEMSLIST={{}}
            SET_THIS_ORDER_AS_CURRENT={() => { }}
            UPDATE_ITEMS_IN_THIS_ORDER={() => { }}
            DELETE_THIS_ITEM={() => { }}
            CLEAR_ORDER_UPDATE_PROCESS={() => { }}
            ADD_THIS_ITEM_TO_ITEMQUANTITY={() => { }}
            INDECCREMENT_ITEM_COUNT={() => { }} />);
        expect(wrapper).toMatchSnapshot();
    });
});