import React, { Component } from 'react';

/**
 * Custom component to increment and decrement value within a minimum and
 * maximum range. A local count will be maintained to help with validation
 * @param NAME Identifier for this counter
 * @param INITIAL Initial value to display
 * @param MIN Minimum allowable value
 * @param MAX Maximum allowable value
 * @param ADD_THIS_ITEM Function responsible for handling the item counts
 */
class ItemCounterInCreate extends Component {

    /**************************************************************************
     * This will add one to the local count until it reaches the value defined
     * by MAX value and triggers the ADD_THIS_ITEM function set by parent
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
     * This will substract one from the local count until it reaches the value
     * defined by MIN value and triggers the ADD_THIS_ITEM function
     *************************************************************************/
    DECREMENT_COUNT = (e) => {
        e.preventDefault();
        if (this.props.COUNT !== this.props.MIN) {
            this.props.INDECCREMENT_ITEM_COUNT(this.props.NAME, false);
        }
    }

    render() {
        return (
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group" role="group" aria-label="Item-Group" style={{ marginRight: '10px' }}>
                    <button type="button" className="btn btn-secondary" onClick={this.INCREMENT_COUNT}>&#43;</button>
                    <div style={{ width: '3em', textAlign: 'center' }}>
                        <span className="input-group-text" style={{
                            display: 'inline-block', borderRadius: '0px', width: '100%', height: '100%'
                        }}>{this.props.COUNT}</span></div>
                    <button type="button" className="btn btn-secondary" onClick={this.DECREMENT_COUNT}>&#8722;</button>
                </div>
            </div>
        );
    }
}

export default ItemCounterInCreate;
