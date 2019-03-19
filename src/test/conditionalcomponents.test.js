import React from 'react';
import { shallow } from './enzyme';

import { DecidedLandingPage } from '../components/ConditionalComponents';

describe('Deciding Landing Page', () => {

  it('renders the order list when user is logged in', () => {
    const wrapper = shallow(<DecidedLandingPage ISLOGGEDIN={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the login page when user is not logged in', () => {
    const wrapper = shallow(<DecidedLandingPage ISLOGGEDIN={false} />);
    expect(wrapper).toMatchSnapshot();
  });

});