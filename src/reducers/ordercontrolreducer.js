import {
    FETCH_EVERY_ORDER_FOR_THIS_USER,
    ERROR_FETCHING_ORDER_LIST_FOR_USER,
    DELETE_THIS_ORDER,
    CHECK_OUT_ORDER,
    RESET_CURRENT_ORDER_STATES,
    SET_THIS_ORDER_AS_CURRENT_ORDER,
    ADD_THIS_ITEM_TO_QUANTITY,
    DELETE_THIS_ITEM_FROM_QUANTITY,
    INDECREMENT_ITEM_FROM_QUANTITY,
    ADD_THESE_ITEMS_TO_THIS_ORDER,
    CREATE_NEW_ORDER_FOR_THIS_USER
} from '../actions/types';

let initialState = {
    ORDERLIST: [],
    CURRENTORDER: {},
    CURRENTORDERID: '',
    TOTAL: 0,
    ITEMQUANTITY: {},
    CLONEITEMQUANTITY: {},
    URL: '',
    STATUS: false
}

export const ORDER_LIST_REDUCER = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EVERY_ORDER_FOR_THIS_USER:
            return {
                ...state,
                ORDERLIST: action.ORDERLIST
            }
        case ERROR_FETCHING_ORDER_LIST_FOR_USER:
            return {
                ORDERLIST: [],
                CURRENTORDER: {},
                CURRENTORDERID: '',
                TOTAL: 0,
                ITEMQUANTITY: {},
                CLONEITEMQUANTITY: {},
                URL: '',
                STATUS: false
            }
        case DELETE_THIS_ORDER:
            return {
                ORDERLIST: state.ORDERLIST.filter(order => (order._id !== action.ID)),
                CURRENTORDER: {},
                CURRENTORDERID: '',
                TOTAL: 0,
                ITEMQUANTITY: {},
                CLONEITEMQUANTITY: {},
                URL: '',
                STATUS: false
            }
        case CHECK_OUT_ORDER:
            return {
                ...state,
                URL: '/my_orders',
                ORDERLIST: state.ORDERLIST.filter(order => (order._id !== action.ID)),
            }
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
                ...state,
                CURRENTORDER: action.CURRENTORDER,
                CURRENTORDERID: action.CURRENTORDER._id,
                TOTAL: tempTotal,
                ITEMQUANTITY: tempItemQuantity,
                CLONEITEMQUANTITY: JSON.parse(JSON.stringify(tempItemQuantity)),
                URL: action.URL
            }
        case RESET_CURRENT_ORDER_STATES:
            return {
                ...state,
                CURRENTORDER: {},
                CURRENTORDERID: '',
                TOTAL: 0,
                ITEMQUANTITY: {},
                CLONEITEMQUANTITY: {},
                URL: '',
                STATUS: false
            }
        case CREATE_NEW_ORDER_FOR_THIS_USER:
            return {
                ...state,
                CURRENTORDERID: action.ID
            }
        case ADD_THIS_ITEM_TO_QUANTITY:
            return {
                ...state,
                ITEMQUANTITY: {
                    ...state.ITEMQUANTITY,
                    [action.ID]: 0
                }
            }
        case DELETE_THIS_ITEM_FROM_QUANTITY:
            let NEWITEMQTY = state.ITEMQUANTITY;
            let RESERVE = (action.PRICE * state.ITEMQUANTITY[action.ID]);
            delete NEWITEMQTY[action.ID];
            return {
                ...state,
                TOTAL: state.TOTAL - RESERVE,
                ITEMQUANTITY: NEWITEMQTY
            }
        case INDECREMENT_ITEM_FROM_QUANTITY:
            return {
                ...state,
                TOTAL: state.TOTAL + (
                    action.DIRECTION ? 1 : -1) * action.PRICE,
                ITEMQUANTITY: {
                    ...state.ITEMQUANTITY,
                    [action.ID]: state.ITEMQUANTITY[action.ID] + (
                        action.DIRECTION ? 1 : -1)
                }
            }
        case ADD_THESE_ITEMS_TO_THIS_ORDER:
            return {
                ...state,
                ORDERLIST: [
                    ...state.ORDERLIST,
                    action.UPDATEDORDER
                ],
                STATUS: true
            }
        default:
            return state;
    }
}