import React from 'react';
import { shallow, mountWrap } from './enzyme';

import Header from '../components/Header';

describe('Navigation header', () => {

  it('renders the header as expected', () => {
    const wrapper = shallow(<Header ISLOGGEDIN={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders login header if user is not logged in', () => {
    const wrapper = mountWrap(<Header ISLOGGEDIN={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders login header if user is logged in', () => {
    const wrapper = mountWrap(<Header ISLOGGEDIN={true} />);
    expect(wrapper).toMatchSnapshot();
  });

});