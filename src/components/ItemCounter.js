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
class ItemCounter extends Component {

    state = {
        count: 0
    }

    INCREMENT_COUNT = (e) => {
        e.preventDefault();
        if (this.state.count !== this.props.MAX) {
            let newCount = this.state.count + 1;
            this.setState({
                count: newCount
            });
            this.props.ADD_THIS_ITEM(this.props.NAME, newCount);
        }
    }

    DECREMENT_COUNT = (e) => {
        e.preventDefault();
        if (this.state.count !== this.props.MIN) {
            let newCount = this.state.count - 1;
            this.setState({
                count: newCount
            });
            this.props.ADD_THIS_ITEM(this.props.NAME, newCount);
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="btn-group" role="group" aria-label="First group">
                    <button type="button" className="btn btn-secondary" onClick={this.INCREMENT_COUNT}>&#43;</button>
                    <div style={{ width: '3em', textAlign: 'center' }}>
                        <span className="input-group-text" style={{
                            display: 'inline-block', borderRadius: '0px', width: '100%'
                        }}>{this.state.count}</span></div>
                    <button type="button" className="btn btn-secondary" onClick={this.DECREMENT_COUNT}>&#8722;</button>
                </div>
            </React.Fragment>
        );
    }
}

export default ItemCounter;
