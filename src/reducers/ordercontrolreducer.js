import {
    FETCH_EVERY_ORDER_FOR_THIS_USER,
    ERROR_FETCHING_ORDER_LIST_FOR_USER,
    DELETE_THIS_ORDER,
    RESET_CURRENT_ORDER_STATES,
    SET_THIS_ORDER_AS_CURRENT_ORDER
} from '../actions/types';

export const ORDER_LIST_REDUCER = (state = {
    ORDERLIST: []
}, action) => {
    switch (action.type) {
        case FETCH_EVERY_ORDER_FOR_THIS_USER:
            return {
                ORDERLIST: action.ORDERLIST
            }
        case ERROR_FETCHING_ORDER_LIST_FOR_USER:
            return {
                ORDERLIST: []
            }
        case DELETE_THIS_ORDER:
            return {
                ORDERLIST: state.ORDERLIST.filter(order => (order._id !== action.ID))
            }
        default:
            return state;
    }
}

export const CURRENT_ORDER_REDUCER = (state = {
    CURRENTORDER: {},
    TOTAL: 0,
    ITEMQUANTITY: {},
    CLONEITEMQUANTITY: {},
    URL: ''
}, action) => {
    switch (action.type) {
        case SET_THIS_ORDER_AS_CURRENT_ORDER:
            let tempItemQuantity = {};
            let tempTotal = 0;
            let currentOrder = action.CURRENTORDER;
            for (var item in currentOrder.items) {
                tempTotal += (
                    currentOrder.items[item].quantity *
                    currentOrder.items[item].price
                );
                tempItemQuantity[
                    currentOrder.items[item].productID
                ] = currentOrder.items[item].quantity;
            }
            return {
                CURRENTORDER: action.CURRENTORDER,
                TOTAL: tempTotal,
                ITEMQUANTITY: tempItemQuantity,
                CLONEITEMQUANTITY: JSON.parse(JSON.stringify(tempItemQuantity)),
                URL: action.URL
            }
        case RESET_CURRENT_ORDER_STATES:
            return {
                CURRENTORDER: {},
                TOTAL: 0,
                ITEMQUANTITY: {},
                CLONEITEMQUANTITY: {},
                URL: ''
            }
        default:
            return state;
    }
}