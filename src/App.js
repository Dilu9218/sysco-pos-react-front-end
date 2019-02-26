import './App.css';
import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import {
  ORDER_LIST_ENDPOINT,
  ORDER_REQT_ENDPOINT,
  ITEMS_LIST_ENDPOINT,
  NEW_ORDER_ENDPOINT,
  ADD_TO_ORDER_ENDPOINT,
  BASEURL, USERTOKEN, ORDER_ENDPOINT
} from './constants';

import LogIn from './pages/LogIn';
import Register from './pages/Register';
import MainPage from './pages/mainpage';
import ErrorBoundary from './components/ErrorBoundary';

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
   * ITEMSLIST      = Every item in the database                              *
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
      ITEMSLIST: [],
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
    // Check if it's a logged user and set log status in state
    if (this.state.PASSKEY) {
      this.setState({
        ISLOGGEDIN: true
      });
    }
  }

  /****************************************************************************
   * Fetches all the orders related to the current user
   ***************************************************************************/
  GET_THE_ORDER_LIST_FOR_THIS_USER = () => {
    axios.get(ORDER_LIST_ENDPOINT,
      { headers: { 'x-access-token': this.state.PASSKEY } })
      .then(res => { this.setState({ ORDERLIST: res.data }); })
      .catch(err => { this.setState({ ORDERLIST: [] }); });
  }

  /****************************************************************************
   * This method will be called when user tries to login or logout. When he
   * logs in, save the token and delete as he logs out
   ***************************************************************************/
  LOG_USER_IN_AND_OUT = (ISLOGGEDIN, PASSKEY) => {
    this.setState({ 
      ISLOGGEDIN,
      PASSKEY
     });
    if (ISLOGGEDIN) {
      this.props.cookies.set(USERTOKEN, PASSKEY, { path: '/' });
    } else {
      this.props.cookies.remove(USERTOKEN);
    }
  }

  /****************************************************************************
   * Deletes the order from collection and updates the state so that the view
   * also gets rid of the order entry
   ***************************************************************************/
  DELETE_THIS_ORDER = (ID) => {
    axios.delete(ORDER_REQT_ENDPOINT + `/${ID}`,
      { headers: { 'x-access-token': this.state.PASSKEY } })
      .then(deletedOrder => {
        this.setState({
          ORDERLIST: [
            ...this.state.ORDERLIST.filter(order => (order._id !== ID))
          ]
        });
      }).catch(err => {
        console.log(err);
      });
  }

  /****************************************************************************
   * Fetches all the items available in collection
   ***************************************************************************/
  GET_THE_COMPLETE_ITEMS_LIST = () => {
    axios.get(ITEMS_LIST_ENDPOINT,
      { headers: { 'x-access-token': this.state.PASSKEY } })
      .then(res => { this.setState({ ITEMSLIST: res.data }); })
      .catch(err => { this.setState({ ITEMSLIST: [] }); });
  }

  CREATE_NEW_ORDER_FOR_THIS_USER = () => {
    axios.post(NEW_ORDER_ENDPOINT, {},
      { headers: { 'x-access-token': this.state.PASSKEY } })
      .then(newOrder => {
        this.setState({
          ORDERLIST: [
            newOrder.data,
            ...this.state.ORDERLIST
          ],
          CURRENTORDERID: newOrder.data._id
        });
        this.GET_THE_COMPLETE_ITEMS_LIST();
      })
      .catch(err => console.log(err));
  }

  CHECK_THIS_ORDER_OUT = () => {

  }

  ADD_ITEMS_TO_THIS_ORDER = (items) => {
    let axiosRequests = []
    for (var item in items) {
      axiosRequests.push(
        axios.post(ADD_TO_ORDER_ENDPOINT + `/${this.state.CURRENTORDERID}`,
          {
            productID: item,
            quantity: items[item]
          },
          { headers: { 'x-access-token': this.state.PASSKEY } })
      );
    }
    axios.all(axiosRequests).then(axios.spread(function (acct, perms) { }));
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
          <Header ISLOGGEDIN={this.state.ISLOGGEDIN} />

          <Route path="/home" render={props => (
            <MainPage />
          )} />

          <Route exact path="/" render={props => (
            <DecidedLandingPage isLoggedIn={this.state.isLoggedIn} />
          )} />

          <Route path="/my_orders" render={props => (
            <ErrorBoundary>
              <OrderList
                ISLOGGEDIN={this.state.ISLOGGEDIN}
                currentOrderInContext={this.state.currentOrderInContext}
                editThisOrder={this.editThisOrder}
                viewThisOrder={this.viewThisOrder}
                usertoken={this.state.PASSKEY}
                GET_THE_ORDER_LIST_FOR_THIS_USER={this.GET_THE_ORDER_LIST_FOR_THIS_USER}
                ORDERLIST={this.state.ORDERLIST}
                DELETE_THIS_ORDER={this.DELETE_THIS_ORDER} />
            </ ErrorBoundary>
          )} />

          <Route path="/create_order" render={props => (
            <ErrorBoundary>
              <CreateOrder
                CURRENTORDERID={this.state.CURRENTORDERID}
                ITEMSLIST={this.state.ITEMSLIST}
                ISLOGGEDIN={this.state.ISLOGGEDIN}
                DELETE_THIS_ORDER={this.DELETE_THIS_ORDER}
                CREATE_NEW_ORDER_FOR_THIS_USER={this.CREATE_NEW_ORDER_FOR_THIS_USER}
                ADD_ITEMS_TO_THIS_ORDER={this.ADD_ITEMS_TO_THIS_ORDER} />
            </ErrorBoundary>
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
              deleteThisOrder={this.DELETE_THIS_ORDER}
              orderID={this.state.currentOrderInContext}
              usertoken={this.state.usertoken}
              viewingOrder={this.state.viewingOrder} />
          )} />

          <Route path="/login" render={() => (<LogIn
            ISLOGGEDIN={this.state.ISLOGGEDIN}
            LOG_USER_IN_AND_OUT={this.LOG_USER_IN_AND_OUT} />)} />
          <Route path="/register" render={() => (<Register ISLOGGEDIN={this.state.ISLOGGEDIN} />)} />
          <Route path="/logout" render={() => (<LogOut LOG_USER_IN_AND_OUT={this.LOG_USER_IN_AND_OUT} />)} />

        </div>
      </Router>
    );
  }
}

export default withCookies(App);
