import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import SingleOrder from './SingleOrder';

/**
 * Contains all the orders attached to a user
 * 
 */
class OrderList extends Component {

    componentDidMount() {
        this.props.fetchOrderList();
    }

    render() {
        return (
            <div className="card" style={{ margin: '25px' }}>
                <div className="card-body" style={{padding: '1.25rem 1.25rem 1rem 1.25rem'}}>
                    <h5 className="card-title" style={{ margin: '0.5em 1em 0 0' }}>Order List</h5>
                    {this.props.orderList.map((order) => (
                        <SingleOrder key={order._id}
                            singleOrder={order}
                            editThisOrder={this.props.editThisOrder.bind(this, order._id)}
                            deleteThisOrder={this.props.deleteThisOrder.bind(this, order._id)}
                            viewThisOrder={this.props.viewThisOrder.bind(this, order._id)}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default withRouter(OrderList);
