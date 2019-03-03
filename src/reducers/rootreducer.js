import { combineReducers } from 'redux';
import {
    PASS_KEY_REDUCER,
    REGISTRATION_REDUCER
} from './useraccountcontrolreducer';

export default combineReducers({
    uac: PASS_KEY_REDUCER,
    reg: REGISTRATION_REDUCER
});