import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItemInCreateOrder from './ListItemInCreateOrder';
import {
    dispatch_CreateNewOrderForThisUser,
    dispatch_DELETE_THIS_ORDER,
    dispatch_GetTheCompleteItemsList,
    dispatch_RESET_CURRENT_ORDER_STATES,
    dispatch_ADD_THESE_ITEMS_TO_THIS_ORDER
} from '../actions/ordercontrolactions';

/***************************************************************************************************
 * Displays a list of all the available items to create a new order
 **************************************************************************************************/
class CreateOrder extends Component {

    /***********************************************************************************************
     * As the view gets constructed, we need the latest item list with updated quantities. Dispatch
     * actions to create a new order as the inital step as we need an order ID to feed items into &
     * fetch the latest item list with updated quantities to show
     **********************************************************************************************/
    constructor(props) {
        super(props);
        this.props.dispatch_CreateNewOrderForThisUser(props.passKey);
        this.props.dispatch_GetTheCompleteItemsList(this.props.passKey);
    }

    /***********************************************************************************************
     * Once the items quantities are all set, dispatch an action to save the quantities to database
     * and update the state with added data
     **********************************************************************************************/
    addSelectedItemsToThisOrder = () => {
        this.props.dispatch_ADD_THESE_ITEMS_TO_THIS_ORDER(
            this.props.currentOrderID,
            this.props.itemQuantity,
            this.props.passKey
        );
    }

    /**************************************************************************
     * If user chose not to create this order, this local function will trigger
     * parent component function to delete the current order being created. 
     * Once done, user will be redirected to order list.
     *************************************************************************/
    CANCEL_THE_ORDER = () => {
        if (Object.keys(this.props.itemQuantity).length === 0) {
            this.props.dispatch_DELETE_THIS_ORDER(
                this.props.currentOrderID,
                this.props.passKey
            );
            this.props.dispatch_RESET_CURRENT_ORDER_STATES();
        }
    }

    // Once the order is cancelled, props will change as checking in the following if block. If it
    // is reset, there are no current orders and we can redirect user back to orders list.
    componentDidUpdate(prevProps) {
        if (prevProps.currentOrderID !== '' & this.props.currentOrderID === '') {
            this.props.history.push('/my_orders');
        }
        if (this.props.status) {
            this.props.dispatch_RESET_CURRENT_ORDER_STATES();
            this.props.history.push('/my_orders');
        }
    }

    /**************************************************************************
     * When the view is ending, if user has not added any elements to order, we
     * can delete it by checking if the itemQuantity is of no length and call
     * the necessary functions to 
     *************************************************************************/
    componentWillUnmount() {
        if (Object.keys(this.props.itemQuantity).length === 0) {
            this.props.dispatch_DELETE_THIS_ORDER(
                this.props.currentOrderID, this.props.passKey);
            this.props.dispatch_RESET_CURRENT_ORDER_STATES();
        }
    }

    render() {
        if (!this.props.isLoggedIn) {
            return (
                <Redirect to="/login" />
            );
        } else {
            return (
                <div>
                    <div className="card" style={{ margin: '25px', paddingBottom: '50px' }}>
                        <div className="card-body">
                            <div className="alert alert-dark" role="alert"><h5
                                style={{ margin: 'auto', textAlign: 'initial' }}>
                                <i className="fas fa-th-list"></i> Items List</h5></div>
                            {this.props.itemsList.filter((item) => {
                                return (item.quantity > 0)
                            }).map((item) => (
                                <ListItemInCreateOrder
                                    key={item._id}
                                    item={item}
                                    quantity={this.props.itemQuantity[item.productID] === undefined
                                        ? 0 : this.props.itemQuantity[item.productID]} />
                            ))}
                        </div>
                    </div>
                    <nav className="navbar navbar-light bg-light"
                        style={{
                            paddingRight: '25px', overflow: 'hidden', position: 'fixed', zIndex: 99,
                            bottom: '0', width: '100%'
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
                                            }}>Rs. {Math.abs((this.props.total)).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-8 d-flex justify-content-end">
                                    <button
                                        onClick={this.addSelectedItemsToThisOrder}
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
    dispatch_CreateNewOrderForThisUser: PropTypes.func.isRequired,
    dispatch_DELETE_THIS_ORDER: PropTypes.func.isRequired,
    dispatch_ADD_THESE_ITEMS_TO_THIS_ORDER: PropTypes.func.isRequired,
    dispatch_RESET_CURRENT_ORDER_STATES: PropTypes.func.isRequired,
    dispatch_GetTheCompleteItemsList: PropTypes.func.isRequired,
    passKey: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.uac.isLoggedIn,
    currentOrderID: state.ord.currentOrderID,
    passKey: state.uac.passKey,
    itemQuantity: state.ord.itemQuantity,
    itemsList: state.ord.itemsList,
    status: state.ord.status,
    total: state.ord.total
});

export default withRouter(connect(mapStateToProps, {
    dispatch_CreateNewOrderForThisUser,
    dispatch_RESET_CURRENT_ORDER_STATES,
    dispatch_DELETE_THIS_ORDER,
    dispatch_ADD_THESE_ITEMS_TO_THIS_ORDER,
    dispatch_GetTheCompleteItemsList
})(CreateOrder));
