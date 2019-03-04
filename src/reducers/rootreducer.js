import { combineReducers } from 'redux';
import {
    PASS_KEY_REDUCER,
    REGISTRATION_REDUCER
} from './useraccountcontrolreducer';
import {
    ITEM_LIST_REDUCER
} from './itemcontrolreducer'
import {
    ORDER_LIST_REDUCER,
    CURRENT_ORDER_REDUCER
} from './ordercontrolreducer'

export default combineReducers({
    uac: PASS_KEY_REDUCER,
    reg: REGISTRATION_REDUCER,
    itm: ITEM_LIST_REDUCER,
    ord: ORDER_LIST_REDUCER,
    cor: CURRENT_ORDER_REDUCER
});