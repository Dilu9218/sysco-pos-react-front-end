import React, { Component } from 'react';

function RenderDeleteButton(props) {
    if (props.COUNT !== 0) {
        return (
            <div className="btn-group" role="group" aria-label="Delete-Group" style={{ marginLeft: '10px' }}>
                <button type="button" className="btn btn-danger" onClick={props.DELETE_THIS_ITEM}>&#215;</button>
            </div>
        );
    } else {
        return (
            <React.Fragment></React.Fragment>
        );
    }
}

/**
 * Custom component to increment and decrement value within a minimum and
 * maximum range. A local count will be maintained to help with validation
 * @param NAME Identifier for this counter
 * @param MIN Minimum allowable value
 * @param MAX Maximum allowable value
 */
class ItemCounterInListItem extends Component {

    /**************************************************************************
     * Triggers the parent component method to clear the count for this item
     *************************************************************************/
    DELETE_THIS_ITEM = (e) => {
        e.preventDefault();
        this.props.DELETE_THIS_ITEM(this.props.NAME);
    }

    /**************************************************************************
     * This will increment the item count by one if it is an existing item and
     * will request to add a new item to the quantity list if it is not and do
     * update its count as usual
     *************************************************************************/
    INCREMENT_COUNT = (e) => {
        e.preventDefault();
        if (this.props.COUNT !== this.props.MAX) {
            if (this.props.COUNT === 0) {
                this.props.ADD_THIS_ITEM_TO_ITEMQUANTITY(this.props.NAME);
            }
            this.props.INDECCREMENT_ITEM_COUNT(this.props.NAME, true);
        }
    }

    /**************************************************************************
     * This method will decrement the count of item quantities in parent state
     *************************************************************************/
    DECREMENT_COUNT = (e) => {
        e.preventDefault();
        if (this.props.COUNT !== this.props.MIN) {
            this.props.INDECCREMENT_ITEM_COUNT(this.props.NAME, false);
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group" role="group" aria-label="Item-Group">
                        <button type="button" className="btn btn-secondary" onClick={this.INCREMENT_COUNT}>&#43;</button>
                        <div style={{ width: '3em', textAlign: 'center' }}>
                            <span className="input-group-text" style={{
                                display: 'inline-block', borderRadius: '0px', width: '100%', height: '100%'
                            }}>{this.props.COUNT}</span></div>
                        <button type="button" className="btn btn-secondary" onClick={this.DECREMENT_COUNT}>&#8722;</button>
                    </div>
                    <RenderDeleteButton
                        COUNT={this.props.COUNT}
                        DELETE_THIS_ITEM={this.DELETE_THIS_ITEM} />
                </div>
            </React.Fragment>
        );
    }
}

export default ItemCounterInListItem;
