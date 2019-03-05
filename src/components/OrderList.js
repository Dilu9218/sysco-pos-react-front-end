import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    GET_THE_COMPLETE_ITEMS_LIST
} from '../actions/itemcontrolactions';
import {
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
        this.props.GET_THE_COMPLETE_ITEMS_LIST(this.props.PASSKEY);
        this.props.GET_THE_ORDER_LIST_FOR_THIS_USER(this.props.PASSKEY);
    }

    componentDidUpdate(prevProps) {
        if (this.props.URL === '/delete_order') {
            this.props.REMOVE_THIS_ORDER(this.props.CURRENTORDER._id, this.props.PASSKEY);
            this.props.RESET_CURRENT_ORDER();
        } else if (prevProps.CURRENTORDER._id !== this.props.CURRENTORDER._id) {
            this.props.history.push(this.props.URL === '' ? '/my_orders' : this.props.URL);
        }
    }

    render() {
        if (this.props.PASSKEY === "") {
            return (
                <Redirect to="/login" />
            );
        }
        if (this.props.ORDERLIST.length === 0) {
            return (
                <div className="card" style={{ margin: '25px' }}>
                    <div className="card-body"
                        style={{ padding: '1.25rem 1.25rem 1rem 1.25rem' }}>
                        <h5 className="card-title"
                            style={{ margin: '0.5em 1em 0 0' }}>Order List</h5>
                        <p style={{ marginTop: '10px' }}>
                            No Orders to display. Do you mind creating a
                            <Link to="/create_order">new order</Link>?</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="card" style={{ margin: '25px' }}>
                    <div className="card-body"
                        style={{ padding: '1.25rem 1.25rem 1rem 1.25rem' }}>
                        <h5 className="card-title"
                            style={{ margin: '0.5em 1em 0 0' }}>Order List</h5>
                        {this.props.ORDERLIST.map((order) => (
                            <SingleOrder key={order._id} ORDER={order} />
                        ))}
                    </div>
                </div>
            );
        }
    }
}

OrderList.propTypes = {
    GET_THE_COMPLETE_ITEMS_LIST: PropTypes.func.isRequired,
    GET_THE_ORDER_LIST_FOR_THIS_USER: PropTypes.func.isRequired,
    RESET_CURRENT_ORDER: PropTypes.func.isRequired,
    REMOVE_THIS_ORDER: PropTypes.func.isRequired,
    PASSKEY: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    PASSKEY: state.uac.PASSKEY,
    CURRENTORDER: state.ord.CURRENTORDER,
    URL: state.ord.URL,
    ORDERLIST: state.ord.ORDERLIST,
    ITEMSLIST: state.itm.ITEMSLIST
});

export default withRouter(connect(mapStateToProps, {
    GET_THE_COMPLETE_ITEMS_LIST,
    GET_THE_ORDER_LIST_FOR_THIS_USER: dispatch_FETCH_EVERY_ORDER_FOR_THIS_USER,
    RESET_CURRENT_ORDER: dispatch_RESET_CURRENT_ORDER_STATES,
    REMOVE_THIS_ORDER: dispatch_DELETE_THIS_ORDER
})(OrderList));
