import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import './App.css';
import LogOut from './components/LogOut';
import LogIn from './pages/login';
import Register from './pages/register';
import MainPage from './pages/mainpage';
import OrderList from './components/OrderList';
import axios from 'axios';
import CreateOrder from './components/CreateOrder';
import EditOrder from './components/EditOrder';
import ViewOrder from './components/ViewOrder';

function DecidedLandingPage(prop) {
  if (prop.isLoggedIn) {
    return (
      <Redirect to='/my_orders' />
    );
  } else {
    return (
      <Redirect to='/login' />
    );
  }
}

function GoToEditOrder(prop) {
  if (prop.currentOrderInContext) {
    return (
      <EditOrder
        usertoken={prop.usertoken}
        viewingOrder={prop.viewingOrder}
        fetchAllItemsList={prop.fetchAllItemsList}
        currentOrderInContext={prop.currentOrderInContext}
        allItemsList={prop.allItemsList} />
    );
  } else {
    return (
      <Redirect to='/my_orders' />
    );
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
      orderList: [],
      allItemsList: [],
      currentOrderInContext: '',
      viewingOrder: {},
      isLoggedIn: false,
      usertoken: cookies.get('usertoken')
    };
  }

  componentWillMount() {
    if (this.state.usertoken) {
      this.setState({
        isLoggedIn: true
      });
    }
  }

  logUserInAndOut = (isLoggedIn, usertoken) => {
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
    axios.get(`http://localhost:8080/api/order/order/${id}`,
      { headers: { 'x-access-token': this.state.usertoken } })
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
    axios.delete(`http://localhost:8080/api/order/order/${id}`,
      { headers: { 'x-access-token': this.state.usertoken } })
      .then(delOrder => {
        this.setState({
          orderList: [...this.state.orderList.filter(order => (order._id !== id))]
        });
      }).catch(err => {
        console.log(err);
      });
  }

  createNewOrderForThisUser = () => {
    axios.post('http://localhost:8080/api/order/order/new', {},
      { headers: { 'x-access-token': this.state.usertoken } })
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
    axios.get('http://localhost:8080/api/order/itemlist',
      { headers: { 'x-access-token': this.state.usertoken } })
      .then(res => {
        this.setState({
          orderList: res.data
        });
      })
      .catch(err => console.error(err));
  }

  fetchAllItemsList = () => {
    axios.get('http://localhost:8080/api/order/items',
      { headers: { 'x-access-token': this.state.usertoken } })
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
          <Header logStatus={this.state.isLoggedIn} />

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
              usertoken={this.state.usertoken}
              orderList={this.state.orderList}
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

          <Route path="/logout" render={() => (<LogOut logUserInAndOut={this.logUserInAndOut} />)} />
          <Route path="/login" render={() => (<LogIn markLogStatus={this.logUserInAndOut} />)} />
          <Route path="/register" render={() => (<Register />)} />

        </div>
      </Router>
    );
  }
}

export default withCookies(App);
