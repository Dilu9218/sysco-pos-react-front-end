import React from 'react';
import { shallow, mount, mountWrap } from './enzyme';
import { Redirect } from 'react-router-dom'

import LogIn from '../components/LogIn';

describe('LogIn', () => {

    it('renders the login route as expected when a user is already logged in', () => {
        const wrapper = mountWrap(<LogIn ISLOGGEDIN={true}
            LOG_USER_IN_AND_OUT={() => { }} />);
        expect(wrapper.contains(<Redirect to="/my_orders" push={false} />)).toBeTruthy();
    });

    it('renders the logout route as expected', () => {
        const wrapper = mountWrap(<LogIn ISLOGGEDIN={false}
            LOG_USER_IN_AND_OUT={() => { }} />);
        expect(wrapper.contains(<button className="btn btn-primary text-uppercase my-3" style={{ width: '100%' }} type="submit">
            Sign in</button>)).toBeTruthy();
        console.log(wrapper.debug());
    });


    /* it('renders login header if user is not logged in', () => {
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
    }); */

    /* it('renders a list item', () => {
      const items = ['Thor', 'Loki'];
      const wrapper = shallow(<List items={items} />);
      //console.log(wrapper.debug());
  
      // Check if an element in the Component exists
      expect(wrapper.contains(<li key='Thor' className="item">Thor</li >)).toBeTruthy();
    });
  
    it('renders correct text in item', () => {
      const items = ['John', 'James', 'Luke'];
      const wrapper = shallow(<List items={items} />);
  
      //Expect the child of the first item to be an array
      expect(wrapper.find('.item').get(0).props.children).toEqual('John');
    }); */
});