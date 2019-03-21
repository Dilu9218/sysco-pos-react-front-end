import { combineReducers } from "redux";
import {
    PASS_KEY_REDUCER,
    REGISTRATION_REDUCER
} from "./useraccountcontrolreducer";
import {
    ORDER_LIST_REDUCER
} from "./ordercontrolreducer"

export default combineReducers({
    uac: PASS_KEY_REDUCER,
    reg: REGISTRATION_REDUCER,
    ord: ORDER_LIST_REDUCER,
});