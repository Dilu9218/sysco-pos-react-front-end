import React, { Component } from 'react';
import ItemCounterInEdit from './ItemCounterInEdit';

class ListItemInEditOrder extends Component {

    DELETE_THIS_ITEM = (ID, VALUE) => {
        this.props.DELETE_THIS_ITEM(ID, VALUE)
    }

    render() {
        let { productTitle, description, quantity, price } = this.props.ITEM;
        return (
            <li className="list-group-item d-flex justify-content-right" style={{ margin: '0px', padding: '0px', width: '100%' }}>
                <div className="row" style={{ margin: '0px', width: '100%' }}>
                    <div className="col-8 card">
                        <div className="card-body" style={{ padding: '5px 0px' }}>
                            <h6 className="card-title d-flex justify-content-right">{productTitle}</h6>
                            <p className="card-subtitle text-muted d-flex justify-content-right" style={{ textAlign: 'initial' }}>{description}</p>
                        </div>
                    </div><div className="col-2 card">
                        <div className="card-body d-flex align-items-center" style={{ padding: '5px 0px' }}>
                            <ItemCounterInEdit
                                NAME={this.props.keyID} MIN={0} MAX={quantity} INITIAL={this.props.ITEMQTYINORDER}
                                ADD_THIS_ITEM={this.props.ADD_THIS_ITEM_TO_ORDER}
                                DELETE_THIS_ITEM={this.DELETE_THIS_ITEM.bind(this, this.props.keyID, this.props.ITEMQTYINORDER)} />
                        </div>
                    </div>
                    <div className="col-2 card text-right">
                        <p className="card-text" style={{ margin: '5px 0 0 0' }}>{quantity} Nos</p>
                        <p className="card-link" style={{ margin: '0px' }}>@ <b>Rs. {price.toFixed(2)}</b></p>
                    </div>
                </div>
            </li>
        );
    }
}

export default ListItemInEditOrder;