import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import ListItemInEditOrder from './ListItemInEditOrder';

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
            TOTAL: 0
        };
    }

    // As the create order view mounted, generate a new order for the user
    // and in the meantime fetch the complete item list
    componentDidMount() {
        this.props.CREATE_NEW_ORDER_FOR_THIS_USER();
    }

    /**************************************************************************
     * Once all the items are set, this method will trigger the order state 
     * updating function in parent component to trigger a series of axios 
     * requests adding the items selected to the order and update the global 
     * item count. Before all that, this will filter the items for zero item 
     * counts. Once the parent function is triggered, redirects user to order
     * list after waiting for a time out depending on the number of items being
     * added to show user the completed order rather than a half filled order
     * as it takes some time to complete the axios promises.
     *************************************************************************/
    ADD_THESE_ITEMS_TO_THIS_ORDER = () => {
        this.props.ADD_ITEMS_TO_THIS_ORDER();
        setTimeout(() => {
            this.props.history.push('/my_orders')
        }, (50 * this.props.ITEMQUANTITY.length));
    }

    /**************************************************************************
     * If user chose not to create this order, this local function will trigger
     * parent component function to delete the current order being created. 
     * Once done, user will be redirected to order list.
     *************************************************************************/
    CANCEL_THE_ORDER = (ID) => {
        this.props.DELETE_THIS_ORDER(ID);
        this.props.CLEAR_ORDER_ADDING_PROCESS();
        this.props.history.push('/my_orders');
    }

    render() {
        if (!this.props.ISLOGGEDIN) {
            return (
                <Redirect to="/login" />
            );
        } else {
            return (
                <div>
                    <div className="card" style={{ margin: '25px', paddingBottom: '50px' }}>
                        <div className="card-body">
                            <h5 className="card-title"
                                style={{ margin: '0.5em 1em' }}>Item List</h5>
                            {this.props.ITEMSLIST.map((item) => (
                                <ListItemInEditOrder
                                    key={item._id}
                                    ITEM={item}
                                    NAME={item.productID}
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
                        <div className="card-body" style={{ paddingTop: '0px' }}>
                            <div className="row">
                                <div className="col-12 d-flex justify-content-end">
                                    <button
                                        onClick={this.ADD_THESE_ITEMS_TO_THIS_ORDER}
                                        className="btn btn-success"
                                        style={{ marginRight: '10px' }}>Add to Cart</button>
                                    <button
                                        onClick={this.CANCEL_THE_ORDER.bind(
                                            this, this.props.CURRENTORDERID
                                        )}
                                        className="btn btn-danger">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            );
        }
    }
}

export default withRouter(CreateOrder);
