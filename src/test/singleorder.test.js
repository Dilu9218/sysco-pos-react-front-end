import React from 'react';
import { mountWrap } from './enzyme';

import SingleOrder from '../components/SingleOrder';

describe('Single Order', () => {

    it('displays a single order', () => {
        const wrapper = mountWrap(<SingleOrder
            key={213123123}
            ORDER={{ _id: 4324, items: [] }}
            PREPARE_TO_EDIT_OR_VIEW_THIS_ORDER={() => { }}
            DELETE_THIS_ORDER={() => { }}
            SET_THIS_ORDER_AS_CURRENT={() => { }} />);
        expect(wrapper).toMatchSnapshot();
    });
});