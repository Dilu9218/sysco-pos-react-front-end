import React from 'react';
import { mountWrap } from './enzyme';

import ViewOrder from '../components/ViewOrder';

describe('View Order', () => {

    it('displays order details if he is already logged in', () => {
        const wrapper = mountWrap(<ViewOrder
            ISLOGGEDIN={true}
            CURRENTORDER={{ _id: 123123, items: [] }}
            TOTAL={1000}
            DELETE_THIS_ORDER={() => { }}
            CHECK_THIS_ORDER_OUT={() => { }} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('redirects user to order list page if he is already logged in', () => {
        mountWrap(<ViewOrder
            ISLOGGEDIN={false}
            CURRENTORDER={{ _id: 123123, items: [] }}
            TOTAL={1000}
            DELETE_THIS_ORDER={() => { }}
            CHECK_THIS_ORDER_OUT={() => { }} />);
    });

});