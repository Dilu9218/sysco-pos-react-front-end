import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function HeaderAccordingLogStatus(props) {
    if (props.isLoggedIn) {
        return (
            <div className="collapse navbar-collapse">
                <Link className="navbar-brand" style={{ paddingTop: '0px' }} to="/home">Sysco PoS System</Link>
                <div className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <Link className="nav-item nav-link" to="/my_orders">My Orders</Link>
                    <Link className="nav-item nav-link" to="/create_order">Create Order</Link>
                </div>
                <div className="navbar-nav my-2 my-lg-0">
                    <Link className="nav-item nav-link" to="/logout">Logout</Link>
                </div>
            </div>
        );
    } else {
        return (
            <div className="collapse navbar-collapse">
                <Link className="navbar-brand" style={{ paddingTop: '0px' }} to="/">Sysco PoS System</Link>
                <div className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <Link className="nav-item nav-link" to="/about_us">About Us</Link>
                </div>
                <div className="navbar-nav my-2 my-lg-0">
                    <Link className="nav-item nav-link" to="/login">Login</Link>
                    <Link className="nav-item nav-link" to="/register">Register</Link>
                </div>
            </div>
        );
    }
}

class Header extends Component {

    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <HeaderAccordingLogStatus isLoggedIn={this.props.logStatus} />
                </nav>
            </header>
        );
    }
}

export default Header;
