import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import DisplayItem from './DisplayItem';
//import axios from 'axios';

class EditOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addedItems: {}
        };
    }

    componentDidMount() {
        this.props.fetchAllItemsList();
    }

    updateOrder = () => {
        //let axiosRequests = []
        console.log('Ready');
        /* for (var l in this.state.addedItems) {
            console.log(`Item is ${l} with ${this.state.addedItems}`);
            axiosRequests.push(
                axios.put(`http://localhost:8080/api/order/order/${this.props.currentOrderInContext}`,
                    {
                        productID: l,
                        quantity: this.state.addedItems[l]
                    },
                    { headers: { 'x-access-token': this.props.usertoken } })
            );
        }
        axios.all(axiosRequests).then(axios.spread(function (acct, perms) { })); */
        this.props.history.push('/my_orders');
    }

    cancelTheOrder = (id) => {
        this.props.history.push('/my_orders');
    }

    addThisItemToOrder = (id, val) => {
        // Delete the id from state
        try {
            delete this.state.addedItems.id;
        } catch (e) { }
        let tempAddedItems = this.state.addedItems;
        tempAddedItems[id] = val;
        this.setState({
            addedItems: tempAddedItems
        });
    }

    render() {
        return (
            <div className="card" style={{ margin: '25px' }}>
                <div className="card-body">
                    <h5 className="card-title" style={{ margin: '0.5em 1em' }}>Item List</h5>
                    {this.props.allItemsList.map((item) => (
                        <DisplayItem key={item._id} singleItem={item} keyID={item.productID} addThisItemToOrder={this.addThisItemToOrder} />
                    ))}
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-6" style={{ textAlign: 'left' }}>
                            <p className="card-text" style={{ padding: '1% 0' }}><b>Total: </b>Rs. {0.00}</p>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <button onClick={this.updateOrder} className="btn btn-primary" style={{ marginRight: '10px' }}>Update Order</button>
                            <button onClick={this.cancelTheOrder} className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(EditOrder);
