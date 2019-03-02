import axios from 'axios';

import { USER_LOGIN_ENDPOINT } from '../constants';

import {
    SAVE_PASS_KEY,
    SHOW_LOGIN_ERROR,
    CLEAR_PASS_KEY
} from './types';

export const LOG_USER_IN = (username, password, history) => (dispatch) => {
    axios.post(USER_LOGIN_ENDPOINT, { username, password })
        .then(res => {
            if (res.status === 200) {
                dispatch({
                    type: SAVE_PASS_KEY,
                    token: res.data.token
                });
                history.push('/my_orders');
            }
        }).catch(err => {
            switch (err.response.status) {
                case 401:
                    dispatch({
                        type: SHOW_LOGIN_ERROR,
                        alertMessage: 'Password is wrong'
                    });
                    break;
                case 404:
                    dispatch({
                        type: SHOW_LOGIN_ERROR,
                        alertMessage: 'User doesn\'t exist'
                    });
                    break;
                default:
                    dispatch({
                        type: SHOW_LOGIN_ERROR,
                        alertMessage: 'Server error'
                    });
                    break;
            }
        });
};

export const LOG_USER_OUT = () => (dispatch) => {
    dispatch({
        type: CLEAR_PASS_KEY
    })
};