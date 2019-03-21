import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { registerUser } from "../actions/useraccountcontrolactions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Register extends Component {

    // Register component will have the following states to help with
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            newpassword: "",
            conpassword: ""
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.alertMessage !== this.props.alertMessage) {
            this.setState({
                username: "",
                newpassword: "",
                conpassword: ""
            });
        }
    }

    // As the values are being changed in each text box, add them to the state
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    // When the submit button is clicked, dispatch an action to validate if the
    // passwords are matching. If they are, register the user and if they are 
    // not, show error message. Similarly when the user name is already taken,
    // show an error message displaying that the user already exists
    onSubmit = (e) => {
        e.preventDefault();
        this.props.registerUser(
            this.state.username,
            this.state.newpassword,
            this.state.conpassword
        );
    }

    render() {
        if (this.props.isLoggedIn) {
            return (
                <Redirect to="/my_orders" />
            );
        } else if (this.props.registered) {
            return (
                <Redirect to="/login" />
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
                                        value={this.state.username}
                                        required autoFocus
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
                                        name="newpassword"
                                        type="password"
                                        className="form-control"
                                        placeholder="New Password"
                                        aria-label="Password"
                                        aria-describedby="basic-addon2"
                                        value={this.state.newpassword}
                                        required
                                        onChange={this.onChange}
                                        autoComplete="false" />
                                </div>
                                <div className="input-group my-3">
                                    <div className="input-group-prepend">
                                        <span
                                            className="input-group-text"
                                            id="basic-addon2"
                                            style={{ width: "125px" }}>
                                            Password</span>
                                    </div>
                                    <input
                                        name="conpassword"
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        aria-label="Password"
                                        aria-describedby="basic-addon2"
                                        value={this.state.conpassword} required
                                        onChange={this.onChange}
                                        autoComplete="false" />
                                </div>
                                <button
                                    className="btn btn-success text-uppercase btn-register"
                                    style={{ width: "100%" }}
                                    type="submit">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}


Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    alertMessage: PropTypes.string.isRequired,
    registered: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.uac.isLoggedIn,
    alertMessage: state.reg.alertMessage,
    registered: state.reg.registered
});

export default connect(mapStateToProps, { registerUser })(Register);
