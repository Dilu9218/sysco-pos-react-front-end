import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Modal from "react-responsive-modal";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItemInViewOrder from './ListItemInViewOrder';
import ListItemInAddNewItemsToOrder from './ListItemInAddNewItemsToOrder';
import {
    dispatch_GetTheCompleteItemsList,
    dispatch_RESET_CURRENT_ORDER_STATES,
    dispatch_CHECK_OUT_ORDER
} from '../actions/ordercontrolactions';

class ViewOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemListOpen: false
        };
    }

    componentDidMount() {
        this.props.dispatch_GetTheCompleteItemsList(this.props.passKey);
    }

    DISPLAY_ITEMS_LIST = () => {
        this.setState({ itemListOpen: true });
    }

    ITEM_LIST_CLOSING = () => {
        this.setState({ itemListOpen: false });
    }

    /**************************************************************************
     * This method will redirect user back to orders list without making any
     * change to collections or order states
     *************************************************************************/
    CANCEL_CHECK_OUT = () => {
        this.props.history.push('/my_orders');
    }

    /**************************************************************************
     * Checking out an order will delete the order from order collection and
     * the item counts won't get changed
     *************************************************************************/
    CHECK_OUT_THIS_ORDER = () => {
        this.props.CHECK_OUT_THIS_ORDER(
            this.props.currentOrder._id,
            this.props.passKey
        );
    }

    // We need to redirect user back to orders list once checkout completes.
    // When an order is checked out, props will change and we can capture that
    // here and redirect user to the order list. Otherwise there can be network
    // delays making the checkout slow but user is already at the orders list.
    componentDidUpdate(prevProps) {
        if (this.props.url === '/my_orders') {
            this.props.history.push(this.props.url);
        }
    }

    // When the view is unmounted, clean up the saved states as we are using
    // the same state variables to populate other views such as edit order
    componentWillUnmount() {
        this.props.RESET_CURRENT_ORDER();
    }

    render() {
        if (!this.props.isLoggedIn) {
            return (
                <Redirect to="/login" />
            )
        }
        return (
            <div>
                <Modal open={this.state.itemListOpen} onClose={this.ITEM_LIST_CLOSING} center
                    styles={{ width: '100%', margin: '0px' }}>
                    <div className="card" style={{ margin: '5px' }}>
                        <div className="card-body" style={{ padding: '0px' }}>
                            <h5 className="card-title"
                                style={{ margin: '0.5em 1em', textAlign: 'center', width: '100%' }}>
                                Item List</h5>
                            {this.props.itemsList.filter((item) => {
                                return ((item.quantity > 0) &&
                                    this.props.itemQuantity[item.productID] === undefined)
                            }).map((item) => (
                                <ListItemInAddNewItemsToOrder key={item._id} item={item} />
                            ))}
                        </div>
                    </div>
                </Modal>
                <div className="card" style={{ margin: '25px', paddingBottom: '50px' }}>
                    <div className="card-body">
                        <div className="card border-dark shadow" style={{ margin: '10px 0px 0px 0px' }}>
                            <div className="card-header text-white bg-dark" style={{ padding: '.75em .1em' }}>
                                <div className="row" style={{ width: '100%', margin: '0px' }}>
                                    <div className="col-8 d-flex"
                                        style={{ textAlign: 'left' }}>
                                        Order ID: {this.props.currentOrder._id}</div>
                                    <div className="col-4 d-flex justify-content-end">
                                        <b>Rs. {this.props.total.toFixed(2)}</b>
                                    </div>
                                </div>
                            </div>
                            <ul className="list-group list-group-flush">
                                {this.props.currentOrder.items.map((item) => (
                                    <ListItemInViewOrder
                                        key={item._id}
                                        singleItem={item}
                                        quantity={this.props.itemQuantity[item.productID] === undefined
                                            ? 0 : this.props.itemQuantity[item.productID]} />
                                ))}
                            </ul>
                        </div>
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
                                <button onClick={this.DISPLAY_ITEMS_LIST}
                                    className="btn btn-primary"
                                    style={{ marginLeft: '10px' }}>
                                    <i className="fas fa-plus-circle"></i> Add Items</button>
                            </div>
                            <div className="col-8 d-flex justify-content-end">
                                <button onClick={this.CHECK_OUT_THIS_ORDER}
                                    className="btn btn-success"
                                    style={{ marginRight: '10px' }}>
                                    <i className="fas fa-shopping-cart"></i> Checkout</button>
                                <button onClick={this.CANCEL_CHECK_OUT}
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

ViewOrder.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    currentOrder: PropTypes.object.isRequired,
    passKey: PropTypes.string.isRequired,
    RESET_CURRENT_ORDER: PropTypes.func.isRequired,
    CHECK_OUT_THIS_ORDER: PropTypes.func.isRequired,
    dispatch_GetTheCompleteItemsList: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    total: state.ord.total,
    url: state.ord.url,
    itemsList: state.ord.itemsList,
    passKey: state.uac.passKey,
    itemQuantity: state.ord.itemQuantity,
    isLoggedIn: state.uac.isLoggedIn,
    currentOrder: state.ord.currentOrder
});

export default withRouter(connect(mapStateToProps, {
    RESET_CURRENT_ORDER: dispatch_RESET_CURRENT_ORDER_STATES,
    CHECK_OUT_THIS_ORDER: dispatch_CHECK_OUT_ORDER,
    dispatch_GetTheCompleteItemsList
})(ViewOrder));