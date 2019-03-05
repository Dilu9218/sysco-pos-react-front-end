import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Modal from "react-responsive-modal";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItemInOrderDetailView from './ListItemInOrderDetailView';
import {
    GET_THE_COMPLETE_ITEMS_LIST
} from '../actions/itemcontrolactions';
import {
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
        this.props.GET_THE_COMPLETE_ITEMS_LIST(this.props.PASSKEY);
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
            this.props.CURRENTORDER._id,
            this.props.PASSKEY
        );
    }

    // We need to redirect user back to orders list once checkout completes.
    // When an order is checked out, props will change and we can capture that
    // here and redirect user to the order list. Otherwise there can be network
    // delays making the checkout slow but user is already at the orders list.
    componentDidUpdate(prevProps) {
        if (this.props.URL === '/my_orders') {
            this.props.history.push(this.props.URL);
        }
    }

    // When the view is unmounted, clean up the saved states as we are using
    // the same state variables to populate other views such as edit order
    componentWillUnmount() {
        this.props.RESET_CURRENT_ORDER();
    }

    render() {
        if (!this.props.ISLOGGEDIN) {
            return (
                <Redirect to="/login" />
            )
        }
        return (
            <div>
                <Modal open={this.state.itemListOpen} onClose={this.ITEM_LIST_CLOSING} center>
                    <h2>Simple centered modal</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar
                        risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus,
                         sed porttitor quam.</p>
                </Modal>
                <div className="card" style={{ margin: '25px', paddingBottom: '50px' }}>
                    <div className="card-body">
                        <div className="card border-dark shadow" style={{ margin: '10px 0px 0px 0px' }}>
                            <div className="card-header text-white bg-dark" style={{ padding: '.75em .1em' }}>
                                <div className="row" style={{ width: '100%', margin: '0px' }}>
                                    <div className="col-8 d-flex"
                                        style={{ textAlign: 'left' }}>
                                        Order ID: {this.props.CURRENTORDER._id}</div>
                                    <div className="col-4 d-flex justify-content-end">
                                        <b>Rs. {this.props.TOTAL.toFixed(2)}</b>
                                    </div>
                                </div>
                            </div>
                            <ul className="list-group list-group-flush">
                                {this.props.CURRENTORDER.items.map((item) => (
                                    <ListItemInOrderDetailView
                                        key={item._id}
                                        singleItem={item} />
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
    ISLOGGEDIN: PropTypes.bool.isRequired,
    CURRENTORDER: PropTypes.object.isRequired,
    PASSKEY: PropTypes.string.isRequired,
    RESET_CURRENT_ORDER: PropTypes.func.isRequired,
    CHECK_OUT_THIS_ORDER: PropTypes.func.isRequired,
    GET_THE_COMPLETE_ITEMS_LIST: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    TOTAL: state.ord.TOTAL,
    URL: state.ord.URL,
    PASSKEY: state.uac.PASSKEY,
    ISLOGGEDIN: state.uac.ISLOGGEDIN,
    CURRENTORDER: state.ord.CURRENTORDER
});

export default withRouter(connect(mapStateToProps, {
    RESET_CURRENT_ORDER: dispatch_RESET_CURRENT_ORDER_STATES,
    CHECK_OUT_THIS_ORDER: dispatch_CHECK_OUT_ORDER,
    GET_THE_COMPLETE_ITEMS_LIST
})(ViewOrder));