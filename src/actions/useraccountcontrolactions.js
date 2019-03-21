import axios from "axios";

import {
    USER_LOGIN_ENDPOINT,
    USER_REGISTER_ENDPOINT
} from "../constants";

import {
    SAVE_PASS_KEY,
    SHOW_LOGIN_ERROR,
    SHOW_REGISTER_ERROR,
    COMPLETE_REGISTRAION,
    CLEAR_PASS_KEY
} from "./types";

export const REGISTER_USER = (username, newpassword, conpassword) => (dispatch) => {
    if (newpassword === conpassword) {
        return axios.post(USER_REGISTER_ENDPOINT, {
            username: username,
            password: newpassword,
            isAdmin: false
        })
            .then(res => {
                dispatch({
                    type: COMPLETE_REGISTRAION,
                    alertMessage: ""
                });
            }).catch(err => {
                if (err.response.status === 409) {
                    dispatch({
                        type: SHOW_REGISTER_ERROR,
                        alertMessage: "User already exists"
                    });
                } else {
                    dispatch({
                        type: SHOW_REGISTER_ERROR,
                        alertMessage: "Server error"
                    });
                }
            });
    } else {
        dispatch({
            type: SHOW_REGISTER_ERROR,
            alertMessage: "Passwords don't match"
        });
    }
}

export const LOG_USER_IN = (username, password) => (dispatch) => {
    return axios.post(USER_LOGIN_ENDPOINT, { username, password })
        .then(res => {
            dispatch({
                type: SAVE_PASS_KEY,
                passKey: res.data.token
            });
        }).catch(err => {
            try {
                switch (err.response.status) {
                    case 401:
                        dispatch({
                            type: SHOW_LOGIN_ERROR,
                            alertMessage: "Password is wrong"
                        });
                        break;
                    case 404:
                        dispatch({
                            type: SHOW_LOGIN_ERROR,
                            alertMessage: "User doesn't exist"
                        });
                        break;
                    default:
                        dispatch({
                            type: SHOW_LOGIN_ERROR,
                            alertMessage: "Server error"
                        });
                        break;
                }
            } catch (e) { }
        });
};

export const RE_LOG_USER_IN = (cookie) => (dispatch) => {
    dispatch({
        type: SAVE_PASS_KEY,
        passKey: cookie
    })
}

export const LOG_USER_OUT = () => (dispatch) => {
    dispatch({
        type: CLEAR_PASS_KEY
    })
};