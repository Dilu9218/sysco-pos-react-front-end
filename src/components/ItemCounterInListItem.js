import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    dispatch_ADD_THIS_ITEM_TO_QUANTITY,
    dispatch_DELETE_THIS_ITEM_FROM_QUANTITY,
    dispatch_INDECREMENT_ITEM_FROM_QUANTITY
} from '../actions/ordercontrolactions';

function RenderDeleteButton(props) {
    if (props.COUNT !== 0) {
        return (
            <div className="btn-group" role="group" aria-label="Delete-Group" style={{ marginLeft: '10px' }}>
                <button type="button" className="btn btn-danger" onClick={props.DELETE_THIS_ITEM}><i className="fas fa-trash"></i></button>
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
 * @param NAME Identifier for this counter
 * @param MIN Minimum allowable value
 * @param MAX Maximum allowable value
 */
class ItemCounterInListItem extends Component {

    /**************************************************************************
     * Triggers the parent component method to clear the count for this item
     *************************************************************************/
    DELETE_THIS_ITEM = (e) => {
        e.preventDefault();
        let P = this.props.ITEMSLIST.find(
            I => I.productID === this.props.NAME).price;
        this.props.DELETE_THIS_ITEM_FROM_ITEMQUANTITY(this.props.NAME, P);
    }

    /**************************************************************************
     * This will increment the item count by one if it is an existing item and
     * will request to add a new item to the quantity list if it is not and do
     * update its count as usual
     *************************************************************************/
    INCREMENT_COUNT = (e) => {
        e.preventDefault();
        if (this.props.COUNT !== this.props.MAX) {
            if (this.props.COUNT === 0) {
                this.props.ADD_THIS_ITEM_TO_ITEMQUANTITY(this.props.NAME);
            }
            let P = this.props.ITEMSLIST.find(
                I => I.productID === this.props.NAME).price;
            this.props.INDECREMENT_ITEM_FROM_ITEMQUANTITY(this.props.NAME, true, P);
        }
    }

    /**************************************************************************
     * This method will decrement the count of item quantities in parent state
     *************************************************************************/
    DECREMENT_COUNT = (e) => {
        e.preventDefault();
        if (this.props.COUNT > this.props.MIN) {
            let P = this.props.ITEMSLIST.find(
                I => I.productID === this.props.NAME).price;
            this.props.INDECREMENT_ITEM_FROM_ITEMQUANTITY(this.props.NAME, false, P);
        } else if (this.props.COUNT === this.props.MIN) {
            this.DELETE_THIS_ITEM(e);
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group" role="group" aria-label="Item-Group">
                        <button type="button" className="btn btn-secondary" onClick={this.INCREMENT_COUNT}>&#43;</button>
                        <div style={{ width: '3em', textAlign: 'center' }}>
                            <span className="input-group-text" style={{
                                display: 'inline-block', borderRadius: '0px', width: '100%', height: '100%'
                            }}>{this.props.COUNT}</span></div>
                        <button type="button" className="btn btn-secondary" onClick={this.DECREMENT_COUNT}>&#8722;</button>
                    </div>
                    <RenderDeleteButton
                        COUNT={this.props.COUNT}
                        DELETE_THIS_ITEM={this.DELETE_THIS_ITEM} />
                </div>
            </React.Fragment>
        );
    }
}



ItemCounterInListItem.propTypes = {
    ADD_THIS_ITEM_TO_ITEMQUANTITY: PropTypes.func.isRequired,
    INDECREMENT_ITEM_FROM_ITEMQUANTITY: PropTypes.func.isRequired,
    DELETE_THIS_ITEM_FROM_ITEMQUANTITY: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    ISLOGGEDIN: state.uac.ISLOGGEDIN,
    CURRENTORDERID: state.ord.CURRENTORDERID,
    PASSKEY: state.uac.PASSKEY,
    ITEMQUANTITY: state.ord.ITEMQUANTITY,
    ITEMSLIST: state.itm.ITEMSLIST,
    TOTAL: state.ord.TOTAL
});

export default connect(mapStateToProps, {
    ADD_THIS_ITEM_TO_ITEMQUANTITY: dispatch_ADD_THIS_ITEM_TO_QUANTITY,
    INDECREMENT_ITEM_FROM_ITEMQUANTITY: dispatch_INDECREMENT_ITEM_FROM_QUANTITY,
    DELETE_THIS_ITEM_FROM_ITEMQUANTITY: dispatch_DELETE_THIS_ITEM_FROM_QUANTITY
})(ItemCounterInListItem);
