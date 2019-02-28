import React from 'react';
import { shallowWrap, mount, mountWrap } from './enzyme';

import LogIn from '../components/LogIn';

describe('LogIn', () => {

  it('redirects user to order list page if he is already logged in', () => {
    const wrapper = mountWrap(<LogIn ISLOGGEDIN={true}
      LOG_USER_IN_AND_OUT={() => { }} />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('redirects user to login form if he is not logged in', () => {
    const wrapper = mountWrap(<LogIn ISLOGGEDIN={false}
      LOG_USER_IN_AND_OUT={() => { }} />);
    expect(wrapper).toMatchSnapshot();
  });

});