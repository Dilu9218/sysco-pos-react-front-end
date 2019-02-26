import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios';

class Register extends Component {

    // Register component will have the following states to help with user registration
    state = {
        username: '',
        newpassword: '',
        conpassword: '',
        alertMessage: 'Passwords don\'t match',
        alertUser: false
    }

    // As the values are being changed in each text box, add them to the current state
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    // When the submit button is clicked, validate if the passwords are matching. If not,
    // prompt user with a warning and do not submit the results up in the ladder. If they
    // are valid, register user and redirect to login page.
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.newpassword === this.state.conpassword) {
            this.setState({ alertUser: false });
            axios.post('http://localhost:8080/api/user/register', {
                username: this.state.username,
                password: this.state.newpassword,
                isAdmin: false
            })
                .then(res => {
                    if (res.status === 200) {
                        this.props.history.push('/login');
                    }
                }).catch(err => {
                    if (err.response.status === 409) {
                        this.setState({
                            username: '',
                            newpassword: '',
                            conpassword: '',
                            alertMessage: 'User already exists',
                            alertUser: true
                        });
                    }
                });
        } else {
            this.setState({
                username: this.state.username,
                newpassword: '',
                conpassword: '',
                alertMessage: 'Passwords don\'t match',
                alertUser: true
            });
        }
    }

    render() {
        if (this.props.ISLOGGEDIN) {
            return (
                <Redirect to="/my_orders" />
            );
        }
        return (
            <React.Fragment>
                <div className="d-flex justify-content-center">
                    <div className='card' style={{ marginTop: '9rem', width: '30%' }}>
                        <div className="card-body">
                            <div className={this.state.alertUser ? "alert alert-warning" : "alert alert-warning d-none"}>
                                {this.state.alertMessage}
                            </div>
                            <form className="mx-2" onSubmit={this.onSubmit}>
                                <div className="input-group my-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1" style={{ width: '125px' }}>Username</span>
                                    </div>
                                    <input name="username" type="text" className="form-control" placeholder="Enter your username"
                                        aria-label="Username" aria-describedby="basic-addon1" value={this.state.username} required autoFocus
                                        onChange={this.onChange} />
                                </div>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon2" style={{ width: '125px' }}>Password</span>
                                    </div>
                                    <input name="newpassword" type="password" className="form-control" placeholder="New Password"
                                        aria-label="Password" aria-describedby="basic-addon2" value={this.state.newpassword} required
                                        onChange={this.onChange} autoComplete="false" />
                                </div>
                                <div className="input-group my-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon2" style={{ width: '125px' }}>Password</span>
                                    </div>
                                    <input name="conpassword" type="password" className="form-control" placeholder="Confirm Password"
                                        aria-label="Password" aria-describedby="basic-addon2" value={this.state.conpassword} required
                                        onChange={this.onChange} autoComplete="false" />
                                </div>
                                <button className="btn btn-success text-uppercase" style={{ width: '100%' }} type="submit">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default withRouter(Register);
