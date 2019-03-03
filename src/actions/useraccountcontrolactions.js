import axios from 'axios';

import { USER_LOGIN_ENDPOINT } from '../constants';

import {
    SAVE_PASS_KEY,
    SHOW_LOGIN_ERROR,
    CLEAR_PASS_KEY
} from './types';

export const LOG_USER_IN = (username, password) => dispatch => {
    axios.post(USER_LOGIN_ENDPOINT, { username, password })
        .then(res => {
            if (res.status === 200) {
                dispatch({
                    type: SAVE_PASS_KEY,
                    PASSKEY: res.data.token
                });
            }
        }).catch(err => {
            console.log('Error occured');
            switch (err.response.status) {
                case 401:
                    dispatch({
                        type: SHOW_LOGIN_ERROR,
                        ALERTMESSAGE: 'Password is wrong'
                    });
                    break;
                case 404:
                    dispatch({
                        type: SHOW_LOGIN_ERROR,
                        ALERTMESSAGE: 'User doesn\'t exist'
                    });
                    break;
                default:
                    dispatch({
                        type: SHOW_LOGIN_ERROR,
                        ALERTMESSAGE: 'Server error'
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