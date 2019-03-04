import axios from 'axios';

import {
    ITEMS_LIST_ENDPOINT
} from '../constants';

import {
    FETCH_COMPLETE_ITEMS_LIST,
    ERROR_FETCHING_ITEMS_LIST
} from './types';

export const GET_THE_COMPLETE_ITEMS_LIST = (accesstoken) => (dispatch) => {
    axios.get(ITEMS_LIST_ENDPOINT,
        { headers: { 'x-access-token': accesstoken } })
        .then(res => {
            dispatch({
                type: FETCH_COMPLETE_ITEMS_LIST,
                ITEMSLIST: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: ERROR_FETCHING_ITEMS_LIST
            });
        });
}