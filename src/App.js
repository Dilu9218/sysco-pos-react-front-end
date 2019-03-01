import './App.css';
import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import { Provider } from 'react-redux';
import store from './redux.store';

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
   * PASSKEY           = Usertoken related to the logged in user              *
   * ISLOGGEDIN        = Log status of user                                   *
   * ITEMSLIST         = Every item in the database                           *
   * ORDERLIST         = Every order user has placed                          *
   * CURRENTORDER      = Order being created, viewed, edited, deleted         *
   * CURRENTORDERID    = ID of Order being created, viewed, edited, deleted   *
   * ITEMQUANTITY      = ProductIDs & quantities of items in an order         *
   * CLONEITEMQUANTITY = Copy of item quantities match with                   *
   * TOTAL             = Total of item prices in an order in context          *
   ***************************************************************************/
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  /****************************************************************************
   * Constructor: Initiates the state of app
   ***************************************************************************/
  constructor(props) {
    super(props);
    this.state = {
      PASSKEY: props.cookies.get(USERTOKEN),
      ISLOGGEDIN: false,
      ITEMSLIST: [],
      ORDERLIST: [],
      CURRENTORDER: {},
      CURRENTORDERID: '',
      ITEMQUANTITY: {},
      CLONEITEMQUANTITY: {},
      TOTAL: 0
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
    this.setState({ ISLOGGEDIN, PASSKEY });
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
        this.GET_THE_ORDER_LIST_FOR_THIS_USER();
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
          ORDERLIST: [newOrder.data, ...this.state.ORDERLIST],
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
        this.GET_THE_ORDER_LIST_FOR_THIS_USER();
      }).catch(err => {
        console.log(err);
      });
  }

  /****************************************************************************
   * Parent method adding a list of items to the current order in context. This
   * is a multiple request method where axios perform multiple web requests to
   * update each item in items collection
   ***************************************************************************/
  ADD_ITEMS_TO_THIS_ORDER = () => {
    let axiosRequests = [];
    let ITEMQUANTITY = this.state.ITEMQUANTITY;
    for (var I in ITEMQUANTITY) {
      if (ITEMQUANTITY[I] !== 0) {
        axiosRequests.push(
          axios.post(ADD_TO_ORDER_ENDPOINT + `/${this.state.CURRENTORDERID}`,
            { productID: I, quantity: ITEMQUANTITY[I] },
            { headers: { 'x-access-token': this.state.PASSKEY } })
        );
      }
    }
    axios.all(axiosRequests).then(axios.spread(function (acct, perms) { }));
    this.CLEAR_ORDERING_PROCESS();
    this.GET_THE_ORDER_LIST_FOR_THIS_USER();
    this.GET_THE_COMPLETE_ITEMS_LIST();
  }

  /****************************************************************************
   * Parent method taking care of updating the list of `items` provided by user
   * to update in both orders collection and do necessary adjustments in items
   * collection. This will trigger a series of axios requests to perform the
   * said tasks. After waiting for a time out, user will be redirected to order
   * list page. Since ITEMQUANTITY will have more or the same number of items
   * as in CLONEDITEMQUANTITY, we chose to perform actions on ITEMQUANTITY 
   * rather than on the cloned one.
   ***************************************************************************/
  UPDATE_ITEMS_IN_THIS_ORDER = () => {
    let updateRequests = []; let newRequests = []; let deleteRequests = [];
    let ITEMQUANTITY = this.state.ITEMQUANTITY;
    let CLONEITEMQUANTITY = this.state.CLONEITEMQUANTITY;
    // Iterate through every item in ITEMQUANTITY
    for (var I in ITEMQUANTITY) {
      // If the item is not present in the CLONEd list, that is a new item
      if (CLONEITEMQUANTITY[I] === undefined && ITEMQUANTITY[I] !== 0) {
        newRequests.push(
          axios.post(ADD_TO_ORDER_ENDPOINT + `/${this.state.CURRENTORDERID}`,
            { productID: I, quantity: ITEMQUANTITY[I] },
            { headers: { 'x-access-token': this.state.PASSKEY } })
        );
      } else if (ITEMQUANTITY[I] === 0) { // This will be a removed item
        deleteRequests.push(
          axios.put(ORDER_REQUEST_ENDPOINT + `/${this.state.CURRENTORDERID}`,
            { productID: I, quantity: CLONEITEMQUANTITY[I] },
            { headers: { 'x-access-token': this.state.PASSKEY } })
        );
      } else { // It's an update of an existing item
        let difference = ITEMQUANTITY[I] - CLONEITEMQUANTITY[I];
        updateRequests.push(
          axios.post(ORDER_REQUEST_ENDPOINT + `/${this.state.CURRENTORDERID}`,
            { productID: I, quantity: ITEMQUANTITY[I], difference },
            { headers: { 'x-access-token': this.state.PASSKEY } })
        );
      }
    }
    axios.all([...updateRequests, ...newRequests, ...deleteRequests])
      .then(axios.spread(function (acct, perms) { }));
    this.CLEAR_ORDERING_PROCESS();
    this.GET_THE_ORDER_LIST_FOR_THIS_USER();
    this.GET_THE_COMPLETE_ITEMS_LIST();
  }

  /****************************************************************************
   * Update state to have the given ID as the current order to use in different
   * situations. As an example, while viewing an order, this can be used inside
   * the component when mounting
   ***************************************************************************/
  SET_THIS_ORDER_AS_CURRENT = (ID) => this.setState({ CURRENTORDERID: ID });

  /****************************************************************************
   * Refresh the item list and add the selected order to CURRENTORDER
   ***************************************************************************/
  PREPARE_TO_EDIT_OR_VIEW_THIS_ORDER = (ID) => {
    // First, fetch the item list as a good practice
    this.GET_THE_COMPLETE_ITEMS_LIST();
    // Save the order list to a local variable for easy access
    let OrderList = this.state.ORDERLIST;
    // Find the required order from the order list
    for (var order in OrderList) {
      if (OrderList[order]._id === ID) {
        // Prepare item quantities
        let tempItemQuantity = {};
        let tempTotal = 0;
        for (var item in OrderList[order].items) {
          tempTotal += (
            OrderList[order].items[item].quantity *
            OrderList[order].items[item].price
          );
          tempItemQuantity[
            OrderList[order].items[item].productID
          ] = OrderList[order].items[item].quantity;
        }
        // Update state
        this.setState({
          TOTAL: tempTotal,
          CURRENTORDER: OrderList[order],
          ITEMQUANTITY: tempItemQuantity,
          CLONEITEMQUANTITY: JSON.parse(JSON.stringify(tempItemQuantity))
        });
      }
    }
  }

  /****************************************************************************
   * Method used in Edit Order view to make the item count zero
   ***************************************************************************/
  DELETE_THIS_ITEM = (ID) => {
    let OLD_ITEMQUANTITY = this.state.ITEMQUANTITY;
    let NEW_TOTAL =
      this.state.TOTAL - (this.GET_PRICE_OF_ITEM(ID) * OLD_ITEMQUANTITY[ID]);
    OLD_ITEMQUANTITY[ID] = 0;
    this.setState({
      ITEMQUANTITY: OLD_ITEMQUANTITY,
      TOTAL: NEW_TOTAL
    });
  }

  /****************************************************************************
   * Finds the unit price of an item by it's product ID
   ***************************************************************************/
  GET_PRICE_OF_ITEM = (ID) => {
    return this.state.ITEMSLIST.find(I => I.productID === ID).price;
  }

  /****************************************************************************
   * Method used in Edit Order view to increment and decrement the item count
   * @param ID productID of the item
   * @param DIRECTION true for increment, false for decrement
   ***************************************************************************/
  INDECCREMENT_ITEM_COUNT = (ID, DIRECTION) => {
    let NEW_ITEMQUANTITY = this.state.ITEMQUANTITY;
    let NEW_TOTAL = this.state.TOTAL;
    let PRICE = this.GET_PRICE_OF_ITEM(ID);
    if (DIRECTION) {
      NEW_ITEMQUANTITY[ID] += 1;
      NEW_TOTAL += PRICE;
    } else {
      NEW_ITEMQUANTITY[ID] -= 1;
      NEW_TOTAL -= PRICE;
    }
    this.setState({
      ITEMQUANTITY: NEW_ITEMQUANTITY,
      TOTAL: NEW_TOTAL
    });
  }

  /****************************************************************************
   * Method used in Edit Order view to add a new item to the ITEMQUANTITY and
   * keeps on counting
   ***************************************************************************/
  ADD_THIS_ITEM_TO_ITEMQUANTITY = (ID) => {
    let NEW_ITEMQUANTITY = this.state.ITEMQUANTITY;
    NEW_ITEMQUANTITY[ID] = 0;
    this.setState({
      ITEMQUANTITY: NEW_ITEMQUANTITY
    });
  }

  /****************************************************************************
   * Resets the current state to remove all the saved data from previous update
   * process
   ***************************************************************************/
  CLEAR_ORDERING_PROCESS = () => {
    this.setState({
      TOTAL: 0,
      ITEMQUANTITY: {},
      CLONEITEMQUANTITY: {},
      CURRENTORDERID: ''
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header ISLOGGEDIN={this.state.ISLOGGEDIN} />

            <Route path="/login" render={() => (
              <ErrorBoundary>
                <LogIn
                  ISLOGGEDIN={this.state.ISLOGGEDIN}
                  LOG_USER_IN_AND_OUT={this.LOG_USER_IN_AND_OUT} />
              </ErrorBoundary>
            )} />

            <Route path="/register" render={() => (
              <ErrorBoundary>
                <Register ISLOGGEDIN={this.state.ISLOGGEDIN} />
              </ErrorBoundary>
            )} />

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
                  ITEMQUANTITY={this.state.ITEMQUANTITY}
                  TOTAL={this.state.TOTAL}
                  DELETE_THIS_ORDER={this.DELETE_THIS_ORDER}
                  DELETE_THIS_ITEM={this.DELETE_THIS_ITEM}
                  INDECCREMENT_ITEM_COUNT={this.INDECCREMENT_ITEM_COUNT}
                  CREATE_NEW_ORDER_FOR_THIS_USER={this.CREATE_NEW_ORDER_FOR_THIS_USER}
                  CLEAR_ORDER_ADDING_PROCESS={this.CLEAR_ORDERING_PROCESS}
                  ADD_THIS_ITEM_TO_ITEMQUANTITY={this.ADD_THIS_ITEM_TO_ITEMQUANTITY}
                  ADD_ITEMS_TO_THIS_ORDER={this.ADD_ITEMS_TO_THIS_ORDER} />
              </ErrorBoundary>
            )} />

            <Route path="/my_orders" render={() => (
              <ErrorBoundary>
                <OrderList
                  ISLOGGEDIN={this.state.ISLOGGEDIN}
                  ORDERLIST={this.state.ORDERLIST}
                  GET_THE_COMPLETE_ITEMS_LIST={this.GET_THE_COMPLETE_ITEMS_LIST}
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
                  TOTAL={this.state.TOTAL}
                  DELETE_THIS_ORDER={this.DELETE_THIS_ORDER}
                  CHECK_THIS_ORDER_OUT={this.CHECK_THIS_ORDER_OUT}
                  CLEAR_ORDERING_PROCESS={this.CLEAR_ORDERING_PROCESS} />
              </ErrorBoundary>
            )} />

            <Route path="/edit_order" render={() => (
              <ErrorBoundary>
                <EditOrder
                  ISLOGGEDIN={this.state.ISLOGGEDIN}
                  CURRENTORDERID={this.state.CURRENTORDERID}
                  CURRENTORDER={this.state.CURRENTORDER}
                  ITEMQUANTITY={this.state.ITEMQUANTITY}
                  CLONEITEMQUANTITY={this.state.CLONEITEMQUANTITY}
                  TOTAL={this.state.TOTAL}
                  ITEMSLIST={this.state.ITEMSLIST}
                  SET_THIS_ORDER_AS_CURRENT={this.SET_THIS_ORDER_AS_CURRENT}
                  UPDATE_ITEMS_IN_THIS_ORDER={this.UPDATE_ITEMS_IN_THIS_ORDER}
                  DELETE_THIS_ITEM={this.DELETE_THIS_ITEM}
                  CLEAR_ORDER_UPDATE_PROCESS={this.CLEAR_ORDERING_PROCESS}
                  ADD_THIS_ITEM_TO_ITEMQUANTITY={this.ADD_THIS_ITEM_TO_ITEMQUANTITY}
                  INDECCREMENT_ITEM_COUNT={this.INDECCREMENT_ITEM_COUNT} />
              </ErrorBoundary>
            )} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default withCookies(App);
