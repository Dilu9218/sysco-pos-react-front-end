import {
    FETCH_EVERY_ORDER_FOR_THIS_USER,
    ERROR_FETCHING_ORDER_LIST_FOR_USER
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
        default:
            return state;
    }
}