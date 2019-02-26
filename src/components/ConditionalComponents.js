import React from 'react';
import { Redirect } from 'react-router-dom';

import EditOrder from './EditOrder';

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

export function GoToEditOrder(prop) {
    if (prop.currentOrderInContext) {
        return (
            <EditOrder
                usertoken={prop.usertoken}
                viewingOrder={prop.viewingOrder}
                fetchAllItemsList={prop.fetchAllItemsList}
                currentOrderInContext={prop.currentOrderInContext}
                allItemsList={prop.allItemsList} />
        );
    } else {
        return (
            <Redirect to='/my_orders' />
        );
    }
}