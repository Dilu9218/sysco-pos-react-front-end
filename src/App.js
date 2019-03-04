import './App.css';
import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import PropTypes, { instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { RE_LOG_USER_IN } from './actions/useraccountcontrolactions';
import { USERTOKEN } from './constants';

import TTT from './components/TTT';

import MainPage from './pages/mainpage';
import LogIn from './components/LogIn';
import Register from './components/Register';
import ErrorBoundary from './components/ErrorBoundary';

import OrderList from './components/OrderList';

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
    if (props.cookies.get(USERTOKEN)) {
      props.RE_LOG_USER_IN(props.cookies.get(USERTOKEN));
    }
  }

  render() {
    return (
      <Router>
        <div className="App">

          <Header />

          <Route exact path="/" render={() => (<MainPage />)} />

          <Route path="/login" render={() => (
            <ErrorBoundary><LogIn /></ErrorBoundary>
          )} />
          <Route path="/register" render={() => (<Register />)} />
          <Route path="/logout" render={() => (<LogOut />)} />

          <Route path="/my_orders" render={() => (
            <OrderList />
          )} />

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