import React from 'react';
import { mountWrap } from './enzyme';

import OrderList from '../components/OrderList';

describe('OrderList', () => {

    it('displays all the orders', () => {
        const wrapper = mountWrap(<OrderList
            ISLOGGEDIN={true}
            ORDERLIST={[]}
            GET_THE_COMPLETE_ITEMS_LIST={() => { }}
            PREPARE_TO_EDIT_OR_VIEW_THIS_ORDER={() => { }}
            GET_THE_ORDER_LIST_FOR_THIS_USER={() => { }}
            SET_THIS_ORDER_AS_CURRENT={() => { }}
            DELETE_THIS_ORDER={() => { }}
        />);
        expect(wrapper).toMatchSnapshot();
    });
});