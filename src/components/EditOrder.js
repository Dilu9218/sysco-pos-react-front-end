import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import ListItemInEditOrder from './ListItemInEditOrder';

class EditOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            UPDATEDITEMS: {},
            ITEMQUANTITYINORDER: {}
        };
    }

    // Once the component is mounted, filter out the productID and quantity of
    // the items in order and append it to local state
    componentDidMount() {
        let { items } = this.props.CURRENTORDER;
        let ITEMQUANTITYINORDER = {};
        for (var i in items) {
            ITEMQUANTITYINORDER[items[i].productID] = items[i].quantity;
        }
        this.setState({ ITEMQUANTITYINORDER });
    }

    /**************************************************************************
     * Creates a list of items added and updated. This will calculate the made
     * difference between the old quantity and the new quantity
     *************************************************************************/
    UPDATE_THIS_ORDER = () => {
        /* let { UPDATEDITEMS } = this.state;
        let REFINEDITEMS = {};
        for (var ID in UPDATEDITEMS) {
            if (parseInt(UPDATEDITEMS[ID]) !== 0) {
                REFINEDITEMS[ID] = UPDATEDITEMS[ID];
            }
        }
        let DIFFERENCES = {};
        for (var refinedItem in REFINEDITEMS) {
            if (this.state.ITEMQUANTITYINORDER[refinedItem]) {
                DIFFERENCES[refinedItem] = (
                    REFINEDITEMS[refinedItem] - this.state.ITEMQUANTITYINORDER[refinedItem]
                )
            }
        } */
        //this.props.UPDATE_ITEMS_IN_THIS_ORDER(REFINEDITEMS, DIFFERENCES);
        this.props.UPDATE_ITEMS_IN_THIS_ORDER();
        setTimeout(() => {
            this.props.history.push('/my_orders')
        }, (50 * this.props.ITEMQUANTITY.length));
    }

    /**************************************************************************
     * Do not make any modifications to the current order or the order list,
     * just redirect user back to order list
     *************************************************************************/
    CANCEL_EDITING_THE_ORDER = () => {
        this.props.CLEAR_ORDER_UPDATE_PROCESS();
        this.props.history.push('/my_orders');
    }

    render() {
        if (this.props.CURRENTORDERID === "") {
            return (
                <Redirect to="/my_orders" />
            );
        }
        return (
            <div>
                <div className="card" style={{ margin: '25px', paddingBottom: '50px' }}>
                    <div className="card-body">
                        <h5 className="card-title" style={{ margin: '0.5em 1em' }}>Editing Order {this.props.CURRENTORDERID}</h5>
                        {this.props.ITEMSLIST.map((item) => (
                            <ListItemInEditOrder
                                key={item._id}
                                ITEM={item}
                                NAME={item.productID}
                                CLONEITEMQUANTITY={this.props.CLONEITEMQUANTITY[item.productID] === undefined
                                    ? 0 : this.props.CLONEITEMQUANTITY[item.productID]}
                                ITEMQUANTITY={this.props.ITEMQUANTITY[item.productID] === undefined
                                    ? 0 : this.props.ITEMQUANTITY[item.productID]}
                                ADD_THIS_ITEM_TO_ITEMQUANTITY={this.props.ADD_THIS_ITEM_TO_ITEMQUANTITY}
                                DELETE_THIS_ITEM={this.props.DELETE_THIS_ITEM}
                                INDECCREMENT_ITEM_COUNT={this.props.INDECCREMENT_ITEM_COUNT} />
                        ))}
                    </div>
                </div>
                <nav className="navbar navbar-light bg-light"
                    style={{
                        paddingRight: '25px',
                        overflow: 'hidden',
                        position: 'fixed',
                        zIndex: 99,
                        bottom: '0',
                        width: '100%'
                    }}>
                    <div className="card-body button-section" style={{ paddingTop: '0px' }}>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-end">
                                <button onClick={this.UPDATE_THIS_ORDER} className="btn btn-primary" style={{ marginRight: '10px' }}>Update Order</button>
                                <button onClick={this.CANCEL_EDITING_THE_ORDER} className="btn btn-danger">Cancel</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default withRouter(EditOrder);
