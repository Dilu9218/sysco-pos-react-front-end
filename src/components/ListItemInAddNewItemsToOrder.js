import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    dispatch_AppendThisItemToOrder
} from '../actions/ordercontrolactions';

class ListItemInAddNewItemsToOrder extends Component {

    addThisItemToOrder = () => {
        this.props.dispatch_AppendThisItemToOrder(this.props.item.price,
            this.props.item.productID, this.props.currentOrderID,
            this.props.passKey, this.props.itemsList);
    }

    render() {
        let { productTitle, description, quantity, price } = this.props.item;
        return (
            <li className="list-group-item d-flex justify-content-right"
                style={{ margin: '0px', padding: '0px', width: '100%' }}>
                <div className="row" style={{ margin: '0px', width: '100%' }}>
                    <div className="col-9 card" style={{ paddingLeft: '0px' }}>
                        <div className="card-body" style={{ padding: '5px' }}>
                            <h6 className="card-title d-flex justify-content-right">
                                {productTitle}</h6>
                            <p className="card-subtitle text-muted d-flex justify-content-right"
                                style={{ textAlign: 'initial' }}>{description}</p>
                        </div>
                    </div>
                    <div className="col-1 card" style={{ padding: '5px', margin: 'auto' }}>
                        <button className="btn btn-info btn-block"
                            onClick={this.addThisItemToOrder}>
                            <i className="fas fa-cart-plus"></i></button>
                    </div>
                    <div className="col-2 card" style={{ margin: 'auto' }}>
                        <p className="card-text"
                            style={{ margin: '0px' }}>{quantity} Nos</p>
                        <p className="card-link"
                            style={{ margin: '0px' }}>@ <b>Rs. {price.toFixed(2)}</b></p>
                    </div>
                </div>
            </li>
        );
    }
}

ListItemInAddNewItemsToOrder.propTypes = {
    currentOrder: PropTypes.object.isRequired,
    passKey: PropTypes.string.isRequired,
    dispatch_AppendThisItemToOrder: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    total: state.ord.total,
    url: state.ord.url,
    itemsList: state.ord.itemsList,
    passKey: state.uac.passKey,
    itemQuantity: state.ord.itemQuantity,
    currentOrder: state.ord.currentOrder,
    currentOrderID: state.ord.currentOrderID
});

export default connect(mapStateToProps, {
    dispatch_AppendThisItemToOrder
})(ListItemInAddNewItemsToOrder);