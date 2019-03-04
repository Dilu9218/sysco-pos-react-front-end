import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItemInOrder from './ListItemInOrder';
import {
    CREATE_NEW_ORDER,
    REMOVE_THIS_ORDER,
    RESET_CURRENT_ORDER
} from '../actions/ordercontrolactions';
import { GET_THE_COMPLETE_ITEMS_LIST } from '../actions/itemcontrolactions';

class CreateOrder extends Component {

    constructor(props) {
        super(props);
        this.props.CREATE_NEW_ORDER(props.PASSKEY);
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
        /* this.props.ADD_ITEMS_TO_THIS_ORDER();
        setTimeout(() => {
            this.props.history.push('/my_orders')
        }, (50 * this.props.ITEMQUANTITY.length)); */
    }

    /**************************************************************************
     * If user chose not to create this order, this local function will trigger
     * parent component function to delete the current order being created. 
     * Once done, user will be redirected to order list.
     *************************************************************************/
    CANCEL_THE_ORDER = () => {
        if (this.props.ITEMQUANTITY.length === undefined) {
            this.props.REMOVE_THIS_ORDER(
                this.props.CURRENTORDERID, this.props.PASSKEY);
            this.props.RESET_CURRENT_ORDER();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.CURRENTORDERID !== '' & this.props.CURRENTORDERID === '') {
            this.props.history.push('/my_orders');
        }
    }

    /**************************************************************************
     * When the view is ending, if user has not added any elements to order, we
     * can delete it by checking if the ITEMQUANTITY is of no length and call
     * the necessary functions to 
     *************************************************************************/
    componentWillUnmount() {
        if (this.props.ITEMQUANTITY.length === undefined) {
            this.props.REMOVE_THIS_ORDER(
                this.props.CURRENTORDERID, this.props.PASSKEY);
            this.props.RESET_CURRENT_ORDER();
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
                                    NAME={item.productID}
                                    ITEMQUANTITY={this.props.ITEMQUANTITY[item.productID] === undefined
                                        ? 0 : this.props.ITEMQUANTITY[item.productID]}
                                    ADD_THIS_ITEM_TO_ITEMQUANTITY={() => { }}
                                    DELETE_THIS_ITEM={() => { }}
                                    INDECCREMENT_ITEM_COUNT={() => { }} />
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
                                    <div className="input-group-prepend" style={{ marginLeft: '10px' }}>
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
                                        style={{ marginRight: '10px' }}><i className="fas fa-cart-plus"></i> Add to Cart</button>
                                    <button
                                        onClick={this.CANCEL_THE_ORDER}
                                        className="btn btn-danger"><i className="fas fa-times-circle"></i> Cancel</button>
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
    CREATE_NEW_ORDER: PropTypes.func.isRequired,
    REMOVE_THIS_ORDER: PropTypes.func.isRequired,
    GET_THE_COMPLETE_ITEMS_LIST: PropTypes.func.isRequired,
    RESET_CURRENT_ORDER: PropTypes.func.isRequired,
    PASSKEY: PropTypes.string.isRequired,
    ISLOGGEDIN: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    ISLOGGEDIN: state.uac.ISLOGGEDIN,
    CURRENTORDERID: state.ord.CURRENTORDERID,
    PASSKEY: state.uac.PASSKEY,
    ITEMQUANTITY: state.ord.ITEMQUANTITY,
    ITEMSLIST: state.itm.ITEMSLIST,
    TOTAL: state.ord.TOTAL
});

export default withRouter(connect(mapStateToProps, {
    CREATE_NEW_ORDER,
    RESET_CURRENT_ORDER,
    REMOVE_THIS_ORDER,
    GET_THE_COMPLETE_ITEMS_LIST
})(CreateOrder));
