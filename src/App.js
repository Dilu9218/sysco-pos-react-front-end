import './App.css';
import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import PropTypes, { instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { RE_LOG_USER_IN } from './actions/useraccountcontrolactions';
import { USERTOKEN } from './constants';

import MainPage from './pages/mainpage';
import LogIn from './components/LogIn';
import Register from './components/Register';

import OrderList from './components/OrderList';
import ViewOrder from './components/ViewOrder';
import CreateOrder from './components/CreateOrder';

import Header from './components/Header';
import LogOut from './components/LogOut';

/***************************************************************************************************
 * TOP LEVEL COMPONENT. Houses every sub-component and handles routes.
 **************************************************************************************************/
class App extends Component {

  constructor(props) {
    super(props);
    // When a cookie is present, user has already logged in. Dispatch action to update initial state 
    // with saved credentials and set logged status as true along with the cookie as PASSKEY
    let savedCookie = props.cookies.get(USERTOKEN);
    if (savedCookie) {
      props.RE_LOG_USER_IN(savedCookie);
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" render={() => (<MainPage />)} />

          <Route path="/login" render={() => (<LogIn />)} />
          <Route path="/register" render={() => (<Register />)} />
          <Route path="/logout" render={() => (<LogOut />)} />

          <Route path="/my_orders" render={() => (<OrderList />)} />
          <Route path="/view_order" render={() => (<ViewOrder />)} />
          <Route path="/create_order" render={() => (<CreateOrder />)} />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  RE_LOG_USER_IN: PropTypes.func.isRequired,
  cookies: instanceOf(Cookies).isRequired
};

export default withCookies(connect(null, { RE_LOG_USER_IN })(App));