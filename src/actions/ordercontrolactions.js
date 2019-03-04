import axios from 'axios';

import {
    ORDER_LIST_ENDPOINT
} from '../constants';

import {
    FETCH_EVERY_ORDER_FOR_THIS_USER,
    ERROR_FETCHING_ORDER_LIST_FOR_USER
} from './types';

export const GET_THE_ORDER_LIST_FOR_THIS_USER = (accesstoken) => (dispatch) => {
    axios.get(ORDER_LIST_ENDPOINT,
        { headers: { 'x-access-token': accesstoken } })
        .then(res => {
            dispatch({
                type: FETCH_EVERY_ORDER_FOR_THIS_USER,
                ORDERLIST: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: ERROR_FETCHING_ORDER_LIST_FOR_USER
            });
        });
}