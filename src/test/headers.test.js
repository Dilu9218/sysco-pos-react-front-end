import React from 'react';
import { shallow } from './enzyme';
import { Link } from 'react-router-dom';

import Header from '../components/Header';

describe('Navigation header', () => {

  it('renders header', () => {
    const ISLOGGEDIN = true;
    const wrapper = shallow(<Header ISLOGGEDIN={ISLOGGEDIN} />);
    // Expect the wrapper object to be defined
    expect(wrapper.contains(<Link className="nav-item nav-link" to="/logout">Logout</Link>)).toBeTruthy();
    console.log(wrapper.debug());
    /* expect(wrapper.find('.item')).toHaveLength(items.length); */
  });

  /* it('renders a list item', () => {
    const items = ['Thor', 'Loki'];
    const wrapper = shallow(<List items={items} />);

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