import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

class TTT extends Component {

    componentDidMount() {
        console.log(this.props.cookies.get('usertoken'));
    }

    render() {
        return (
            <p>Hello</p>
        );
    }
}

export default withCookies(connect(null, null)(TTT));
