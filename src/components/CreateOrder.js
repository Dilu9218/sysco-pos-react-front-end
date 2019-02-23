import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import DisplayItem from './DisplayItem';
import axios from 'axios';

class CreateOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addedItems: {}
        };
    }

    componentDidMount() {
        this.props.createNewOrderForThisUser();
    }

    addItemToOrder = () => {
        let axiosRequests = []
        for (var l in this.state.addedItems) {
            console.log(`Item is ${l} with ${this.state.addedItems}`);
            axiosRequests.push(
                axios.post(`http://localhost:8080/api/order/order/${this.props.currentOrderInContext}`,
                    {
                        productID: l,
                        quantity: this.state.addedItems[l]
                    },
                    { headers: { 'x-access-token': this.props.usertoken } })
            );
        }
        axios.all(axiosRequests).then(axios.spread(function (acct, perms) { }));
        setTimeout(() => { this.props.history.push('/my_orders') }, (50 * axiosRequests.length) );
    }

    cancelTheOrder = (id) => {
        this.props.deleteThisOrder(id);
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
                        <div className="col-12 d-flex justify-content-end">
                            <button onClick={this.addItemToOrder} className="btn btn-success" style={{ marginRight: '10px' }}>Add to Cart</button>
                            <button onClick={this.cancelTheOrder.bind(this, this.props.currentOrderInContext)} className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CreateOrder);
