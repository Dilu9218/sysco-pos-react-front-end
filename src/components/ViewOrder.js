import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import Modal from "react-responsive-modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ListItemInViewOrder from "./ListItemInViewOrder";
import ListItemInAddNewItemsToOrder from "./ListItemInAddNewItemsToOrder";
import {
    dispatchGetTheCompleteItemsList,
    dispatchResetCurrentOrderStates,
    dispatchCheckOutOrder
} from "../actions/ordercontrolactions";

class ViewOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemListOpen: false
        };
    }

    componentDidMount() {
        this.props.dispatchGetTheCompleteItemsList(this.props.passKey);
    }

    displayItemsList = () => {
        this.setState({ itemListOpen: true });
    }

    itemListClosing = () => {
        this.setState({ itemListOpen: false });
    }

    /**************************************************************************
     * This method will redirect user back to orders list without making any
     * change to collections or order states
     *************************************************************************/
    cancelCheckOut = () => {
        this.props.history.push("/my_orders");
    }

    /**************************************************************************
     * Checking out an order will delete the order from order collection and
     * the item counts won't get changed
     *************************************************************************/
    checkOutThisOrder = () => {
        this.props.dispatchCheckOutOrder(
            this.props.currentOrder._id,
            this.props.passKey
        );
    }

    // We need to redirect user back to orders list once checkout completes.
    // When an order is checked out, props will change and we can capture that
    // here and redirect user to the order list. Otherwise there can be network
    // delays making the checkout slow but user is already at the orders list.
    componentDidUpdate(prevProps) {
        if (this.props.url === "/my_orders") {
            this.props.history.push(this.props.url);
        }
    }

    // When the view is unmounted, clean up the saved states as we are using
    // the same state variables to populate other views such as edit order
    componentWillUnmount() {
        this.props.dispatchResetCurrentOrderStates();
    }

    render() {
        if (!this.props.isLoggedIn) {
            return (<Redirect to="/login" />);
        }
        return (
            <div>
                <Modal open={this.state.itemListOpen} onClose={this.itemListClosing} center
                    showCloseIcon={false}>
                    <div className="card" style={{ margin: "5px" }}>
                        <div className="card-body" style={{ padding: "0px" }}>
                            <div className="alert alert-dark" role="alert"><h5
                                style={{ margin: "auto", textAlign: "initial" }}>
                                <i className="fas fa-th-list"></i> Items List</h5></div>
                            {this.props.viewItemList.filter((item) => {
                                return ((item.quantity > 0) &&
                                    this.props.itemQuantity[item.productID] === undefined);
                            }).map((item) => (
                                <ListItemInAddNewItemsToOrder key={item._id} item={item} />
                            ))}
                        </div>
                    </div>
                </Modal>
                <div className="card" style={{ margin: "25px", paddingBottom: "50px" }}>
                    <div className="card-body">
                        <div className="card border-dark shadow" style={{ margin: "10px 0px 0px 0px" }}>
                            <div className="card-header text-white bg-dark" style={{ padding: ".75em .1em" }}>
                                <div className="row" style={{ width: "100%", margin: "0px" }}>
                                    <div className="col-8 d-flex"
                                        style={{ textAlign: "left" }}>
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
                        paddingRight: "25px",
                        overflow: "hidden",
                        position: "fixed",
                        zIndex: 99,
                        bottom: "0",
                        width: "100%"
                    }}>
                    <div className="card-body" style={{ paddingTop: "0px" }}>
                        <div className="row">
                            <div className="col-4 d-flex justify-content-start d-inline">
                                <button onClick={this.displayItemsList}
                                    className="btn btn-primary"
                                    style={{ marginLeft: "10px" }}>
                                    <i className="fas fa-plus-circle"></i> Add Items</button>
                            </div>
                            <div className="col-8 d-flex justify-content-end">
                                <button onClick={this.checkOutThisOrder}
                                    className="btn btn-success"
                                    style={{ marginRight: "10px" }}>
                                    <i className="fas fa-shopping-cart"></i> Checkout</button>
                                <button onClick={this.cancelCheckOut}
                                    className="btn btn-warning">
                                    <i className="fas fa-chevron-left"></i> Back</button>
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
    dispatchResetCurrentOrderStates: PropTypes.func.isRequired,
    dispatchCheckOutOrder: PropTypes.func.isRequired,
    dispatchGetTheCompleteItemsList: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    total: state.ord.total,
    url: state.ord.url,
    viewItemList: state.ord.viewItemList,
    passKey: state.uac.passKey,
    itemQuantity: state.ord.itemQuantity,
    isLoggedIn: state.uac.isLoggedIn,
    currentOrder: state.ord.currentOrder
});

export default withRouter(connect(mapStateToProps, {
    dispatchResetCurrentOrderStates,
    dispatchCheckOutOrder,
    dispatchGetTheCompleteItemsList
})(ViewOrder));