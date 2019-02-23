import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';

class LogIn extends Component {

    // Register component will have the following states to help with user registration
    state = {
        username: '',
        password: '',
        alertMessage: '',
        alertUser: false
    }

    // As the values are being changed in each text box, add them to the current state
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    // When the submit button is clicked, validate if the passwords are matching. If not,
    // prompt user with a warning and do not submit the results up in the ladder. If they
    // are valid, register user and redirect to login page.
    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ alertUser: false });
        axios.post('http://localhost:8080/api/user/login', {
            username: this.state.username,
            password: this.state.password
        })
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        alertUser: false,
                        alertMessage: ''
                    });
                    this.props.markLogStatus(true, res.data.token);
                    this.props.history.push('/my_orders');
                }
            }).catch(err => {
                if (err.response.status === 401) {
                    this.setState({
                        password: '',
                        alertUser: true,
                        alertMessage: 'Password is wrong'
                    });
                } else if (err.response.status === 404) {
                    this.setState({
                        username: '',
                        password: '',
                        alertUser: true,
                        alertMessage: 'User doesn\'t exist'
                    });
                } else {
                    this.setState({
                        alertUser: true,
                        alertMessage: 'Error at server'
                    });
                }
            });
    }

    render() {
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
                                        aria-label="Username" aria-describedby="basic-addon1" required autoFocus
                                        value={this.state.username} onChange={this.onChange} />
                                </div>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon2" style={{ width: '125px' }}>Password</span>
                                    </div>
                                    <input name="password" type="password" className="form-control" placeholder="Password here"
                                        aria-label="Password" aria-describedby="basic-addon2" autoComplete="true" required
                                        value={this.state.password} onChange={this.onChange} />
                                </div>
                                <button className="btn btn-primary text-uppercase my-3" style={{ width: '100%' }} type="submit">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default withRouter(LogIn);
