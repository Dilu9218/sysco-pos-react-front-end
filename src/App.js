import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import './App.css';
import LogOut from './components/LogOut';
import LogIn from './pages/login';
import Register from './pages/register';
import AboutUs from './pages/about';

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

  state = {
    logButton: 'Login',
    isLoggedIn: false
  }

  markLogStatus = (status) => {
    this.setState({
      isLoggedIn: status
    })
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

export default App;
