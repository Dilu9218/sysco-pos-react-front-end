import './App.css';
import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import PropTypes, { instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { RE_LOG_USER_IN } from './actions/useraccountcontrolactions';
import { USERTOKEN } from './constants';

// eslint-disable-next-line
import TTT from './components/TTT';

import MainPage from './pages/mainpage';
import LogIn from './components/LogIn';
import Register from './components/Register';

import OrderList from './components/OrderList';
import ViewOrder from './components/ViewOrder';
import CreateOrder from './components/CreateOrder';
import EditOrder from './components/EditOrder';

import Header from './components/Header';
import LogOut from './components/LogOut';

class App extends Component {

  /****************************************************************************
   * Constructor: Initiates the state of app
   ***************************************************************************/
  constructor(props) {
    super(props);
    // When the cookie is present, user has already logged in. Dispatch action
    // to update initial state with saved credentials
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
          <Route path="/edit_order" render={() => (<EditOrder />)} />
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