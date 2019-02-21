import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { BrowserRouter as Router, Route/* , Redirect */ } from 'react-router-dom';
import Header from './components/Header';
import './App.css';
import LogOut from './components/LogOut';
import LogIn from './pages/login';
import Register from './pages/register';
import AboutUs from './pages/about';
import OrderList from './components/OrderList';

function LoginLogoutSection(p) {
  if (!p.logStatus) {
    return (
      <Route path="/login" render={props => (
        <LogIn markLogStatus={p.markLogStatus} />
      )} />
    );
  } else {
    return (
      <Route path="/orderlistview" />
    );
  }
}

function RegisterSection(p) {
  if (!p.logStatus) {
    return (
      <Route path="/register" render={props => (
        <Register />
      )} />
    );
  } else {
    return null
  }
}

class App extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      logButton: 'Login',
      isLoggedIn: false,
      usertoken: cookies.get('usertoken')
    };
  }

  componentDidMount() {
    if (this.state.usertoken) {
      console.warn(this.state.usertoken);
      this.setState({
        isLoggedIn: true
      });
    }
  }

  markLogStatus = (status, usertoken) => {
    // Set logged in status
    this.setState({
      isLoggedIn: status
    });
    const { cookies } = this.props;
    if (!status) {
      // Remove token if user logs out
      cookies.remove('usertoken');
    } else {
      cookies.set('usertoken', usertoken, { path: '/' });
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header logStatus={this.state.isLoggedIn} />
          <Route exact path="/" render={props => (
            <React.Fragment>
              <div style={{ width: '80%', margin: 'auto', padding: '25px' }} className="todo-body">
                <p>Main</p>
              </div>
            </React.Fragment>
          )} />
          <Route path="/orderlist" render={props => (
            <OrderList usertoken={this.state.usertoken} />
          )} />
          <Route path="/add" render={props => (
            <React.Fragment>
              <p>Add stuff</p>
            </React.Fragment>
          )} />
          <Route path="/logout" render={props => (
            <LogOut markLogStatus={this.markLogStatus} />
          )} />
          <LoginLogoutSection logStatus={this.state.isLoggedIn} markLogStatus={this.markLogStatus} />
          <RegisterSection logStatus={this.state.isLoggedIn} />
          <Route path="/about" render={props => (
            <AboutUs />
          )} />
        </div>
      </Router>
    );
  }
}

export default withCookies(App);
