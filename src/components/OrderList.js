import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import SingleOrder from './SingleOrder';

/**
 * Contains all the orders attached to a user
 * 
 */

function OrderListDisplay(prop) {
    if (prop.orderList.length === 0) {
        return (
            <p style={{ marginTop: '10px' }}>No Orders to display. Do you mind createing a <Link to="/create_order">new order</Link>?</p>
        );
    } else {
        return (
            prop.orderList.map((order) => (
                <SingleOrder key={order._id}
                    singleOrder={order}
                    editThisOrder={prop.editThisOrder.bind(this, order._id)}
                    deleteThisOrder={prop.deleteThisOrder.bind(this, order._id)}
                    viewThisOrder={prop.viewThisOrder.bind(this, order._id)}
                />
            ))
        );
    }
}


class OrderList extends Component {

    componentDidMount() {
        this.props.fetchOrderList();
    }

    render() {
        return (
            <div className="card" style={{ margin: '25px' }}>
                <div className="card-body" style={{ padding: '1.25rem 1.25rem 1rem 1.25rem' }}>
                    <h5 className="card-title" style={{ margin: '0.5em 1em 0 0' }}>Order List</h5>
                    <OrderListDisplay
                        orderList={this.props.orderList}
                        editThisOrder={this.props.editThisOrder}
                        deleteThisOrder={this.props.deleteThisOrder}
                        viewThisOrder={this.props.viewThisOrder} />
                </div>
            </div>
        );
    }
}

export default withRouter(OrderList);
