import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export function ConditionalHeader(P) {
    if (P.isLoggedIn) {
        return (
            <div className="collapse navbar-collapse">
                <Link className="navbar-brand"
                    style={{ paddingTop: '0px' }}
                    to="/home">Sysco PoS System</Link>
                <div className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <Link className="nav-item nav-link"
                        to="/my_orders">
                        <i className="fas fa-list-ul"></i> My Orders</Link>
                    <Link className="nav-item nav-link"
                        to="/create_order">
                        <i className="fas fa-plus"></i> Create Order</Link>
                </div>
                <div className="navbar-nav my-2 my-lg-0">
                    <Link className="nav-item nav-link"
                        to="/logout">
                        <i className="fas fa-sign-out-alt"></i> Logout</Link>
                </div>
            </div>
        );
    } else {
        return (
            <div className="collapse navbar-collapse">
                <Link className="navbar-brand"
                    style={{ paddingTop: '0px' }}
                    to="/">Sysco PoS System</Link>
                <div className="navbar-nav ml-auto">
                    <Link className="nav-item nav-link"
                        to="/login">
                        <i className="fas fa-sign-in-alt"></i> Login</Link>
                    <Link className="nav-item nav-link"
                        to="/register">Register</Link>
                </div>
            </div>
        );
    }
}

/******************************************************************************
 * Navigation bar at the top of the page. This will change state depending on
 * the log state of user. The final render will be conditioned on that and will
 * be rendered using `ConditionalHeader` component in this same component class
 *****************************************************************************/
export class Header extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ConditionalHeader isLoggedIn={this.props.isLoggedIn} />
                </nav>
            </header>
        );
    }
}

Header.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isLoggedIn: state.uac.isLoggedIn
});

export default connect(mapStateToProps, null)(Header)