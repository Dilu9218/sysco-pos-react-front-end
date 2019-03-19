import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import ListItemInOrder from './ListItemInOrder';
import Beforeunload from 'react-beforeunload';

class EditOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            CANCELLED: false
        }
    }

    /**************************************************************************
     * Creates a list of items added and updated. This will calculate the made
     * difference between the old quantity and the new quantity
     *************************************************************************/
    UPDATE_THIS_ORDER = () => {
        this.props.UPDATE_ITEMS_IN_THIS_ORDER();
        setTimeout(() => {
            this.props.history.push('/my_orders')
        }, (50));
    }

    /**************************************************************************
     * Do not make any modifications to the current order or the order list,
     * just redirect user back to order list
     *************************************************************************/
    CANCEL_EDITING_THE_ORDER = () => {
        var byDate = this.props.ITEMSLIST.slice(0);
        byDate.sort(function (a, b) {
            return a.quantity - b.quantity;
        });
        console.log('by date:');
        console.log(byDate);
        this.setState({ CANCELLED: true });
        this.props.CLEAR_ORDER_UPDATE_PROCESS();
        this.props.history.push('/my_orders');
    }

    componentWillUnmount() {
        if (!this.state.CANCELLED) {
            this.props.UPDATE_ITEMS_IN_THIS_ORDER();
        }
    }

    render() {
        if (this.props.CURRENTORDERID === "") {
            return (
                <Redirect to="/my_orders" />
            );
        }
        return (
            <div>
                <Beforeunload onBeforeunload={() => "If you close the tab, changes made to this order will be lost!"} />
                <div className="card" style={{ margin: '25px', paddingBottom: '50px' }}>
                    <div className="card-body">
                        <h5 className="card-title" style={{ margin: '0.5em 1em' }}>Editing Order {this.props.CURRENTORDERID}</h5>
                        {this.props.ITEMSLIST.map((item) => (
                            <ListItemInOrder
                                key={item._id}
                                ITEM={item}
                                NAME={item.productID}
                                CLONEITEMQUANTITY={this.CLONEITEMQUANTITY}
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
                            <div className="col-4 d-flex justify-content-start d-inline">
                                <div className="input-group-prepend" style={{ marginLeft: '10px' }}>
                                    <span className="input-group-text"
                                        style={{
                                            borderTopRightRadius: '0px',
                                            borderBottomRightRadius: '0px'
                                        }}><strong>Total</strong></span>
                                    <span className="input-group-text"
                                        style={{
                                            borderTopLeftRadius: '0px',
                                            borderBottomLeftRadius: '0px'
                                        }}>Rs. {Math.abs((this.props.TOTAL)).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <div className="col-8 d-flex justify-content-end">
                                <button
                                    onClick={this.UPDATE_THIS_ORDER}
                                    className="btn btn-primary"
                                    style={{ marginRight: '10px' }}><i className="fas fa-pen"></i> Update Order</button>
                                <button
                                    onClick={this.CANCEL_EDITING_THE_ORDER}
                                    className="btn btn-danger"><i className="fas fa-times-circle"></i> Cancel</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default withRouter(EditOrder);
