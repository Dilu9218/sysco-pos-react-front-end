import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import ListItemInOrderDetailView from './ListItemInOrderDetailView';

class ViewOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            items: [],
            itemTotal: 0
        };
    }

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
    CHECK_OUT_THIS_ORDER = (ID) => {
        this.props.CHECK_THIS_ORDER_OUT(ID);
        this.props.history.push('/my_orders');
    }

    // Once the view is called CURRENTORDER has the order details. Destruct it
    // extract the necessary components and calculate totals
    componentDidMount() {
        let { _id, items } = this.props.CURRENTORDER;
        let itemTotal = 0;
        for (var i = 0; i < items.length; i++) {
            itemTotal += items[i].quantity * items[i].price;
        }
        this.setState({ _id, items, itemTotal });
    }

    render() {
        if (!this.props.ISLOGGEDIN) {
            return (
                <Redirect to="/login" />
            )
        }
        return (
            <div className="card" style={{ margin: '25px' }}>
                <div className="card-body">
                    <div className="card border-dark shadow" style={{ margin: '10px 0px 0px 0px' }}>
                        <div className="card-header text-white bg-dark" style={{ padding: '.75em .1em' }}>
                            <div className="row" style={{ width: '100%', margin: '0px' }}>
                                <div className="col-8 d-flex justify-content-start">
                                    Order ID: {this.state._id}</div>
                                <div className="col-4 d-flex justify-content-end">
                                    <b>Rs. {this.state.itemTotal.toFixed(2)}</b>
                                </div>
                            </div>
                        </div>
                        <ul className="list-group list-group-flush">
                            {this.state.items.map((item) => (
                                <ListItemInOrderDetailView
                                    key={item._id}
                                    singleItem={item} />
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="card-body" style={{ paddingTop: '0px' }}>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end">
                            <button onClick={this.CHECK_OUT_THIS_ORDER.bind(this, this.state._id)}
                                className="btn btn-success" style={{ marginRight: '10px' }}>Checkout</button>
                            <button onClick={this.CANCEL_CHECK_OUT} className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ViewOrder);