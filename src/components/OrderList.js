import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    dispatch_GetTheCompleteItemsList,
    dispatch_FETCH_EVERY_ORDER_FOR_THIS_USER,
    dispatch_DELETE_THIS_ORDER,
    dispatch_RESET_CURRENT_ORDER_STATES
} from '../actions/ordercontrolactions';

import SingleOrder from './SingleOrder';

/***************************************************************************************************
 * Displays all available orders related to the logged user
 **************************************************************************************************/
class OrderList extends Component {

    componentDidMount() {
        this.props.dispatch_GetTheCompleteItemsList(this.props.passKey);
        this.props.GET_THE_ORDER_LIST_FOR_THIS_USER(this.props.passKey);
    }

    componentDidUpdate(prevProps) {
        if (this.props.url === '/delete_order') {
            this.props.REMOVE_THIS_ORDER(this.props.currentOrder._id, this.props.passKey);
            this.props.RESET_CURRENT_ORDER();
        } else if (prevProps.currentOrder._id !== this.props.currentOrder._id) {
            this.props.history.push(this.props.url === '' ? '/my_orders' : this.props.url);
        }
    }

    render() {
        if (this.props.passKey === "") {
            return (
                <Redirect to="/login" />
            );
        }
        if (this.props.orderList.length === 0) {
            return (
                <div className="card" style={{ margin: '25px' }}>
                    <div className="card-body"
                        style={{ padding: '1.25rem 1.25rem 1rem 1.25rem' }}>
                        <h5 className="card-title"
                            style={{ margin: '0.5em 1em 0 0' }}>Order List</h5>
                        <p style={{ marginTop: '10px' }}>
                            No Orders to display. Do you mind creating a <Link to="/create_order">new order</Link>?</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="card" style={{ margin: '25px' }}>
                    <div className="card-body"
                        style={{ padding: '1.25rem 1.25rem 1rem 1.25rem' }}>
                        <div className="alert alert-dark" role="alert"><h5
                            style={{ margin: 'auto', textAlign: 'initial' }}>
                            <i className="fas fa-th-list"></i> Order List</h5></div>
                        {this.props.orderList.map((order) => (
                            <SingleOrder key={order._id} ORDER={order} />
                        ))}
                    </div>
                </div>
            );
        }
    }
}

OrderList.propTypes = {
    dispatch_GetTheCompleteItemsList: PropTypes.func.isRequired,
    GET_THE_ORDER_LIST_FOR_THIS_USER: PropTypes.func.isRequired,
    RESET_CURRENT_ORDER: PropTypes.func.isRequired,
    REMOVE_THIS_ORDER: PropTypes.func.isRequired,
    passKey: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    passKey: state.uac.passKey,
    currentOrder: state.ord.currentOrder,
    url: state.ord.url,
    orderList: state.ord.orderList,
    itemsList: state.ord.itemsList
});

export default withRouter(connect(mapStateToProps, {
    dispatch_GetTheCompleteItemsList,
    GET_THE_ORDER_LIST_FOR_THIS_USER: dispatch_FETCH_EVERY_ORDER_FOR_THIS_USER,
    RESET_CURRENT_ORDER: dispatch_RESET_CURRENT_ORDER_STATES,
    REMOVE_THIS_ORDER: dispatch_DELETE_THIS_ORDER
})(OrderList));
