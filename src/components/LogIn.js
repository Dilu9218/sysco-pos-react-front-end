import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom"
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { LOG_USER_IN } from "../actions/useraccountcontrolactions";
import { withCookies } from "react-cookie";

export class LogIn extends Component {

    // Keep a local state to capture username and password entered by user
    state = {
        username: "",
        password: ""
    }

    // As the values change in each text box, add them to the current state
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    // When the submit button is clicked, call an action to dispatch an event
    // to perform user login actions. If there are any errors, error messages
    // will be displayed extracted from the state
    onSubmit = (e) => {
        e.preventDefault();
        this.props.LOG_USER_IN(this.state.username, this.state.password);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cookies.get("usertoken") !== this.props.passKey) {
            this.props.cookies.set("usertoken",
                this.props.passKey, { path: "/" });
        }
    }

    render() {
        if (this.props.isLoggedIn) {
            return (
                <Redirect to="/my_orders" />
            );
        }
        return (
            <React.Fragment>
                <div className="d-flex justify-content-center">
                    <div className="card"
                        style={{ marginTop: "9rem", width: "30%" }}>
                        <div className="card-body">
                            <div className={this.props.alertMessage !== ""
                                ? "alert alert-warning"
                                : "alert alert-warning d-none"}>
                                {this.props.alertMessage}
                            </div>
                            <form className="mx-2" onSubmit={this.onSubmit}>
                                <div className="input-group my-3">
                                    <div className="input-group-prepend">
                                        <span
                                            className="input-group-text"
                                            id="basic-addon1"
                                            style={{ width: "125px" }}>
                                            Username</span>
                                    </div>
                                    <input
                                        name="username"
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your username"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        required autoFocus autoComplete="true"
                                        value={this.state.username}
                                        onChange={this.onChange} />
                                </div>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span
                                            className="input-group-text"
                                            id="basic-addon2"
                                            style={{ width: "125px" }}>
                                            Password</span>
                                    </div>
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        placeholder="Password here"
                                        aria-label="Password"
                                        aria-describedby="basic-addon2"
                                        autoComplete="true" required
                                        value={this.state.password}
                                        onChange={this.onChange} />
                                </div>
                                <button
                                    className="btn btn-primary text-uppercase my-3 sign-in-btn"
                                    style={{ width: "100%" }}
                                    type="submit">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

LogIn.propTypes = {
    LOG_USER_IN: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    passKey: PropTypes.string,
    alertMessage: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.uac.isLoggedIn,
    passKey: state.uac.passKey,
    alertMessage: state.uac.alertMessage
});

export default withCookies(withRouter(connect(mapStateToProps, { LOG_USER_IN })(LogIn)));
