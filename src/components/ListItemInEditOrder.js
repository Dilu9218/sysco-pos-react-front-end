import React, { Component } from 'react';

function FillInItemCountInOrder(props) {
    if (props.itemCount !== 0) {
        return (<input
            name={props.keyID}
            type="number"
            className="form-control"
            value={props.itemCount}
            min="0" max={props.quantity} onKeyDown={() => true}
            onChange={props.onChange} />);
    } else {
        return (<input
            name={props.keyID}
            type="number"
            className="form-control"
            min="0" max={props.quantity} onKeyDown={() => true}
            onChange={props.onChange} />);
    }
}

class ListItemInEditOrder extends Component {

    constructor (props) {
        super(props);
        if (props.ITEMQTYINORDER) {
            this.state = {
                itemCount: props.ITEMQTYINORDER
            };
        } else {
            this.state = {
                itemCount: 0
            };
        }
    }

    onTodoChange = (value) => {
        this.setState({
            itemCount: value
        });
    }

    onChange = (e) => {
        this.onTodoChange(e.target.value);
        this.props.ADD_THIS_ITEM_TO_ORDER(e.target.name, e.target.value);
    }

    render() {
        let { productTitle, description, quantity, price } = this.props.ITEM;
        return (
            <li className="list-group-item d-flex justify-content-right" style={{ margin: '0px', padding: '0px', width: '100%' }}>
                <div className="row" style={{ margin: '0px', width: '100%' }}>
                    <div className="col-9 card">
                        <div className="card-body" style={{ padding: '5px 0px' }}>
                            <h6 className="card-title d-flex justify-content-right">{productTitle}</h6>
                            <p className="card-subtitle text-muted d-flex justify-content-right" style={{ textAlign: 'initial' }}>{description}</p>
                        </div>
                    </div><div className="col-1 card">
                        <div className="card-body d-flex align-items-center" style={{ padding: '5px 0px' }}>
                            <FillInItemCountInOrder
                                keyID={this.props.keyID}
                                quantity={quantity}
                                onChange={this.onChange}
                                itemCount={this.state.itemCount} />
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