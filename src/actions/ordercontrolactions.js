import axios from 'axios';

import {
    ORDER_LIST_ENDPOINT,
    ORDER_REQUEST_ENDPOINT,
    ORDER_CHECKOUT_ENDPOINT,
    ADD_TO_ORDER_ENDPOINT,
    ITEMS_LIST_ENDPOINT,
    NEW_ORDER_ENDPOINT
} from '../constants';

import {
    CREATE_NEW_ORDER_FOR_THIS_USER,
    FETCH_EVERY_ORDER_FOR_THIS_USER,
    FETCH_COMPLETE_ITEMS_LIST,
    ERROR_FETCHING_ITEMS_LIST,
    ERROR_FETCHING_ORDER_LIST_FOR_USER,
    SET_THIS_ORDER_AS_CURRENT_ORDER,
    RESET_CURRENT_ORDER_STATES,
    CHECK_OUT_ORDER,
    APPEND_THIS_ITEM_TO_ORDER,
    DELETE_THIS_ORDER,
    ADD_THIS_ITEM_TO_QUANTITY,
    DELETE_THIS_ITEM_FROM_QUANTITY,
    INDECREMENT_ITEM_FROM_QUANTITY,
    ADD_THESE_ITEMS_TO_THIS_ORDER
} from './types';

/*************************************************************************************************** 
 * Creates a blank order as the initial step in order creation. This will make an API call to server
 * creating a new order and returns an order ID which will be saved in redux store under the name:
 * `currentOrderID`. This will be mongodb generated key for the created order.
 * @param accesstoken authorization token to verify user
 * @emits CREATE_NEW_ORDER_FOR_THIS_USER
 **************************************************************************************************/
export const dispatch_CreateNewOrderForThisUser = (accesstoken) => (dispatch) => {
    axios.post(NEW_ORDER_ENDPOINT, {},
        { headers: { 'x-access-token': accesstoken } })
        .then(newOrder => {
            dispatch({
                type: CREATE_NEW_ORDER_FOR_THIS_USER,
                id: newOrder.data._id
            });
        })
        .catch(err => console.log(err));
}

export const dispatch_FETCH_EVERY_ORDER_FOR_THIS_USER = (accesstoken) => (dispatch) => {
    axios.get(ORDER_LIST_ENDPOINT,
        { headers: { 'x-access-token': accesstoken } })
        .then(res => {
            dispatch({
                type: FETCH_EVERY_ORDER_FOR_THIS_USER,
                orderList: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: ERROR_FETCHING_ORDER_LIST_FOR_USER
            });
        });
}

export const dispatch_RESET_CURRENT_ORDER_STATES = () => (dispatch) => {
    dispatch({
        type: RESET_CURRENT_ORDER_STATES
    });
}

export const dispatch_CHECK_OUT_ORDER = (id, accesstoken) => (dispatch) => {
    axios.delete(ORDER_CHECKOUT_ENDPOINT + `/${id}`,
        { headers: { 'x-access-token': accesstoken } })
        .then(checkedOut => {
            dispatch({
                type: CHECK_OUT_ORDER,
                id: id
            });
        }).catch(err => {
            console.log(err);
        });
}

export const dispatch_SET_THIS_ORDER_AS_CURRENT_ORDER = (order, url) => (dispatch) => {
    dispatch({
        type: SET_THIS_ORDER_AS_CURRENT_ORDER,
        currentOrder: order,
        url: url
    });
}

export const dispatch_DELETE_THIS_ORDER = (id, accesstoken) => (dispatch) => {
    axios.delete(ORDER_REQUEST_ENDPOINT + `/${id}`,
        { headers: { 'x-access-token': accesstoken } })
        .then(deletedOrder => {
            dispatch({
                type: DELETE_THIS_ORDER,
                id
            });
        }).catch(err => {
            console.log(err);
        });
}

export const dispatch_ADD_THIS_ITEM_TO_QUANTITY = (id) => (dispatch) => {
    dispatch({
        type: ADD_THIS_ITEM_TO_QUANTITY,
        id
    });
}

export const dispatch_DELETE_THIS_ITEM_FROM_QUANTITY = (id, price) => (dispatch) => {
    dispatch({
        type: DELETE_THIS_ITEM_FROM_QUANTITY,
        id,
        price
    });
}

export const dispatch_INDECREMENT_ITEM_FROM_QUANTITY = (id, direction, price) => (dispatch) => {
    dispatch({
        type: INDECREMENT_ITEM_FROM_QUANTITY,
        id,
        direction,
        price
    });
}

export const dispatch_ADD_THESE_ITEMS_TO_THIS_ORDER = (id, items, accesstoken) => (dispatch) => {
    axios.put(ADD_TO_ORDER_ENDPOINT + `/${id}`, { items },
        { headers: { 'x-access-token': accesstoken } })
        .then(res => {
            dispatch({
                type: ADD_THESE_ITEMS_TO_THIS_ORDER,
                updatedOrder: res.data
            });
        })
        .catch(err => console.log(err));
}

export const dispatch_AppendThisItemToOrder = (productID, orderID, accesstoken, itemsList) =>
    (dispatch) => {
        axios.post(ADD_TO_ORDER_ENDPOINT + `/${orderID}`, {
            productID,
            quantity: 1
        },
            { headers: { 'x-access-token': accesstoken } })
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: APPEND_THIS_ITEM_TO_ORDER,
                    productID,
                    itemsList
                });
            })
            .catch(err => console.log(err));
    }

export const dispatch_GetTheCompleteItemsList = (accesstoken) => (dispatch) => {
    axios.get(ITEMS_LIST_ENDPOINT,
        { headers: { 'x-access-token': accesstoken } })
        .then(res => {
            dispatch({
                type: FETCH_COMPLETE_ITEMS_LIST,
                itemsList: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: ERROR_FETCHING_ITEMS_LIST
            });
        });
}