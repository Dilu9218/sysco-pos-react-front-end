import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function LoginOrNot(p) {
    if (!p.logStatus) {
        return (
            <Link className="nav-item nav-link" to="/login">Login</Link>
        );
    } else {
        return (
            <Link className="nav-item nav-link" to="/logout">Logout</Link>
        );
    }
}

function RegisterOrNot(p) {
    if (!p.logStatus) {
        return (
            <Link className="nav-item nav-link" to="/register">Register</Link>
        );
    } else {
        return null;
    }
}

class Header extends Component {

    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse">
                        <span className="navbar-brand" style={{ paddingTop: '0px' }}>Sysco PoS System</span>
                        <div className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <Link className="nav-item nav-link disabled" to="/somewhere">Somewhere</Link>
                            <Link className="nav-item nav-link" to="/somewhereelse">Another Place</Link>
                        </div>
                        <div className="navbar-nav my-2 my-lg-0">
                            <LoginOrNot logStatus={this.props.logStatus} />
                            <RegisterOrNot logStatus={this.props.logStatus} />
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;
