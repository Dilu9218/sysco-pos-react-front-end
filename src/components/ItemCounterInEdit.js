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
 * @param INITIAL Initial value to display
 * @param MIN Minimum allowable value
 * @param MAX Maximum allowable value
 * @param ADD_THIS_ITEM Function responsible for handling the item counts
 */
class ItemCounterInEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            COUNT: props.INITIAL
        }
    }

    componentDidMount() {
        this.setState({
            COUNT: this.props.INITIAL
        });
    }

    DELETE_THIS_ITEM = (e) => {
        e.preventDefault();
        this.setState({
            COUNT: 0
        });
        this.props.DELETE_THIS_ITEM();
    }

    /**************************************************************************
     * This will add one to the local count until it reaches the value defined
     * by MAX value and triggers the ADD_THIS_ITEM function set by parent
     *************************************************************************/
    INCREMENT_COUNT = (e) => {
        e.preventDefault();
        if (this.state.COUNT !== this.props.MAX) {
            let newCount = this.state.COUNT + 1;
            this.setState({
                COUNT: newCount
            });
            this.props.ADD_THIS_ITEM(this.props.NAME, newCount);
        }
    }

    /**************************************************************************
     * This will substract one from the local count until it reaches the value
     * defined by MIN value and triggers the ADD_THIS_ITEM function
     *************************************************************************/
    DECREMENT_COUNT = (e) => {
        e.preventDefault();
        if (this.state.COUNT !== this.props.MIN) {
            let newCount = this.state.COUNT - 1;
            this.setState({
                COUNT: newCount
            });
            this.props.ADD_THIS_ITEM(this.props.NAME, newCount);
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
                            }}>{this.state.COUNT}</span></div>
                        <button type="button" className="btn btn-secondary" onClick={this.DECREMENT_COUNT}>&#8722;</button>
                    </div>
                    <RenderDeleteButton
                        COUNT={this.state.COUNT}
                        DELETE_THIS_ITEM={this.DELETE_THIS_ITEM} />
                </div>
            </React.Fragment>
        );
    }
}

export default ItemCounterInEdit;
