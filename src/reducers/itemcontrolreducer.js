import {
    FETCH_COMPLETE_ITEMS_LIST,
    ERROR_FETCHING_ITEMS_LIST
} from '../actions/types';

export const ITEM_LIST_REDUCER = (state = {
    ITEMSLIST: []
}, action) => {
    switch (action.type) {
        case FETCH_COMPLETE_ITEMS_LIST:
            return {
                ITEMSLIST: action.ITEMSLIST
            }
        case ERROR_FETCHING_ITEMS_LIST:
            return {
                ITEMSLIST: []
            }
        default:
            return state;
    }
}