import React from 'react';
import { shallow } from './enzyme';
import { Link } from 'react-router-dom';

import Header, { ConditionalHeader } from '../components/Header';

describe('Navigation header', () => {

  it('renders the header as expected', () => {
    const ISLOGGEDIN = true;
    const wrapper = shallow(<Header ISLOGGEDIN={ISLOGGEDIN} />);
    expect(wrapper.contains(<header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ConditionalHeader ISLOGGEDIN={ISLOGGEDIN} />
      </nav>
    </header>)).toBeTruthy();
  });

  it('renders login header if user is not logged in', () => {
    const ISLOGGEDIN = false;
    const wrapper = shallow(<ConditionalHeader ISLOGGEDIN={ISLOGGEDIN} />);
    expect(wrapper.contains(<div className="collapse navbar-collapse">
      <Link className="navbar-brand" style={{ paddingTop: '0px' }} to="/home" replace={false}>
        Sysco PoS System
        </Link>
      <div className="navbar-nav ml-auto">
        <Link className="nav-item nav-link" to="/login" replace={false}>
          Login
          </Link>
        <Link className="nav-item nav-link" to="/register" replace={false}>
          Register
          </Link>
      </div>
    </div>)).toBeTruthy();
  });

  it('renders login header if user is logged in', () => {
    const ISLOGGEDIN = true;
    const wrapper = shallow(<ConditionalHeader ISLOGGEDIN={ISLOGGEDIN} />);
    expect(wrapper.contains(<div className="navbar-nav my-2 my-lg-0">
      <Link className="nav-item nav-link" to="/logout" replace={false}>
        Logout
    </Link>
    </div>)).toBeTruthy();
    expect(wrapper.contains(<div className="navbar-nav mr-auto mt-2 mt-lg-0">
      <Link className="nav-item nav-link" to="/my_orders" replace={false}>
        My Orders
    </Link>
      <Link className="nav-item nav-link" to="/create_order" replace={false}>
        Create Order
    </Link>
    </div>)).toBeTruthy();
  });

});