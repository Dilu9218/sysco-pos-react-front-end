import React from 'react';
import { mountWrap } from './enzyme';
import { Redirect } from 'react-router-dom';

import LogIn from '../components/LogIn';

describe('LogIn', () => {

  it('redirects user to order list page if he is already logged in', () => {
    const wrapper = mountWrap(<LogIn ISLOGGEDIN={true}
      LOG_USER_IN_AND_OUT={() => { }} />);
    expect(wrapper.contains(<Redirect to="/my_orders" push={false} />)).toBeTruthy();
  });

  it('redirects user to login form if he is not logged in', () => {
    const wrapper = mountWrap(<LogIn ISLOGGEDIN={false}
      LOG_USER_IN_AND_OUT={() => { }} />);
    expect(wrapper.contains(
      <button className="btn btn-primary text-uppercase my-3" style={{ width: '100%' }} type="submit">
        Sign in
    </button>
    )).toBeTruthy();
  });

});