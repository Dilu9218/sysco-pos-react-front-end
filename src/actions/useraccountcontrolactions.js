import axios from 'axios';

import {
    USER_LOGIN_ENDPOINT,
    USER_REGISTER_ENDPOINT
} from '../constants';

import {
    SAVE_PASS_KEY,
    SHOW_LOGIN_ERROR,
    SHOW_REGISTER_ERROR,
    COMPLETE_REGISTRAION,
    CLEAR_PASS_KEY
} from './types';

export const REGISTER_USER = (username, newpassword, conpassword) => (dispatch) => {
    if (newpassword === conpassword) {
        axios.post(USER_REGISTER_ENDPOINT, {
            username: username,
            password: newpassword,
            isAdmin: false
        })
            .then(res => {
                if (res.status === 200) {
                    dispatch({
                        type: COMPLETE_REGISTRAION,
                        ALERTMESSAGE: ''
                    });
                }
            }).catch(err => {
                if (err.response.status === 409) {
                    dispatch({
                        type: SHOW_REGISTER_ERROR,
                        ALERTMESSAGE: 'User already exists'
                    });
                } else {
                    dispatch({
                        type: SHOW_REGISTER_ERROR,
                        ALERTMESSAGE: 'Server error'
                    });
                }
            });
    } else {
        dispatch({
            type: SHOW_REGISTER_ERROR,
            ALERTMESSAGE: 'Passwords don\'t match'
        });
    }
}

export const LOG_USER_IN = (username, password) => (dispatch) => {
    axios.post(USER_LOGIN_ENDPOINT, { username, password })
        .then(res => {
            if (res.status === 200) {
                dispatch({
                    type: SAVE_PASS_KEY,
                    PASSKEY: res.data.token
                });
            }
        }).catch(err => {
            try {
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
            } catch (e) {
                dispatch({
                    type: SHOW_LOGIN_ERROR,
                    ALERTMESSAGE: 'Server error'
                });
            }
        });
};

export const RE_LOG_USER_IN = (cookie) => (dispatch) => {
    dispatch({
        type: SAVE_PASS_KEY,
        PASSKEY: cookie
    })
}

export const LOG_USER_OUT = () => (dispatch) => {
    dispatch({
        type: CLEAR_PASS_KEY
    })
};