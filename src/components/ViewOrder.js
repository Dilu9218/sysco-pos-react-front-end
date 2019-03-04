import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItemInOrderDetailView from './ListItemInOrderDetailView';
import {
    RESET_CURRENT_ORDER,
    CHECK_OUT_THIS_ORDER
} from '../actions/ordercontrolactions';

class ViewOrder extends Component {

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
                            <div className="col-12 d-flex justify-content-end">
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
    CHECK_OUT_THIS_ORDER: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    TOTAL: state.ord.TOTAL,
    URL: state.ord.URL,
    PASSKEY: state.uac.PASSKEY,
    ISLOGGEDIN: state.uac.ISLOGGEDIN,
    CURRENTORDER: state.ord.CURRENTORDER
});

export default withRouter(connect(mapStateToProps, {
    RESET_CURRENT_ORDER,
    CHECK_OUT_THIS_ORDER
})(ViewOrder));