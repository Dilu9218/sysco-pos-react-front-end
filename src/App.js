import './App.css';
import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import {
  ORDER_LIST_ENDPOINT,
  ORDER_REQUEST_ENDPOINT,
  ITEMS_LIST_ENDPOINT,
  NEW_ORDER_ENDPOINT,
  ADD_TO_ORDER_ENDPOINT,
  ORDER_CHECKOUT_ENDPOINT,
  USERTOKEN
} from './constants';

import LogIn from './components/LogIn';
import Register from './components/Register';
import MainPage from './pages/mainpage';
import ErrorBoundary from './components/ErrorBoundary';

import Header from './components/Header';
import LogOut from './components/LogOut';
import OrderList from './components/OrderList';
import CreateOrder from './components/CreateOrder';
import ViewOrder from './components/ViewOrder';
import EditOrder from './components/EditOrder';

import { DecidedLandingPage } from './components/ConditionalComponents';

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
      CURRENTORDER: {},
      CURRENTORDERID: '',
      ITEMQUANTITY: {}
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
    axios.delete(ORDER_REQUEST_ENDPOINT + `/${ID}`,
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

  /****************************************************************************
   * Deletes the order from collection and updates the state so that the view
   * also gets rid of the order entry
   ***************************************************************************/
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

  /****************************************************************************
   * Similar to deleting an order but doesn't change item counts in the global
   * item collection as the order is purchased and the item count should not
   * increase
   ***************************************************************************/
  CHECK_THIS_ORDER_OUT = () => {
    axios.delete(ORDER_CHECKOUT_ENDPOINT + `/${this.state.CURRENTORDERID}`,
      { headers: { 'x-access-token': this.state.PASSKEY } })
      .then(checkedOut => {
        this.setState({
          ORDERLIST: [
            ...this.state.ORDERLIST.filter(order => (
              order._id !== this.state.CURRENTORDERID))
          ]
        });
      }).catch(err => {
        console.log(err);
      });
  }

  /****************************************************************************
   * Parent method adding a list of items to the current order in context. This
   * is a multiple request method where axios perform multiple web requests to
   * update each item in item collection
   ***************************************************************************/
  ADD_ITEMS_TO_THIS_ORDER = (items) => {
    let axiosRequests = [];
    for (var item in items) {
      axiosRequests.push(
        axios.post(ADD_TO_ORDER_ENDPOINT + `/${this.state.CURRENTORDERID}`,
          { productID: item, quantity: items[item] },
          { headers: { 'x-access-token': this.state.PASSKEY } })
      );
    }
    axios.all(axiosRequests).then(axios.spread(function (acct, perms) { }));
  }

  /****************************************************************************
   * Parent method taking care of updating the list of `items` provided by user
   * to update in both orders collection and do necessary adjustments in items
   * collection. This will trigger a series of axios requests to perform the
   * said tasks. After waiting for a time out, user will be redirected to order
   * list page.
   ***************************************************************************/
  UPDATE_ITEMS_IN_THIS_ORDER = (items, differences) => {
    let axiosUpdateRequests = []; // Updating existing items
    let axiosAddRequests = []; // Adding new items
    let tempItems = items;
    console.log('Before adding to queues items were these');
    console.log(items);
    console.log('Before adding to queues differences were these');
    console.log(differences);
    for (var updatedItem in differences) {
      let PATCHBODY = {
        productID: updatedItem,
        quantity: items[updatedItem],
        difference: differences[updatedItem]
      };
      console.log(PATCHBODY);
      /* axiosUpdateRequests.push(
        axios.post(ORDER_REQUEST_ENDPOINT + `/${this.state.CURRENTORDERID}`,
          PATCHBODY, { headers: { 'x-access-token': this.state.PASSKEY } })
      ); */
    }
    for (var item in items) {
      if (differences[item]) {
        continue;
      } else {
        tempItems[item] = items[item];
      }
    }
    console.log('After removing the updated items, new ones were these');
    console.log(tempItems);
    for (var newItem in tempItems) {
      /* axiosAddRequests.push(
        axios.post(ADD_TO_ORDER_ENDPOINT + `/${this.state.CURRENTORDERID}`,
          { productID: newItem, quantity: tempItems[newItem] },
          { headers: { 'x-access-token': this.state.PASSKEY } })
      ); */
    }

    /*     axios.all([...axiosUpdateRequests, ...axiosAddRequests])
          .then(axios.spread(function (acct, perms) { })); */
  }

  /****************************************************************************
   * Update state to have the given ID as the current order to use in different
   * situations. As an example, while viewing an order, this can be used inside
   * the component when mounting
   ***************************************************************************/
  SET_THIS_ORDER_AS_CURRENT = (ID) => {
    this.setState({
      CURRENTORDERID: ID
    });
  }

  /****************************************************************************
   * Refresh the item list and add the selected order to CURRENTORDER
   ***************************************************************************/
  PREPARE_TO_EDIT_OR_VIEW_THIS_ORDER = (ID) => {
    this.GET_THE_COMPLETE_ITEMS_LIST();
    let OrderList = this.state.ORDERLIST;
    for (var order in OrderList) {
      if (OrderList[order]._id === ID) {
        this.setState({
          CURRENTORDER: OrderList[order]
        });
      }
    }
  }

  ADD_THIS_ITEM = (ID, VAL) => {
    console.log(`${ID} and ${VAL}`);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header ISLOGGEDIN={this.state.ISLOGGEDIN} />

          <Route path="/login" render={() => (
            <LogIn
              ISLOGGEDIN={this.state.ISLOGGEDIN}
              LOG_USER_IN_AND_OUT={this.LOG_USER_IN_AND_OUT} />)} />
          <Route path="/register" render={() => (
            <Register ISLOGGEDIN={this.state.ISLOGGEDIN} />)} />
          <Route path="/logout" render={() => (
            <LogOut LOG_USER_IN_AND_OUT={this.LOG_USER_IN_AND_OUT} />)} />

          <Route path="/home" render={() => (<MainPage />)} />

          <Route exact path="/" render={() => (
            <ErrorBoundary>
              <DecidedLandingPage ISLOGGEDIN={this.state.ISLOGGEDIN} />
            </ErrorBoundary>
          )} />

          <Route path="/create_order" render={() => (
            <ErrorBoundary>
              <CreateOrder
                ISLOGGEDIN={this.state.ISLOGGEDIN}
                CURRENTORDERID={this.state.CURRENTORDERID}
                ITEMSLIST={this.state.ITEMSLIST}
                DELETE_THIS_ORDER={this.DELETE_THIS_ORDER}
                CREATE_NEW_ORDER_FOR_THIS_USER={this.CREATE_NEW_ORDER_FOR_THIS_USER}
                ADD_ITEMS_TO_THIS_ORDER={this.ADD_ITEMS_TO_THIS_ORDER} />
            </ErrorBoundary>
          )} />

          <Route path="/my_orders" render={() => (
            <ErrorBoundary>
              <OrderList
                ISLOGGEDIN={this.state.ISLOGGEDIN}
                ORDERLIST={this.state.ORDERLIST}
                PREPARE_TO_EDIT_OR_VIEW_THIS_ORDER={this.PREPARE_TO_EDIT_OR_VIEW_THIS_ORDER}
                GET_THE_ORDER_LIST_FOR_THIS_USER={this.GET_THE_ORDER_LIST_FOR_THIS_USER}
                SET_THIS_ORDER_AS_CURRENT={this.SET_THIS_ORDER_AS_CURRENT}
                DELETE_THIS_ORDER={this.DELETE_THIS_ORDER} />
            </ ErrorBoundary>
          )} />

          <Route path="/view_order" render={() => (
            <ErrorBoundary>
              <ViewOrder
                ISLOGGEDIN={this.state.ISLOGGEDIN}
                CURRENTORDER={this.state.CURRENTORDER}
                DELETE_THIS_ORDER={this.DELETE_THIS_ORDER}
                CHECK_THIS_ORDER_OUT={this.CHECK_THIS_ORDER_OUT} />
            </ErrorBoundary>
          )} />

          <Route path="/edit_order" render={() => (
            <ErrorBoundary>
              <EditOrder
                ISLOGGEDIN={this.state.ISLOGGEDIN}
                CURRENTORDERID={this.state.CURRENTORDERID}
                CURRENTORDER={this.state.CURRENTORDER}
                ITEMSLIST={this.state.ITEMSLIST}
                SET_THIS_ORDER_AS_CURRENT={this.SET_THIS_ORDER_AS_CURRENT}
                UPDATE_ITEMS_IN_THIS_ORDER={this.UPDATE_ITEMS_IN_THIS_ORDER} />
            </ErrorBoundary>
          )} />
        </div>
      </Router>
    );
  }
}

export default withCookies(App);
