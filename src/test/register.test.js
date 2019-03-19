import React from 'react';
import { mountWrap } from './enzyme';
import { Redirect } from 'react-router-dom';

import Register from '../components/Register';

describe('Register', () => {

    it('redirects user to order list page if he is already logged in', () => {
        const wrapper = mountWrap(<Register ISLOGGEDIN={true} />);
        expect(wrapper.contains(<Redirect to="/my_orders" push={false} />)).toBeTruthy();
    });

    it('redirects user to register form if he is not logged in', () => {
        const wrapper = mountWrap(<Register ISLOGGEDIN={false} />);
        expect(wrapper.contains(
            <button className="btn btn-success text-uppercase" style={{ width: '100%' }} type="submit">
                Register
                  </button>
        )).toBeTruthy();
    });

});