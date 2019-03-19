import React, { Component } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom'
import SingleOrder from './SingleOrder';

/**
 * @abstract All orders linked to user
 * @description Displays a summarized view of all the orders linked to user
 * @param ORDERLIST
 * @param DELETE_THIS_ORDER
 */
class OrderList extends Component {

    componentDidMount() {
        this.props.GET_THE_ORDER_LIST_FOR_THIS_USER();
        this.props.GET_THE_COMPLETE_ITEMS_LIST();
    }

    render() {
        if (!this.props.ISLOGGEDIN) {
            return (
                <Redirect to="/login" />
            );
        }
        if (this.props.ORDERLIST.length === 0) {
            return (
                <div className="card" style={{ margin: '25px' }}>
                    <div className="card-body" style={{ padding: '1.25rem 1.25rem 1rem 1.25rem' }}>
                        <h5 className="card-title" style={{ margin: '0.5em 1em 0 0' }}>Order List</h5>
                        <p style={{ marginTop: '10px' }}>No Orders to display. Do you mind creating a <Link to="/create_order">new order</Link>?</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="card" style={{ margin: '25px' }}>
                    <div className="card-body" style={{ padding: '1.25rem 1.25rem 1rem 1.25rem' }}>
                        <h5 className="card-title" style={{ margin: '0.5em 1em 0 0' }}>Order List</h5>
                        {this.props.ORDERLIST.map((order) => (
                            <SingleOrder
                                key={order._id}
                                ORDER={order}
                                PREPARE_TO_EDIT_OR_VIEW_THIS_ORDER={this.props.PREPARE_TO_EDIT_OR_VIEW_THIS_ORDER.bind(this, order._id)}
                                DELETE_THIS_ORDER={this.props.DELETE_THIS_ORDER.bind(this, order._id)}
                                SET_THIS_ORDER_AS_CURRENT={this.props.SET_THIS_ORDER_AS_CURRENT.bind(this, order._id)}
                            />
                        ))}
                    </div>
                </div>
            );
        }
    }
}

export default withRouter(OrderList);
