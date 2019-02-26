import './App.css';
import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import {
  ORDER_LIST_ENDPOINT,
  BASEURL, USERTOKEN, ORDER_ENDPOINT, ITEM_ENDPOINT, USER_ENDPOINT
} from './constants';

import LogIn from './pages/LogIn';
import Register from './pages/register';
import MainPage from './pages/mainpage';

import Header from './components/Header';
import LogOut from './components/LogOut';
import OrderList from './components/OrderList';
import CreateOrder from './components/CreateOrder';
import ViewOrder from './components/ViewOrder';

import { DecidedLandingPage, GoToEditOrder } from './components/ConditionalComponents';

class App extends Component {

  /****************************************************************************
   * APP STATE == The complete variable states of app circulated among others *
   * ======================================================================== *
   * PASSKEY        = Usertoken related to the logged in user                 *
   * ISLOGGEDIN     = Log status of user                                      *
   * ITEMLIST       = Every item in the database                              *
   * ORDERLIST      = Every order user has placed                             *
   * CURRENTORDER   = Order being created, viewed, edited, deleted            *
   * CURRENTORDERID = ID of Order being created, viewed, edited, deleted      *
   * ITEMQUANTITY   = ProductIDs & quantities of items in an order            *
   ***************************************************************************/
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  /****************************************************************************
   * Constructor: Initiates state of app
   ***************************************************************************/
  constructor(props) {
    super(props);
    // This will the app state for the whole project
    this.state = {
      PASSKEY: props.cookies.get(USERTOKEN),
      ISLOGGEDIN: false,
      ITEMLIST: [],
      ORDERLIST: [],
      CURRENTORDER: [],
      CURRENTORDERID: '',
      ITEMQUANTITY: {},
      // TODO: Delete the underlying states and use the ones above
      orderList: [],
      allItemsList: [],
      currentOrderInContext: '',
      viewingOrder: {},
      isLoggedIn: false,
      usertoken: props.cookies.get('usertoken')
    };
  }

  /****************************************************************************
   * Life Cycle Methods
   ***************************************************************************/
  componentDidMount() {
    // Check if it's a logged user. If he is logged in, we can set ISLOGGEDIN
    // as true and start fetching his order list immediate when the app starts
    if (this.state.PASSKEY) {
      this.setState({
        ISLOGGEDIN: true
      });
      this.GET_THE_ORDER_LIST_FOR_THIS_USER();
    }
  }

  getDerivedStateFromError() {
    console.error('Error DS happened at App.js');
  }

  componentDidCatch() {
    console.error('Error happened at App.js');
  }

  /****************************************************************************
   * Supporting functions to access API and update state
   ***************************************************************************/
  GET_THE_ORDER_LIST_FOR_THIS_USER = () => {
    axios.get(ORDER_LIST_ENDPOINT,
      { headers: { 'x-access-token': this.state.PASSKEY } })
      .then(res => {
        console.log(res.data);
        this.setState({
          ORDERLIST: res.data
        });
      })
      .catch(err => console.error(err));
  }

  // This method will be called when user tries to login or logout
  LOG_USER_IN_AND_OUT = (ISLOGGEDIN, PASSKEY) => {
    this.setState({
      ISLOGGEDIN
    });
    // When user logs out, we have to remove the saved token
    if (ISLOGGEDIN) {
      this.props.cookies.set(USERTOKEN, PASSKEY, { path: '/' });
    } else {
      this.props.cookies.remove(USERTOKEN);
    }
  }

  handleUserLogActivities = (isLoggedIn, usertoken) => {
    this.setState({
      isLoggedIn
    });
    const { cookies } = this.props;
    if (!isLoggedIn) {
      cookies.remove('usertoken');
    } else {
      cookies.set('usertoken', usertoken, { path: '/' });

    }
  }

  viewThisOrder = (id) => {
    this.setState({
      currentOrderInContext: id
    });
  }

  editThisOrder = (id) => {
    axios.get(`${BASEURL}/${ORDER_ENDPOINT}/order/${id}`,
      { headers: { 'x-access-token': this.state.PASSKEY } })
      .then(order => {
        let orderItemQuantities = {};
        for (var i in order.data.items) {
          orderItemQuantities[order.data.items[i].productID] = order.data.items[i].quantity;
        }
        this.setState({
          currentOrderInContext: id,
          viewingOrder: orderItemQuantities
        });
      }).catch(err => {
        console.log(err);
      });
  }

  deleteThisOrder = (id) => {
    axios.delete(`${BASEURL}/${ORDER_ENDPOINT}/order/${id}`,
      { headers: { 'x-access-token': this.state.PASSKEY } })
      .then(delOrder => {
        this.setState({
          orderList: [...this.state.orderList.filter(order => (order._id !== id))]
        });
      }).catch(err => {
        console.log(err);
      });
  }

  createNewOrderForThisUser = () => {
    axios.post(`${BASEURL}/${ORDER_ENDPOINT}/order/new`, {},
      { headers: { 'x-access-token': this.state.PASSKEY } })
      .then(newOrder => {
        this.setState({
          orderList: [
            newOrder.data,
            ...this.state.orderList
          ],
          currentOrderInContext: newOrder.data._id
        });
        this.fetchAllItemsList();
      })
      .catch(err => console.log(err));
  }

  fetchOrderList = () => {
    axios.get(`${BASEURL}/${ORDER_ENDPOINT}/list`,
      { headers: { 'x-access-token': this.state.PASSKEY } })
      .then(res => {
        this.setState({
          orderList: res.data
        });
      })
      .catch(err => console.error(err));
  }

  fetchAllItemsList = () => {
    axios.get(`${BASEURL}/${ORDER_ENDPOINT}/items`,
      { headers: { 'x-access-token': this.state.PASSKEY } })
      .then(res => {
        this.setState({
          allItemsList: res.data
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header logStatus={this.state.ISLOGGEDIN} />

          <Route path="/home" render={props => (
            <MainPage />
          )} />

          <Route exact path="/" render={props => (
            <DecidedLandingPage isLoggedIn={this.state.isLoggedIn} />
          )} />

          <Route path="/my_orders" render={props => (
            <OrderList
              currentOrderInContext={this.state.currentOrderInContext}
              editThisOrder={this.editThisOrder}
              viewThisOrder={this.viewThisOrder}
              usertoken={this.state.PASSKEY}
              orderList={this.state.ORDERLIST}
              fetchOrderList={this.fetchOrderList}
              deleteThisOrder={this.deleteThisOrder} />
          )} />

          <Route path="/create_order" render={props => (
            <CreateOrder
              usertoken={this.state.usertoken}
              deleteThisOrder={this.deleteThisOrder}
              createNewOrderForThisUser={this.createNewOrderForThisUser}
              currentOrderInContext={this.state.currentOrderInContext}
              allItemsList={this.state.allItemsList} />
          )} />

          <Route path="/edit_order" render={props => (
            <GoToEditOrder
              usertoken={this.state.usertoken}
              viewingOrder={this.state.viewingOrder}
              fetchAllItemsList={this.fetchAllItemsList}
              currentOrderInContext={this.state.currentOrderInContext}
              allItemsList={this.state.allItemsList} />
          )} />

          <Route path="/view_order" render={props => (
            <ViewOrder
              deleteThisOrder={this.deleteThisOrder}
              orderID={this.state.currentOrderInContext}
              usertoken={this.state.usertoken}
              viewingOrder={this.state.viewingOrder} />
          )} />

          <Route path="/login" render={() => (<LogIn LOG_USER_IN_AND_OUT={this.LOG_USER_IN_AND_OUT} />)} />
          <Route path="/register" render={() => (<Register />)} />
          <Route path="/logout" render={() => (<LogOut LOG_USER_IN_AND_OUT={this.LOG_USER_IN_AND_OUT} />)} />

        </div>
      </Router>
    );
  }
}

export default withCookies(App);
