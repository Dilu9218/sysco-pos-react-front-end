import React, { Component } from 'react';
import ItemCounterInCustomerItem from './ItemCounterInCustomerItem';

class ListItemInCustomer extends Component {

    DELETE_THIS_ITEM = (ID, VALUE) => {
        this.props.DELETE_THIS_ITEM(ID, VALUE)
    }

    render() {
        let { customerTitle, description } = this.props.ITEM;
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
                            <ItemCounterInListItem
                                NAME={this.props.NAME} MIN={0} MAX={quantity + (this.props.CLONEITEMQUANTITY === undefined
                                    ? 0 : this.props.CLONEITEMQUANTITY)}
                                COUNT={this.props.ITEMQUANTITY}
                                ADD_THIS_ITEM_TO_ITEMQUANTITY={this.props.ADD_THIS_ITEM_TO_ITEMQUANTITY}
                                INDECCREMENT_ITEM_COUNT={this.props.INDECCREMENT_ITEM_COUNT}
                                DELETE_THIS_ITEM={this.props.DELETE_THIS_ITEM} />
                        </div>
                    </div>
                    <div className="col-2 card text-right">
                        <p className="card-text" style={{ margin: '5px 0 0 0' }}>{description}</p>
                    </div>
                </div>
            </li>
        );
    }
}

export default ListItemInCustomer;
