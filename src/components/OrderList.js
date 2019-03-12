import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    dispatch_GetTheCompleteItemsList,
    dispatch_FetchEveryOrderForThisUser,
    dispatch_DeleteThisOrder,
    dispatch_ResetCurrentOrderStates
} from '../actions/ordercontrolactions';

import SingleOrder from './SingleOrder';

/***************************************************************************************************
 * Displays all available orders related to the logged user
 **************************************************************************************************/
class OrderList extends Component {

    componentDidMount() {
        this.props.dispatch_GetTheCompleteItemsList(this.props.passKey);
        this.props.dispatch_FetchEveryOrderForThisUser(this.props.passKey);
    }

    componentDidUpdate(prevProps) {
        if (this.props.url === '/delete_order') {
            this.props.dispatch_DeleteThisOrder(this.props.currentOrder._id, this.props.passKey);
            this.props.dispatch_ResetCurrentOrderStates();
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
                            <SingleOrder key={order._id} order={order} />
                        ))}
                    </div>
                </div>
            );
        }
    }
}

OrderList.propTypes = {
    dispatch_GetTheCompleteItemsList: PropTypes.func.isRequired,
    dispatch_FetchEveryOrderForThisUser: PropTypes.func.isRequired,
    dispatch_ResetCurrentOrderStates: PropTypes.func.isRequired,
    dispatch_DeleteThisOrder: PropTypes.func.isRequired,
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
    dispatch_FetchEveryOrderForThisUser,
    dispatch_ResetCurrentOrderStates,
    dispatch_DeleteThisOrder
})(OrderList));
