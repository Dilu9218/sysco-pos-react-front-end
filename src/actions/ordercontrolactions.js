import axios from 'axios';

import {
    ORDER_LIST_ENDPOINT,
    ORDER_REQUEST_ENDPOINT,
    ORDER_CHECKOUT_ENDPOINT,
    NEW_ORDER_ENDPOINT
} from '../constants';

import {
    FETCH_EVERY_ORDER_FOR_THIS_USER,
    ERROR_FETCHING_ORDER_LIST_FOR_USER,
    SET_THIS_ORDER_AS_CURRENT_ORDER,
    RESET_CURRENT_ORDER_STATES,
    CHECK_OUT_ORDER,
    DELETE_THIS_ORDER,
    ADD_THIS_ITEM_TO_QUANTITY,
    DELETE_THIS_ITEM_FROM_QUANTITY,
    INDECREMENT_ITEM_FROM_QUANTITY,
    CREATE_NEW_ORDER_FOR_THIS_USER
} from './types';

export const GET_THE_ORDER_LIST_FOR_THIS_USER = (accesstoken) => (dispatch) => {
    axios.get(ORDER_LIST_ENDPOINT,
        { headers: { 'x-access-token': accesstoken } })
        .then(res => {
            dispatch({
                type: FETCH_EVERY_ORDER_FOR_THIS_USER,
                ORDERLIST: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: ERROR_FETCHING_ORDER_LIST_FOR_USER
            });
        });
}

export const CREATE_NEW_ORDER = (accesstoken) => (dispatch) => {
    axios.post(NEW_ORDER_ENDPOINT, {},
        { headers: { 'x-access-token': accesstoken } })
        .then(newOrder => {
            dispatch({
                type: CREATE_NEW_ORDER_FOR_THIS_USER,
                ID: newOrder.data._id
            });
        })
        .catch(err => console.log(err));
}

export const RESET_CURRENT_ORDER = () => (dispatch) => {
    dispatch({
        type: RESET_CURRENT_ORDER_STATES
    });
}

export const CHECK_OUT_THIS_ORDER = (id, accesstoken) => (dispatch) => {
    axios.delete(ORDER_CHECKOUT_ENDPOINT + `/${id}`,
        { headers: { 'x-access-token': accesstoken } })
        .then(checkedOut => {
            dispatch({
                type: CHECK_OUT_ORDER,
                ID: id
            });
        }).catch(err => {
            console.log(err);
        });
}

export const PREPARE_ORDER_AS_CURRENT = (order, url) => (dispatch) => {
    dispatch({
        type: SET_THIS_ORDER_AS_CURRENT_ORDER,
        CURRENTORDER: order,
        URL: url
    });
}

export const REMOVE_THIS_ORDER = (id, accesstoken) => (dispatch) => {
    axios.delete(ORDER_REQUEST_ENDPOINT + `/${id}`,
        { headers: { 'x-access-token': accesstoken } })
        .then(deletedOrder => {
            dispatch({
                type: DELETE_THIS_ORDER,
                ID: id
            });
        }).catch(err => {
            console.log(err);
        });
}

export const ADD_THIS_ITEM_TO_ITEMQUANTITY = (id) => (dispatch) => {
    dispatch({
        type: ADD_THIS_ITEM_TO_QUANTITY,
        ID: id
    });
}

export const DELETE_THIS_ITEM_FROM_ITEMQUANTITY = (id, price) => (dispatch) => {
    dispatch({
        type: DELETE_THIS_ITEM_FROM_QUANTITY,
        ID: id,
        PRICE: price
    });
}

export const INDECREMENT_ITEM_FROM_ITEMQUANTITY = (id, direction) => (dispatch) => {
    dispatch({
        type: INDECREMENT_ITEM_FROM_QUANTITY,
        ID: id,
        DIRECTION: direction
    });
}