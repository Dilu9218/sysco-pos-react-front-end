import React from 'react';
import { Redirect } from 'react-router-dom';

export function DecidedLandingPage(prop) {
    if (prop.ISLOGGEDIN) {
        return (
            <Redirect to='/my_orders' />
        );
    } else {
        return (
            <Redirect to='/login' />
        );
    }
}