import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import { LOG_USER_OUT } from "../actions/useraccountcontrolactions";
import { USERTOKEN } from "../constants";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

class LogOut extends Component {

    componentDidMount() {
        if (this.props.cookies.get(USERTOKEN)) {
            this.props.cookies.remove(USERTOKEN);
            this.props.LOG_USER_OUT();
        }
    }

    render() {
        return (
            <Redirect to="/login" />
        );
    }
}

LogOut.propTypes = {
    LOG_USER_OUT: PropTypes.func.isRequired
};

export default withCookies(connect(null, { LOG_USER_OUT })(LogOut));
