import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import { logUserOut } from "../actions/useraccountcontrolactions";
import { USERTOKEN } from "../constants";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

class LogOut extends Component {

    componentDidMount() {
        if (this.props.cookies.get(USERTOKEN)) {
            this.props.cookies.remove(USERTOKEN);
            this.props.logUserOut();
        }
    }

    render() {
        return (
            <Redirect to="/login" />
        );
    }
}

LogOut.propTypes = {
    logUserOut: PropTypes.func.isRequired
};

export default withCookies(connect(null, { logUserOut })(LogOut));
