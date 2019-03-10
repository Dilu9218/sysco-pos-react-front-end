import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dispatch_SetThisOrderAsCurrentOrder } from '../actions/ordercontrolactions';
import ListItemInSingleOrder from './ListItemInSingleOrder';

class SingleOrder extends Component {

    /**************************************************************************
     * Sets the current order in context as this order and redirects user to
     * view_order where it will fetch the order details and display content of
     * the order to user
     *************************************************************************/
    viewThisOrder = () => {
        this.props.dispatch_SetThisOrderAsCurrentOrder(this.props.order, '/view_order');
    }

    /**************************************************************************
     * Triggers an action to dispatch an event to remove the order from state
     * and collection
     *************************************************************************/
    deleteThisOrder = () => {
        this.props.dispatch_SetThisOrderAsCurrentOrder(this.props.order, '/delete_order');
    }

    render() {
        let { _id, items } = this.props.order;
        let totalCost = 0;
        for (var i = 0; i < items.length; i++) {
            let { quantity, price } = items[i];
            totalCost += (quantity * price);
        }
        return (
            <div className="card border-dark shadow" style={{ margin: '10px 0px' }}>
                <div className="card-header text-white bg-dark" style={{ padding: '.75em .1em' }}
                    data-target={'#i' + _id} data-toggle="collapse" aria-expanded="true"
                    aria-controls={'i' + _id}>
                    <div className="row" style={{ width: '100%', margin: '0px' }}>
                        <div className="col-10 d-flex justify-content-start" style={{ textAlign: 'initial' }}>
                            Order ID: {_id}</div>
                        <div className="col-2 d-flex justify-content-end" style={{ textAlign: 'initial' }}>
                            <b><p className="badge badge-secondary"
                                style={{
                                    margin: 'unset', marginRight: '10px', padding: '5px'
                                }}><i className="fab fa-slack-hash"></i> {items.length}</p> Rs. {totalCost.toFixed(2)}</b>
                        </div>
                    </div>
                </div>
                <ul id={'i' + _id} className="list-group list-group-flush panel-collapse collapse in">
                    {items.map((item) => (
                        <ListItemInSingleOrder
                            key={item._id}
                            singleItem={item} />
                    ))}
                </ul>
                <div className="card-footer d-flex justify-content-end">
                    <Link to="#"
                        className="card-link view-order"
                        onClick={this.viewThisOrder}>
                        <i className="fas fa-list-alt"></i> View</Link>
                    <Link to="#"
                        className="card-link delete-order"
                        onClick={this.deleteThisOrder}>
                        <i className="fas fa-trash"></i> Delete</Link>
                </div>
            </div>
        );
    }
}

SingleOrder.propTypes = {
    dispatch_SetThisOrderAsCurrentOrder: PropTypes.func.isRequired,
    passKey: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    passKey: state.uac.passKey,
    currentOrder: state.ord.currentOrder
});

export default withRouter(connect(mapStateToProps, {
    dispatch_SetThisOrderAsCurrentOrder
})(SingleOrder));