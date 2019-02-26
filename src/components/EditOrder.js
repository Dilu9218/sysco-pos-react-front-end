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
     * 
     *************************************************************************/
    UPDATE_THIS_ORDER = () => {
        let { UPDATEDITEMS } = this.state;
        let REFINEDITEMS = {};
        for (var ID in UPDATEDITEMS) {
            if (parseInt(UPDATEDITEMS[ID]) !== 0) {
                REFINEDITEMS[ID] = UPDATEDITEMS[ID];
            }
        }
        // TODO: Calculate differences
        this.props.UPDATE_ITEMS_IN_THIS_ORDER(REFINEDITEMS);
        setTimeout(() => {
            this.props.history.push('/my_orders')
        }, (50 * REFINEDITEMS.length));
    }

    /**************************************************************************
     * Do not make any modifications to the current order or the order list,
     * just redirect user back to order list
     *************************************************************************/
    CANCEL_EDITING_THE_ORDER = () => {
        this.props.history.push('/my_orders');
    }

    /**************************************************************************
     * Local function to add a single item to a temporary list of items to be 
     * added in to the order being updated. This will take care of duplicate 
     * entries but not zero entries. We'll need to refine that when updating
     * @param ID productID of the item being added
     * @param VALUE quantity of the item added
     *************************************************************************/
    ADD_THIS_ITEM_TO_ORDER = (ID, VALUE) => {
        try {
            delete this.state.UPDATEDITEMS.id;
        } catch (e) { }
        let tempAddedItems = this.state.UPDATEDITEMS;
        tempAddedItems[ID] = VALUE;
        this.setState({
            addedItems: tempAddedItems
        });
    }

    render() {
        if (this.props.CURRENTORDERID === "") {
            return (
                <Redirect to="/my_orders" />
            );
        }
        return (
            <div className="card" style={{ margin: '25px' }}>
                <div className="card-body">
                    <h5 className="card-title" style={{ margin: '0.5em 1em' }}>Editing Order {this.props.CURRENTORDERID}</h5>
                    {this.props.ITEMSLIST.map((item) => (
                        <ListItemInEditOrder
                            key={item._id}
                            ITEM={item}
                            keyID={item.productID}
                            ADD_THIS_ITEM_TO_ORDER={this.ADD_THIS_ITEM_TO_ORDER}
                            ITEMQTYINORDER={this.state.ITEMQUANTITYINORDER[item.productID]} />
                    ))}
                </div>
                <div className="card-body button-section" style={{ paddingTop: '0px' }}>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end">
                            <button onClick={this.UPDATE_THIS_ORDER} className="btn btn-primary" style={{ marginRight: '10px' }}>Update Order</button>
                            <button onClick={this.CANCEL_EDITING_THE_ORDER} className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(EditOrder);
