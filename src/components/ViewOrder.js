import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios';
import DisplayOrderItem from './DisplayOrderItem';

class ViewOrder extends Component {

    state = {
        _id: '',
        items: [{}],
        itemTotal: 0
    }

    cancelTheOrder = () => {
        this.props.history.push('/my_orders');
    }

    checkOutTheOrder = (id) => {
        this.props.deleteThisOrder(id);
        this.props.history.push('/my_orders');
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/api/order/order/${this.props.orderID}`,
            { headers: { 'x-access-token': this.props.usertoken } })
            .then(res => {
                this.setState({
                    _id: res.data._id,
                    items: res.data.items
                });
                let itemTotal = 0;
                try {
                    for (var i = 0; i < res.data.items.length; i++) {
                        itemTotal += this.state.items[i].quantity * this.state.items[i].price;
                    }
                    this.setState({
                        itemTotal
                    });
                } catch (e) { }
            })
            .catch(err => console.error(err));
    }

    render() {
        try {
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
                                    <DisplayOrderItem key={item._id}
                                        singleItem={item}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="card-body" style={{ paddingTop: '0px' }}>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-end">
                                <button onClick={this.checkOutTheOrder.bind(this, this.state._id)}
                                    className="btn btn-success" style={{ marginRight: '10px' }}>Checkout</button>
                                <button onClick={this.cancelTheOrder} className="btn btn-danger">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } catch (e) {
            return (
                <Redirect to="/my_orders" />
            );
        }
    }
}

export default withRouter(ViewOrder);