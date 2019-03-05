import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItemInOrder from './ListItemInOrder';
import {
    dispatch_CREATE_NEW_ORDER_FOR_THIS_USER,
    dispatch_DELETE_THIS_ORDER,
    dispatch_RESET_CURRENT_ORDER_STATES,
    dispatch_ADD_THESE_ITEMS_TO_THIS_ORDER
} from '../actions/ordercontrolactions';
import { GET_THE_COMPLETE_ITEMS_LIST } from '../actions/itemcontrolactions';

class CreateOrder extends Component {

    constructor(props) {
        super(props);
        this.props.dispatch_CREATE_NEW_ORDER_FOR_THIS_USER(props.PASSKEY);
        this.props.GET_THE_COMPLETE_ITEMS_LIST(this.props.PASSKEY);
    }

    /**************************************************************************
     * Once all the items are set, this method will trigger the order state 
     * updating function in parent component to trigger a series of axios 
     * requests adding the items selected to the order and update the global 
     * item count. Before all that, this will filter the items for zero item 
     * counts. Once the parent function is triggered, redirects user to order
     * list after waiting for a time out depending on the number of items being
     * added to show user the completed order rather than a half filled order
     * as it takes some time to complete the axios promises.
     *************************************************************************/
    ADD_THESE_ITEMS_TO_THIS_ORDER = () => {
        this.props.dispatch_ADD_THESE_ITEMS_TO_THIS_ORDER(
            this.props.CURRENTORDERID,
            this.props.ITEMQUANTITY,
            this.props.PASSKEY
        );
    }

    /**************************************************************************
     * If user chose not to create this order, this local function will trigger
     * parent component function to delete the current order being created. 
     * Once done, user will be redirected to order list.
     *************************************************************************/
    CANCEL_THE_ORDER = () => {
        if (Object.keys(this.props.ITEMQUANTITY).length === 0) {
            this.props.dispatch_DELETE_THIS_ORDER(
                this.props.CURRENTORDERID,
                this.props.PASSKEY
            );
            this.props.dispatch_RESET_CURRENT_ORDER_STATES();
        }
    }

    // Once the order is cancelled, props will change as checking in the following if block. If it
    // is reset, there are no current orders and we can redirect user back to orders list.
    componentDidUpdate(prevProps) {
        if (prevProps.CURRENTORDERID !== '' & this.props.CURRENTORDERID === '') {
            this.props.history.push('/my_orders');
        }
        if (this.props.STATUS) {
            console.log('Pushing length is ' + Object.keys(this.props.ITEMQUANTITY).length);
            this.props.history.push('/my_orders');
        }
    }

    /**************************************************************************
     * When the view is ending, if user has not added any elements to order, we
     * can delete it by checking if the ITEMQUANTITY is of no length and call
     * the necessary functions to 
     *************************************************************************/
    componentWillUnmount() {
        if (Object.keys(this.props.ITEMQUANTITY).length === 0) {
            this.props.dispatch_DELETE_THIS_ORDER(
                this.props.CURRENTORDERID, this.props.PASSKEY);
            this.props.dispatch_RESET_CURRENT_ORDER_STATES();
        }
    }

    render() {
        if (!this.props.ISLOGGEDIN) {
            return (
                <Redirect to="/login" />
            );
        } else {
            return (
                <div>
                    <div className="card" style={{ margin: '25px', paddingBottom: '50px' }}>
                        <div className="card-body">
                            <h5 className="card-title"
                                style={{ margin: '0.5em 1em' }}>Item List</h5>
                            {this.props.ITEMSLIST.map((item) => (
                                <ListItemInOrder
                                    key={item._id}
                                    ITEM={item}
                                    COUNT={this.props.ITEMQUANTITY[item.productID] === undefined
                                        ? 0 : this.props.ITEMQUANTITY[item.productID]}
                                    ITEMQUANTITY={
                                        this.props.ITEMQUANTITY[item.productID] === undefined
                                            ? 0 : this.props.ITEMQUANTITY[item.productID]} />
                            ))}
                        </div>
                    </div>
                    <nav className="navbar navbar-light bg-light"
                        style={{
                            paddingRight: '25px',
                            overflow: 'hidden',
                            position: 'fixed',
                            zIndex: 99,
                            bottom: '0',
                            width: '100%'
                        }}>
                        <div className="card-body" style={{ paddingTop: '0px' }}>
                            <div className="row">
                                <div className="col-4 d-flex justify-content-start d-inline">
                                    <div className="input-group-prepend"
                                        style={{ marginLeft: '10px' }}>
                                        <span className="input-group-text"
                                            style={{
                                                borderTopRightRadius: '0px',
                                                borderBottomRightRadius: '0px'
                                            }}><strong>Total</strong></span>
                                        <span className="input-group-text"
                                            style={{
                                                borderTopLeftRadius: '0px',
                                                borderBottomLeftRadius: '0px'
                                            }}>Rs. {Math.abs((this.props.TOTAL)).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-8 d-flex justify-content-end">
                                    <button
                                        onClick={this.ADD_THESE_ITEMS_TO_THIS_ORDER}
                                        className="btn btn-success"
                                        style={{ marginRight: '10px' }}>
                                        <i className="fas fa-cart-plus"></i> Add to Cart</button>
                                    <button
                                        onClick={this.CANCEL_THE_ORDER}
                                        className="btn btn-danger">
                                        <i className="fas fa-times-circle"></i> Cancel</button>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            );
        }
    }
}

CreateOrder.propTypes = {
    dispatch_CREATE_NEW_ORDER_FOR_THIS_USER: PropTypes.func.isRequired,
    dispatch_DELETE_THIS_ORDER: PropTypes.func.isRequired,
    dispatch_ADD_THESE_ITEMS_TO_THIS_ORDER: PropTypes.func.isRequired,
    dispatch_RESET_CURRENT_ORDER_STATES: PropTypes.func.isRequired,
    GET_THE_COMPLETE_ITEMS_LIST: PropTypes.func.isRequired,
    PASSKEY: PropTypes.string.isRequired,
    ISLOGGEDIN: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    ISLOGGEDIN: state.uac.ISLOGGEDIN,
    CURRENTORDERID: state.ord.CURRENTORDERID,
    PASSKEY: state.uac.PASSKEY,
    ITEMQUANTITY: state.ord.ITEMQUANTITY,
    ITEMSLIST: state.itm.ITEMSLIST,
    STATUS: state.ord.STATUS,
    TOTAL: state.ord.TOTAL
});

export default withRouter(connect(mapStateToProps, {
    dispatch_CREATE_NEW_ORDER_FOR_THIS_USER,
    dispatch_RESET_CURRENT_ORDER_STATES,
    dispatch_DELETE_THIS_ORDER,
    dispatch_ADD_THESE_ITEMS_TO_THIS_ORDER,
    GET_THE_COMPLETE_ITEMS_LIST
})(CreateOrder));
