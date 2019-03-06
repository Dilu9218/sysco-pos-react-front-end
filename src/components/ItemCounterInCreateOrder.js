import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    dispatch_ADD_THIS_ITEM_TO_QUANTITY,
    dispatch_DELETE_THIS_ITEM_FROM_QUANTITY,
    dispatch_INDECREMENT_ITEM_FROM_QUANTITY
} from '../actions/ordercontrolactions';

function RenderDeleteButton(props) {
    if (props.quantity !== 0) {
        return (
            <div className="btn-group"
                role="group" aria-label="Delete-Group" style={{ marginLeft: '10px' }}>
                <button type="button"
                    className="btn btn-danger"
                    onClick={props.DELETE_THIS_ITEM}><i className="fas fa-trash"></i></button>
            </div>
        );
    } else {
        return (
            <React.Fragment></React.Fragment>
        );
    }
}

/**
 * Custom component to increment and decrement value within a minimum and
 * maximum range. A local count will be maintained to help with validation
 * @param name Identifier for this counter
 * @param min Minimum allowable value
 * @param max Maximum allowable value
 */
class ItemCounterInCreateOrder extends Component {

    /**************************************************************************
     * Triggers the parent component method to clear the count for this item
     *************************************************************************/
    DELETE_THIS_ITEM = (e) => {
        e.preventDefault();
        let P = this.props.itemsList.find(
            I => I.productID === this.props.name).price;
        this.props.DELETE_THIS_ITEM_FROM_ITEMQUANTITY(this.props.name, P);
    }

    /**************************************************************************
     * This will increment the item count by one if it is an existing item and
     * will request to add a new item to the quantity list if it is not and do
     * update its count as usual
     *************************************************************************/
    incrementCount = (e) => {
        e.preventDefault();
        if (this.props.quantity !== this.props.max) {
            if (this.props.quantity === 0) {
                this.props.ADD_THIS_ITEM_TO_ITEMQUANTITY(this.props.name);
            }
            let P = this.props.itemsList.find(
                I => I.productID === this.props.name).price;
            this.props.INDECREMENT_ITEM_FROM_ITEMQUANTITY(this.props.name, true, P);
        }
    }

    /**************************************************************************
     * This method will decrement the count of item quantities in parent state
     *************************************************************************/
    decrementCount = (e) => {
        e.preventDefault();
        if (this.props.quantity > this.props.min) {
            let P = this.props.itemsList.find(
                I => I.productID === this.props.name).price;
            this.props.INDECREMENT_ITEM_FROM_ITEMQUANTITY(this.props.name, false, P);
        } else if (this.props.quantity === this.props.min) {
            this.DELETE_THIS_ITEM(e);
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group" role="group" aria-label="Item-Group">
                        <button type="button" className="btn btn-secondary"
                            onClick={this.incrementCount}>&#43;</button>
                        <div style={{ width: '3em', textAlign: 'center' }}>
                            <span className="input-group-text" style={{
                                display: 'inline-block', borderRadius: '0px', width: '100%', height: '100%'
                            }}>{this.props.quantity}</span></div>
                        <button type="button" className="btn btn-secondary"
                            onClick={this.decrementCount}>&#8722;</button>
                    </div>
                    <RenderDeleteButton
                        quantity={this.props.quantity}
                        DELETE_THIS_ITEM={this.DELETE_THIS_ITEM} />
                </div>
            </React.Fragment>
        );
    }
}



ItemCounterInCreateOrder.propTypes = {
    ADD_THIS_ITEM_TO_ITEMQUANTITY: PropTypes.func.isRequired,
    INDECREMENT_ITEM_FROM_ITEMQUANTITY: PropTypes.func.isRequired,
    DELETE_THIS_ITEM_FROM_ITEMQUANTITY: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.uac.isLoggedIn,
    currentOrderID: state.ord.currentOrderID,
    passKey: state.uac.passKey,
    itemQuantity: state.ord.itemQuantity,
    itemsList: state.ord.itemsList,
    total: state.ord.total
});

export default connect(mapStateToProps, {
    ADD_THIS_ITEM_TO_ITEMQUANTITY: dispatch_ADD_THIS_ITEM_TO_QUANTITY,
    INDECREMENT_ITEM_FROM_ITEMQUANTITY: dispatch_INDECREMENT_ITEM_FROM_QUANTITY,
    DELETE_THIS_ITEM_FROM_ITEMQUANTITY: dispatch_DELETE_THIS_ITEM_FROM_QUANTITY
})(ItemCounterInCreateOrder);
