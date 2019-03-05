import React, { Component } from 'react';
import ItemCounterInListItem from './ItemCounterInListItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ListItemInOrderDetailView extends Component {

    REMOVE_ITEM_FROM_ORDER = () => {

    }

    render() {
        let { productID, productTitle, description, quantity, price } = this.props.singleItem;
        return (
            <li className="list-group-item d-flex justify-content-right"
                style={{ margin: '0px', padding: '0px', width: '100%' }}>
                <div className="row" style={{ margin: '0px', width: '100%' }}>
                    <div className="col-8 card">
                        <div className="card-body" style={{ padding: '5px 0px' }}>
                            <h6 className="card-title d-flex justify-content-right">
                                {productTitle}</h6>
                            <p className="card-subtitle text-muted"
                                style={{ textAlign: 'left' }}>{description}</p>
                        </div>
                    </div>
                    <div className="col-2 card">
                        <div className="card-body d-flex align-items-center"
                            style={{ padding: '5px 0px' }}>
                            <ItemCounterInListItem
                                NAME={productID}
                                MIN={1}
                                COUNT={this.props.ITEMQUANTITY[productID] === undefined
                                    ? 0 : this.props.ITEMQUANTITY[productID]}
                                MAX={quantity + this.props.ITEMSLIST.find(
                                    I => I.productID === productID).quantity} />
                        </div>
                    </div>
                    <div className="col-2 card text-right">
                        <p className="card-text" style={{ margin: '5px 0 0 0' }}>
                            @ {price.toFixed(2)}
                        </p>
                        <p className="card-link" style={{ margin: '0px' }}>
                            <b>Rs. {(quantity * price).toFixed(2)}</b>
                        </p>
                    </div>
                </div>
            </li>
        );
    }
}

ListItemInOrderDetailView.propTypes = {
    PASSKEY: PropTypes.string.isRequired,
    ITEMQUANTITY: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    PASSKEY: state.uac.PASSKEY,
    ITEMQUANTITY: state.ord.ITEMQUANTITY,
    ITEMSLIST: state.itm.ITEMSLIST,
    CURRENTORDER: state.ord.CURRENTORDER
});

export default connect(mapStateToProps, null)(ListItemInOrderDetailView);