import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import ItemInOrder from './ItemInOrder';

/**
 * @abstract Creates a new order
 * @description Creates a new order with multiple items added to it
 * @param ISLOGGEDIN
 * @param CURRENTORDERID
 * @param ITEMSLIST
 * @param DELETE_THIS_ORDER
 * @param CREATE_NEW_ORDER_FOR_THIS_USER
 * @param ADD_ITEMS_TO_THIS_ORDER
 */
class CreateOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ADDEDITEMS: {}
        };
    }

    // As the create order view mounted, generate a new order for the user
    // and in the meantime fetch the complete item list
    componentDidMount() {
        this.props.CREATE_NEW_ORDER_FOR_THIS_USER();
    }

    /**************************************************************************
     * @description Local function to add a single item to a temporary list of 
     * items to be added in to the order being created. This will take care of
     * duplicate entries but not zero entries
     * @param id productID of the item being added
     * @param val quantity of the item added
     *************************************************************************/
    ADD_THIS_ITEM = (id, val) => {
        try {
            delete this.state.ADDEDITEMS.id;
        } catch (e) { }
        let tempAddedItems = this.state.ADDEDITEMS;
        tempAddedItems[id] = val;
        this.setState({
            ADDEDITEMS: tempAddedItems
        });
    }

    /**************************************************************************
     * @description Once all the items are set, this method will trigger the
     * order state updating function in parent component to trigger a series 
     * of axios requests adding the items selected to the order and update the
     * global item count. Before all that, this will filter the items for zero
     * item counts. Once the parent function is triggered, redirects user to
     * order list after waiting for a time out depending on the number of items
     * being added to show user the completed order rather than a half filled
     * order as it takes some time to complete the axios promises.
     *************************************************************************/
    ADD_THESE_ITEMS_TO_THIS_ORDER = () => {
        let { ADDEDITEMS } = this.state;
        let REFINEDITEMS = {};
        for (var i in ADDEDITEMS) {
            if (parseInt(ADDEDITEMS[i]) !== 0) {
                REFINEDITEMS[i] = ADDEDITEMS[i];
            }
        }
        this.props.ADD_ITEMS_TO_THIS_ORDER(REFINEDITEMS);
        setTimeout(() => {
            this.props.history.push('/my_orders')
        }, (50 * REFINEDITEMS.length));
    }

    /**************************************************************************
     * @description If user chose not to create this order, this local function
     * will trigger parent component function to delete the current order being
     * created. Once done, user will be redirected to order list.
     *************************************************************************/
    CANCEL_THE_ORDER = (id) => {
        this.props.DELETE_THIS_ORDER(id);
        this.props.history.push('/my_orders');
    }

    render() {
        if (!this.props.ISLOGGEDIN) {
            return (
                <Redirect to="/login" />
            );
        } else {
            return (
                <div className="card" style={{ margin: '25px' }}>
                    <div className="card-body">
                        <h5 className="card-title" style={{ margin: '0.5em 1em' }}>Item List</h5>
                        {this.props.ITEMSLIST.map((item) => (
                            <ItemInOrder
                                key={item._id}
                                singleItem={item}
                                keyID={item.productID}
                                addThisItemToOrder={this.ADD_THIS_ITEM} />
                        ))}
                    </div>
                    <div className="card-body" style={{ paddingTop: '0px' }}>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-end">
                                <button
                                    onClick={this.ADD_THESE_ITEMS_TO_THIS_ORDER}
                                    className="btn btn-success"
                                    style={{ marginRight: '10px' }}>Add to Cart</button>
                                <button
                                    onClick={this.CANCEL_THE_ORDER.bind(this, this.props.CURRENTORDERID)}
                                    className="btn btn-danger">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default withRouter(CreateOrder);
